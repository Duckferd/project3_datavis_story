#!/usr/bin/env python3

import sqlite3
import pandas as pd

from pathlib import Path

database_path = "Data/crime_data.sqlite"
Path(database_path).touch() 

conn = sqlite3.connect(database_path)
c = conn.cursor()

c.execute('''CREATE TABLE crime(Type, Year, Month, Latitude, Longitude)''')

csv_crime = pd.read_csv("Data/crime_data_clean.csv")

csv_crime.to_sql("crime", conn, if_exists='replace', index=False)

conn.close()
