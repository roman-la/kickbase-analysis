import json
import time
from argparse import ArgumentParser
from datetime import datetime

from dateutil.tz import tzlocal

from processing.market import get_market_players
from processing.players import get_players_mw_change
from processing.players import get_taken_players
from processing.revenue import calculate_team_value_per_match_day
from processing.turnovers import get_turnovers
from utility.api_manager import manager

parser = ArgumentParser()
parser.add_argument('--ignore', required=False, nargs="+", type=str, default=[])
parser.add_argument('--kbpw', required=True, type=str)
parser.add_argument('--kbuser', required=True, type=str)
parser.add_argument('--league', required=False, type=str)
parser.add_argument('--start', required=True, type=str)
args = parser.parse_args()


def main():
    start = time.time()

    manager.init(args)

    get_turnovers()
    get_taken_players()
    get_players_mw_change()
    calculate_team_value_per_match_day()
    get_market_players()

    # Timestamp for frontend
    # TODO: Possible to use file creation timestamp in frontend, so that this can be removed?
    with open('timestamp.json', 'w') as f:
        f.writelines(json.dumps({'time': datetime.now(tz=tzlocal()).isoformat()}))

    print(f'Execution time: {time.time() - start}s')


if __name__ == '__main__':
    main()
