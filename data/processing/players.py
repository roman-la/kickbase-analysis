import json
from datetime import datetime

import pytz
from dateutil import parser

from utility import constants
from utility.api_manager import ApiManager
from utility.util import json_serialize_datetime


def get_taken_players(args, executed_queries, lock):
    manager = ApiManager(args)

    result = []

    for user in manager.users:
        taken_players = []

        transfers = manager.get_transfers_raw(user.id, executed_queries, lock)
        transfers = sorted(transfers, key=lambda e: e['date'])
        transfers.reverse()

        for player in manager.api.league_user_players(manager.league, user.id):
            # Default values in case the player got randomly assigned on league join
            buy_value = 0
            bought_date = datetime(2023, 7, 1, tzinfo=pytz.timezone('Europe/Berlin'))

            # Get date and value of newest buy transfer for that player
            for transfer in transfers:
                if transfer['type'] != 12 or transfer['meta']['pid'] != player.id:
                    continue

                buy_value = transfer['meta']['p']
                bought_date = parser.parse(transfer['date'])

                break

            taken_players.append({'first_name': player.first_name,
                                  'last_name': player.last_name,
                                  'team_id': player.team_id,
                                  'market_value': player.market_value,
                                  'buy_price': buy_value,
                                  'user': user.name,
                                  'player_id': player.id,
                                  'date': bought_date,
                                  'position': constants.POSITIONS[player.position],
                                  'trend': player.market_value_trend})

        with open('taken_players.json', 'w') as f:
            f.writelines(json.dumps(result, default=json_serialize_datetime))

        get_free_players(result, manager)


def get_free_players(taken_players, manager):
    free_players = []

    taken_player_ids = [x['player_id'] for x in taken_players]

    for team_id in constants.TEAM_IDS:
        for player in manager.api.team_players(team_id):
            if player.id not in taken_player_ids:
                free_players.append({'player_id': player.id,
                                     'first_name': player.first_name,
                                     'last_name': player.last_name,
                                     'market_value': player.market_value,
                                     'points': player.totalPoints,
                                     'team_id': player.team_id,
                                     'position': constants.POSITIONS[player.position],
                                     'trend': player.market_value_trend})

    # TODO
    with open('free_players.json', 'w') as f:
        f.writelines(json.dumps(free_players))


def get_players_mw_change(args, executed_queries, lock):
    manager = ApiManager(args)

    players = []

    for team_id in constants.TEAM_IDS:
        for player in manager.api.team_players(team_id):
            player_stats = manager.get(f'/leagues/{manager.league.id}/players/{player.id}/stats', executed_queries,
                                       lock)

            if 'leaguePlayer' in player_stats.keys():
                manager_name = player_stats['leaguePlayer']['userName']
            else:
                manager_name = 'Computer'

            market_values = player_stats['marketValues']
            market_values.reverse()

            last_mw = {}
            for i in range(5):
                last_mw[i] = market_values[i]['m']

            players.append({'player_id': player.id,
                            'first_name': player.first_name,
                            'last_name': player.last_name,
                            'market_value': player_stats['marketValue'],
                            'today': last_mw[0] - last_mw[1],
                            'one_day_ago': last_mw[1] - last_mw[2],
                            'two_days_ago': last_mw[2] - last_mw[3],
                            'team_id': player.team_id,
                            'manager': manager_name})

    with open('mw_changes.json', 'w') as f:
        f.writelines(json.dumps(players))
