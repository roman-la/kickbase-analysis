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
              4: datetime(2023, 9, 15, 20, 30, tzinfo=TIMEZONE_DE),
              5: datetime(2023, 9, 22, 20, 30, tzinfo=TIMEZONE_DE),
              6: datetime(2023, 9, 29, 20, 30, tzinfo=TIMEZONE_DE),
              7: datetime(2023, 10, 6, 20, 30, tzinfo=TIMEZONE_DE),
              8: datetime(2023, 10, 20, 20, 30, tzinfo=TIMEZONE_DE),
              9: datetime(2023, 10, 28, 20, 30, tzinfo=TIMEZONE_DE),
              10: datetime(2023, 11, 4, 20, 30, tzinfo=TIMEZONE_DE),
              11: datetime(2023, 11, 11, 20, 30, tzinfo=TIMEZONE_DE),
              12: datetime(2023, 11, 25, 20, 30, tzinfo=TIMEZONE_DE),
              13: datetime(2023, 12, 2, 20, 30, tzinfo=TIMEZONE_DE),
              14: datetime(2023, 12, 9, 20, 30, tzinfo=TIMEZONE_DE),
              15: datetime(2023, 12, 16, 20, 30, tzinfo=TIMEZONE_DE),
              16: datetime(2023, 12, 20, 20, 30, tzinfo=TIMEZONE_DE),
              17: datetime(2024, 1, 13, 20, 30, tzinfo=TIMEZONE_DE),
              18: datetime(2024, 1, 20, 20, 30, tzinfo=TIMEZONE_DE),
              19: datetime(2024, 1, 27, 20, 30, tzinfo=TIMEZONE_DE),
              20: datetime(2024, 2, 3, 20, 30, tzinfo=TIMEZONE_DE),
              21: datetime(2024, 2, 10, 20, 30, tzinfo=TIMEZONE_DE),
              22: datetime(2024, 2, 17, 20, 30, tzinfo=TIMEZONE_DE),
              23: datetime(2024, 2, 24, 20, 30, tzinfo=TIMEZONE_DE),
              24: datetime(2024, 3, 2, 20, 30, tzinfo=TIMEZONE_DE),
              25: datetime(2024, 3, 9, 20, 30, tzinfo=TIMEZONE_DE),
              26: datetime(2024, 3, 16, 20, 30, tzinfo=TIMEZONE_DE),
              27: datetime(2024, 3, 30, 20, 30, tzinfo=TIMEZONE_DE),
              28: datetime(2024, 4, 6, 20, 30, tzinfo=TIMEZONE_DE),
              29: datetime(2024, 4, 13, 20, 30, tzinfo=TIMEZONE_DE),
              30: datetime(2024, 4, 20, 20, 30, tzinfo=TIMEZONE_DE),
              31: datetime(2024, 4, 27, 20, 30, tzinfo=TIMEZONE_DE),
              32: datetime(2024, 5, 4, 20, 30, tzinfo=TIMEZONE_DE),
              33: datetime(2024, 5, 11, 20, 30, tzinfo=TIMEZONE_DE),
              34: datetime(2024, 5, 18, 20, 30, tzinfo=TIMEZONE_DE)}
