import json
from datetime import datetime
from datetime import timedelta
from datetime import timezone

from pytz import timezone

from utility import constants
from utility.api_manager import ApiManager
from utility.util import json_serialize_datetime


def get_market_players(args, executed_queries, lock):
    manager = ApiManager(args)

    players = []

    for player in manager.api.market(manager.league).players:
        if not player.username:
            player_stats = manager.get(f'/leagues/{manager.league.id}/players/{player.id}/stats', executed_queries, lock)

            expiration_time = (datetime.now(timezone('Europe/Berlin')) + timedelta(seconds=int(player.expiry)))
            players.append({'first_name': player.first_name,
                            'last_name': player.last_name,
                            'price': player.price,
                            'expiration': expiration_time,
                            'team_id': player.team_id,
                            'position': constants.POSITIONS[player.position],
                            'trend': player_stats['mvTrend']})

    with open('market.json', 'w') as f:
        f.writelines(json.dumps(players, default=json_serialize_datetime))
