import json
from datetime import datetime

import pandas as pd
from tqdm import tqdm

from utility.api_manager import manager
from utility.constants import MATCH_DAYS
from utility.constants import TIMEZONE_DE


def calculate_revenue_data_daily(turnovers):
    user_transfer_revenue = {user.name: [] for user in manager.users}
    for buy, sell in turnovers:
        revenue = sell['value'] - buy['value']
        user_transfer_revenue[buy['user']].append((revenue, sell['date']))

    # Add start and end points
    for _, data in user_transfer_revenue.items():
        data.append((0, manager.start))
        data.append((0, datetime.now(TIMEZONE_DE)))

    dataframes = {}
    for user, data in tqdm(user_transfer_revenue.items(), desc="Calculating transfer revenue of transfers"):
        df = pd.DataFrame(data, columns=['revenue', 'date'])
        df['date'] = pd.to_datetime(df['date'], utc=True)
        df = df.groupby(pd.Grouper(key='date', freq='D'))['revenue'] \
            .sum().reset_index().sort_values('date')
        df['revenue'] = df['revenue'].cumsum()
        df['date'] = df['date'].dt.strftime('%Y-%m-%d')

        dataframes[user] = df

    data = {user.name: [] for user in manager.users}
    for user, df in dataframes.items():
        for entry in df.to_numpy().tolist():
            data[user].append((entry[0], entry[1]))

    with open('./data/revenue_sum.json', 'w') as f:
        f.writelines(json.dumps(data))


def calculate_team_value_per_match_day():
    result = {}
    for user in tqdm(manager.users, desc="Collecting each managers team value per match day"):
        # Get match day number to start from (not necessarily 1 because not every league starts on season start)
        start_match_day = next((match_day_number for match_day_number, match_day_date in MATCH_DAYS.items()
                                if match_day_date > manager.start), 1)
        # Get match day number of last occurred match day
        end_match_day = manager.api.league_stats(manager.league).current_day

        manager_stats = manager.get(f'/leagues/{manager.league.id}/users/{user.id}/stats')

        # Setup manager result dict
        team_values = {match_day: 0 for match_day in range(start_match_day, end_match_day + 1)}

        # Extract team value on match day
        for match_day_number in team_values.keys():
            for team_value in manager_stats['teamValues']:
                if MATCH_DAYS[match_day_number].date() == datetime.fromisoformat(team_value['d']).date():
                    team_values[match_day_number] = team_value['v']
                    break

        result[user.name] = team_values

    with open('./data/team_values.json', 'w') as f:
        f.writelines(json.dumps(result))


def get_players_on_match_day():
    result = {}

    for user in tqdm(manager.users, desc="Collecting each managers players per match day"):
        # Get match day number to start from (not necessarily 1 because not every league starts on season start)
        start_match_day = next((match_day_number for match_day_number, match_day_date in MATCH_DAYS.items()
                                if match_day_date > manager.start), 1)
        # Get match day number of last occurred match day
        end_match_day = manager.api.league_stats(manager.league).current_day

        # Setup manager result dict
        players_on_match_day = {match_day: [] for match_day in range(start_match_day, end_match_day + 1)}

        for match_day_number in players_on_match_day.keys():
            lineup = manager.get(f'/v2/leagues/{manager.league.id}/table/{user.id}/players?matchDay={match_day_number}')
            # lp = player was in lineup
            player_ids_lineup = [player['i'] for player in lineup['lp']]
            # nlp = player was not in lineup
            player_ids_no_lineup = [player['i'] for player in lineup['nlp']]

            for player_id in player_ids_lineup + player_ids_no_lineup:
                player_stats = manager.get(f'/leagues/{manager.league.id}/players/{player_id}/stats')
                for market_value in player_stats['marketValues']:
                    if MATCH_DAYS[match_day_number].date() == datetime.fromisoformat(market_value['d']).date():
                        players_on_match_day[match_day_number].append({
                            'name': f'{player_stats['firstName']} {player_stats['lastName']}',
                            'team_id': int(player_stats['teamId']),
                            'position': player_stats['position'],
                            'market_value': market_value['m'],
                            'lineup': True if player_id in player_ids_lineup else False
                        })

        result[user.name] = players_on_match_day

    for user, res in result.items():
        for match_day, players in result[user].items():
            print(match_day, sum([player['market_value'] for player in players]))

    with open('./data/players_on_match_day.json', 'w') as f:
        f.writelines(json.dumps(result))
