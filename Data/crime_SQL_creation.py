#!/usr/bin/env python3

import sqlite3
from sqlalchemy import create_engine
import pandas as pd

from pathlib import Path

database_path = "Data/vancouver.sqlite"
Path(database_path).touch() 

conn = sqlite3.connect(database_path)
c = conn.cursor()
csv_crime = pd.read_csv("Data/crime_data_clean.csv")

csv_crime.to_sql("crime", conn, if_exists='replace', index=True)

engine = create_engine("sqlite:///Data/vancouver.sqlite")
with engine.connect() as con:
    con.execute('PRAGMA foreign_keys=off;')
    con.execute('BEGIN TRANSACTION;')
    con.execute('ALTER TABLE crime RENAME TO old_table;')
    con.execute('CREATE TABLE crime( id INTEGER, Type TEXT, Year INTEGER, Month INTEGER, Latitude REAL, Longitude REAL, CONSTRAINT id_pk PRIMARY KEY (id));')
    con.execute('INSERT INTO crime SELECT * FROM old_table;')
    con.execute('DROP TABLE old_table;')
    con.execute('PRAGMA foreign_keys=on;')

conn.close()
con.close