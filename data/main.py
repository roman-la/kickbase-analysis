import argparse
import json
from datetime import datetime

from dateutil.tz import tzlocal

from processing.market import get_market_players
from processing.players import get_free_players
from processing.players import get_players_mw_change
from processing.players import get_taken_players
from processing.revenue import calculate_revenue_data_daily
from processing.revenue import calculate_team_value_per_match_day
from processing.turnovers import get_turnovers
from utility.api_manager import ApiManager
from utility.util import json_serialize_datetime

parser = argparse.ArgumentParser()
parser.add_argument('--ignore', required=False, nargs="+", type=str, default=[])
parser.add_argument('--kbpw', required=True, type=str)
parser.add_argument('--kbuser', required=True, type=str)
parser.add_argument('--league', required=False, type=str)
args = parser.parse_args()


def main():
    manager = ApiManager(args)

    # Market value changes
    with open('mw_changes.json', 'w') as f:
        f.writelines(json.dumps(get_players_mw_change(manager)))

    # Turnover data
    turnovers = []
    for user in manager.users:
        turnovers = turnovers + get_turnovers(manager, user.id, user.name)
    with open('turnovers.json', 'w') as f:
        f.writelines(json.dumps(turnovers, default=json_serialize_datetime))

    # Taken players data
    taken_players = []
    for user in manager.users:
        taken_players = taken_players + get_taken_players(manager, user.id, user.name)
    with open('taken_players.json', 'w') as f:
        f.writelines(json.dumps(taken_players, default=json_serialize_datetime))

    # Team value data
    team_values = {}
    for user in manager.users:
        team_values[user.name] = calculate_team_value_per_match_day(manager, user.id)
    with open('team_values.json', 'w') as f:
        f.writelines(json.dumps(team_values))

    # Free players data
    with open('free_players.json', 'w') as f:
        free_players = get_free_players(manager, taken_players)
        f.writelines(json.dumps(free_players))

    # Transfer revenue data
    with open('revenue_sum.json', 'w') as f:
        revenue_data = calculate_revenue_data_daily(manager, turnovers)
        f.writelines(json.dumps(revenue_data))

    # Market data
    with open('market.json', 'w') as f:
        market_players = get_market_players(manager)
        f.writelines(json.dumps(market_players, default=json_serialize_datetime))

    # Timestamp
    with open('timestamp.json', 'w') as f:
        f.writelines(json.dumps({'time': datetime.now(tz=tzlocal()).isoformat()}))


main()
