import json

from dateutil import parser
from tqdm import tqdm

from utility import constants
from utility.api_manager import manager
from utility.util import json_serialize_datetime


def get_taken_players():
    result = []

    for user in tqdm(manager.users, desc="Collecting taken players for each manager"):
        taken_players = []

        transfers = manager.get_transfers_raw(user.id)
        transfers = sorted(transfers, key=lambda e: e['date'])
        transfers.reverse()

        for player in manager.api.league_user_players(manager.league, user.id):
            # Default values in case the player got randomly assigned on league join
            buy_value = 0
            bought_date = manager.start

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

        result = result + taken_players

    with open('./data/taken_players.json', 'w') as f:
        f.writelines(json.dumps(result, default=json_serialize_datetime))

    get_free_players(result)


def get_free_players(taken_players):
    free_players = []

    taken_player_ids = [x['player_id'] for x in taken_players]

    for team_id in tqdm(constants.TEAM_IDS, desc="Collecting free players for each team"):
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

    with open('./data/free_players.json', 'w') as f:
        f.writelines(json.dumps(free_players))


def get_players_mw_change():
    result = []

    players = []
    for team_id in constants.TEAM_IDS:
        for player in manager.api.team_players(team_id):
            players.append(player)

    for player in tqdm(players, desc="Collecting market value change of last three days for each player", miniters=2):
        player_stats = manager.get(f'/leagues/{manager.league.id}/players/{player.id}/stats')

        if 'leaguePlayer' in player_stats.keys():
            manager_name = player_stats['leaguePlayer']['userName']
        else:
            manager_name = 'Computer'

        market_values = player_stats['marketValues']
        market_values.reverse()

        result.append({'player_id': player.id,
                       'first_name': player.first_name,
                       'last_name': player.last_name,
                       'market_value': player_stats['marketValue'],
                       'today': market_values[0]['m'] - market_values[1]['m'],
                       'one_day_ago': market_values[1]['m'] - market_values[2]['m'],
                       'two_days_ago': market_values[2]['m'] - market_values[3]['m'],
                       'team_id': player.team_id,
                       'manager': manager_name})

    with open('./data/mw_changes.json', 'w') as f:
        f.writelines(json.dumps(result))
