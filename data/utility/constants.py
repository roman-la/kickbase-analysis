from datetime import datetime

import pytz

TIMEZONE_DE = pytz.timezone('Europe/Berlin')

# 2 Bayern
# 3 BVB
# 4 Frankfurt
# 5 Freiburg
# 7 Bayer
# 8 Schalke
# 9 Stuttgart
# 10 Bremen
# 11 Wolfsburg
# 13 Augsburg
# 14 Hoffenheim
# 15 Gladbach
# 18 Mainz
# 20 Hertha
# 24 Bochum
# 28 Köln
# 39 St Pauli
# 40 Union
# 42 Darmstadt
# 43 Leipzig
# 50 Heidenheim
# 51 Holstein Kiel
TEAM_IDS = [2, 3, 4, 5, 7, 9, 10, 11, 13, 14, 15, 18, 24, 39, 40, 43, 50, 51]

POSITIONS = {1: 'TW', 2: 'ABW', 3: 'MF', 4: 'ANG'}

MATCH_DAYS = {1: datetime(2024, 8, 23, 20, 30, tzinfo=TIMEZONE_DE),
              2: datetime(2024, 8, 30, 20, 30, tzinfo=TIMEZONE_DE),
              3: datetime(2024, 9, 13, 20, 30, tzinfo=TIMEZONE_DE),
              4: datetime(2024, 9, 20, 20, 30, tzinfo=TIMEZONE_DE),
              5: datetime(2024, 9, 27, 20, 30, tzinfo=TIMEZONE_DE),
              6: datetime(2024, 10, 4, 20, 30, tzinfo=TIMEZONE_DE),
              7: datetime(2024, 10, 18, 20, 30, tzinfo=TIMEZONE_DE),
              8: datetime(2024, 10, 25, 20, 30, tzinfo=TIMEZONE_DE),
              9: datetime(2024, 11, 1, 20, 30, tzinfo=TIMEZONE_DE),
              10: datetime(2024, 11, 8, 20, 30, tzinfo=TIMEZONE_DE)}
