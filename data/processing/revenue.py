import json
from datetime import datetime

import pandas as pd
from dateutil import parser

from utility.api_manager import ApiManager
from utility.constants import MATCH_DAYS
from utility.constants import TIMEZONE_DE


def calculate_revenue_data_daily(turnovers, manager):
    user_transfer_revenue = {user.name: [] for user in manager.users}
    for buy, sell in turnovers:
        revenue = sell['value'] - buy['value']
        user_transfer_revenue[buy['user']].append((revenue, sell['date']))

    # Add start and end points
    for _, data in user_transfer_revenue.items():
        data.append((0, datetime(2023, 7, 1, tzinfo=TIMEZONE_DE)))
        data.append((0, datetime.now(TIMEZONE_DE)))

    dataframes = {}
    for user, data in user_transfer_revenue.items():
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

    with open('revenue_sum.json', 'w') as f:
        f.writelines(json.dumps(data))


def calculate_team_value_per_match_day(args, cache, lock, throttle):
    manager = ApiManager(args)

    result = {}
    for user in manager.users:
        # Get last match day
        last_match_day = manager.api.league_stats(manager.league).current_day

        # Get list of player ids per match
        match_day_player_ids = {match_day: [] for match_day in range(1, last_match_day + 1)}
        for match_day in match_day_player_ids:
            line_up = manager.get(f'/v2/leagues/{manager.league.id}/table/{user.id}/players?matchDay={match_day}',
                                  cache, lock)

            # In line up
            for player in line_up['lp']:
                match_day_player_ids[match_day].append(player['i'])

            # Not in line up
            for player in line_up['nlp']:
                match_day_player_ids[match_day].append(player['i'])

        # Get sum of player values for each match day
        team_value = {match_day: 0 for match_day in range(1, last_match_day + 1)}
        for match_day, player_ids in match_day_player_ids.items():
            for player_id in set(player_ids):
                player_stats = manager.get(f'/leagues/{manager.league.id}/players/{player_id}/stats', cache,
                                           lock, throttle)

                player_value_on_match_day = 0
                if MATCH_DAYS[match_day].date() == datetime.now().date():
                    player_value_on_match_day = player_stats['marketValue']
                else:
                    for entry in player_stats['marketValues']:
                        if parser.parse(entry['d']).date() <= MATCH_DAYS[match_day].date():
                            player_value_on_match_day = int(entry['m'])
                        else:
                            break

                team_value[match_day] += player_value_on_match_day

        result[user.name] = team_value

    with open('team_values.json', 'w') as f:
        f.writelines(json.dumps(result))
