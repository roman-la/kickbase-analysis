import json
from datetime import datetime
from datetime import timedelta
from datetime import timezone

from pytz import timezone
from tqdm import tqdm

from utility import constants
from utility.api_manager import manager
from utility.util import json_serialize_datetime


def get_market_players():
    result = []

    players = [player for player in manager.api.market(manager.league).players if not player.username]

    for player in tqdm(players, desc="Collecting players on market"):
        player_stats = manager.get(f'/leagues/{manager.league.id}/players/{player.id}/stats')
        expiration_time = (datetime.now(timezone('Europe/Berlin')) + timedelta(seconds=int(player.expiry)))
        result.append({'first_name': player.first_name,
                       'last_name': player.last_name,
                       'price': player.price,
                       'expiration': expiration_time,
                       'team_id': player.team_id,
                       'position': constants.POSITIONS[player.position],
                       'trend': player_stats['mvTrend']})

    with open('./data/market.json', 'w') as f:
        f.writelines(json.dumps(result, default=json_serialize_datetime))
