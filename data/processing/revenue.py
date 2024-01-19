import json
from datetime import datetime

import pandas as pd

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


def calculate_team_value_per_match_day():
    result = {}
    for user in manager.users:
        # Get last match day
        last_match_day = manager.api.league_stats(manager.league).current_day

        # Get team value for each match day
        team_value = {match_day: 0 for match_day in range(1, last_match_day + 1)}
        for match_day in MATCH_DAYS:
            if MATCH_DAYS[match_day] < manager.start:
                continue

            player_stats = manager.get(f'/leagues/{manager.league.id}/users/{user.id}/stats')

            team_value_on_match_day = 0
            for teamValues in player_stats['teamValues']:
                if MATCH_DAYS[match_day].date() == datetime.fromisoformat(teamValues['d'][:-1]).date():
                    team_value_on_match_day = teamValues['v']
            if (len(team_value) >= match_day):
                team_value[match_day] = team_value_on_match_day

        team_value = {k: v for k, v in team_value.items() if v != 0}

        result[user.name] = team_value

    with open('team_values.json', 'w') as f:
        f.writelines(json.dumps(result))
