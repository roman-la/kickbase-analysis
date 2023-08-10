from kickbase_api.kickbase import Kickbase


class ApiManager:
    def __init__(self, args):
        # Kickbase login
        self.api = Kickbase()
        _, leagues = self.api.login(args.kbuser, args.kbpw)

        # Setup league
        if args.league:
            self.league = None
            for league in leagues:
                if league.name == args.league:
                    self.league = league

            if self.league is None:
                raise Exception(f'League "{args.league}" not found.')
        else:
            self.league = leagues[0]

        # Setup user list
        self.users = [user for user in self.api.league_users(self.league)
                      if user.name not in args.ignore]

    def get(self, url: str, executed_queries, lock):
        # lock.acquire()
        if url not in executed_queries.keys():
            executed_queries[url] = self.api._do_get(url, True).json()
        # lock.release()

        return executed_queries[url]

    def get_transfers_raw(self, user_id, executed_queries, lock):
        transfers_raw = []
        offset = 0

        response = self.get(f'/leagues/{self.league.id}/users/{user_id}/feed?filter=12&start={offset}',
                            executed_queries, lock)

        while response['items']:
            transfers_raw = transfers_raw + response['items']
            response = self.get(f'/leagues/{self.league.id}/users/{user_id}/feed?filter=12&start={offset}',
                                executed_queries, lock)
            offset += 25

        return transfers_raw
