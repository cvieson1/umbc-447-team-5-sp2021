import sqlite3
import pandas as pd

columns = ['id', 'jurisdiction', 'state', 'name', 'date']
data = file.read_csv(r'C:\Users\eking\447proj\umbc-447-team-5-sp2021\samplePrisonNames.csv', header = None, names = columns)

print(data)
connection = sqlite3.connect('prisiondata.db')

with open('setupPrisons.sql') as s:
    connection.executescript(s.read())

cur = connection.cursor()
i = 0
for index, row in data.iterrows():
    cur.execute("INSERT INTO prisons (prisonID, prison, theDate) VALUES (?, ?, ?)", 
    (row["id"], row["name"], row["date"])
    )

connection.commit()
connection.close()