import argparse
import json
import multiprocessing as mp
import time
from datetime import datetime
from multiprocessing.pool import Pool

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
    pool = Pool(mp.cpu_count() - 1)

    with mp.Manager() as manager:
        executed_queries = manager.dict()
        lock = manager.Lock()

        pool.apply_async(get_turnovers, (args, executed_queries, lock))
        pool.apply_async(get_taken_players, (args, executed_queries, lock))
        pool.apply_async(get_players_mw_change, (args, executed_queries, lock))
        pool.apply_async(calculate_team_value_per_match_day, (args, executed_queries, lock))
        pool.apply_async(get_market_players, (args, executed_queries, lock))

        pool.close()
        pool.join()

    # Timestamp for frontend
    # TODO: Possible to use file creation timestamp in frontend, so that this can be removed?
    with open('timestamp.json', 'w') as f:
        f.writelines(json.dumps({'time': datetime.now(tz=tzlocal()).isoformat()}))

    print(f'Execution time: {time.time() - start}s')


if __name__ == '__main__':
    main()
