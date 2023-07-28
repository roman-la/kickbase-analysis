from datetime import datetime, timedelta, timezone

from pytz import timezone

from utility import constants


def get_market_players(manager):
    players = []

    for player in manager.api.market(manager.league).players:
        if not player.username:
            player_stats = manager.get(f'/leagues/{manager.league.id}/players/{player.id}/stats')

            expiration_time = (datetime.now(timezone('Europe/Berlin')) + timedelta(seconds=int(player.expiry)))
            players.append({'first_name': player.first_name,
                            'last_name': player.last_name,
                            'price': player.price,
                            'expiration': expiration_time,
                            'team_id': player.team_id,
                            'position': constants.POSITIONS[player.position],
                            'trend': player_stats['mvTrend']})

    return players
