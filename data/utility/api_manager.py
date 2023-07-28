import os
import time

from kickbase_api.kickbase import Kickbase


class ApiManager:
    def __init__(self, args):
        # Query cache
        self.executed_queries = {}
        self.last_call_timestamp = 0
        self.throttle_seconds = .1

        # Login
        self.api = Kickbase()
        _, leagues = self.api.login(os.environ.get('KB_MAIL'), os.environ.get('KB_PW'))

        # Meta
        self.league = leagues[0]  # Might need to be set manually if account is in multiple leagues/challenges
        self.users = [user for user in self.api.league_users(self.league)
                      if user.name not in args.ignore]

    # Simple caching and throttle of GETs to reduce load on server
    def get(self, endpoint: str):
        if endpoint not in self.executed_queries:
            while time.time() - self.last_call_timestamp < self.throttle_seconds:
                time.sleep(.1)

            self.executed_queries[endpoint] = self.api._do_get(endpoint, True).json()
            self.last_call_timestamp = time.time()

        return self.executed_queries[endpoint]

    def get_transfers_raw(self, league_id, user_id):
        transfers_raw = []
        offset = 0

        response = self.get(f'/leagues/{league_id}/users/{user_id}/feed?filter=12&start={offset}')

        while response['items']:
            transfers_raw = transfers_raw + response['items']
            response = self.get(f'/leagues/{league_id}/users/{user_id}/feed?filter=12&start={offset}')
            offset += 25

        return transfers_raw
