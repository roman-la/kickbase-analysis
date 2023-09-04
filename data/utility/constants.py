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
# 40 Union
# 42 Darmstadt
# 43 Leipzig
# 50 Heidenheim
TEAM_IDS = [2, 3, 4, 5, 7, 9, 10, 11, 13, 14, 15, 18, 24, 28, 40, 42, 43, 50]

POSITIONS = {1: 'TW', 2: 'ABW', 3: 'MF', 4: 'ANG'}

MATCH_DAYS = {1: datetime(2023, 8, 18, 20, 30, tzinfo=TIMEZONE_DE),
              2: datetime(2023, 8, 25, 20, 30, tzinfo=TIMEZONE_DE),
              3: datetime(2023, 9, 1, 20, 30, tzinfo=TIMEZONE_DE),
              4: datetime(2023, 9, 15, 20, 30, tzinfo=TIMEZONE_DE),}
