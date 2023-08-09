import argparse
import json
import multiprocessing as mp
import time
from datetime import datetime

from dateutil.tz import tzlocal

from processing.market import get_market_players
from processing.players import get_players_mw_change
from processing.players import get_taken_players
from processing.revenue import calculate_team_value_per_match_day
from processing.turnovers import get_turnovers

parser = argparse.ArgumentParser()
parser.add_argument('--ignore', required=False, nargs="+", type=str, default=[])
parser.add_argument('--kbpw', required=True, type=str)
parser.add_argument('--kbuser', required=True, type=str)
parser.add_argument('--league', required=False, type=str)
args = parser.parse_args()


def main():
    start = time.time()

    with mp.Manager() as mp_manager:
        executed_queries = mp_manager.dict()

        processes = [mp.Process(target=get_turnovers, args=(args, executed_queries)),
                     mp.Process(target=get_taken_players, args=(args, executed_queries)),
                     mp.Process(target=get_players_mw_change, args=(args, executed_queries)),
                     mp.Process(target=calculate_team_value_per_match_day, args=(args, executed_queries)),
                     mp.Process(target=get_market_players, args=(args, executed_queries))]

        for process in processes:
            process.start()

        for process in processes:
            process.join()

    # Timestamp for frontend
    with open('timestamp.json', 'w') as f:
        f.writelines(json.dumps({'time': datetime.now(tz=tzlocal()).isoformat()}))

    print(f'Execution time: {time.time() - start}s')


if __name__ == '__main__':
    main()
