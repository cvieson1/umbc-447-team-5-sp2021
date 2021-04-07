import sqlite3
import pandas as pd

columns = ['date','county','state','fips','cases','deaths']
data = pd.read_csv (r'C:\Users\flygu\umbc-447-team-5-sp2021\dummy.csv', header = None,
names = columns)

print(data)
connection = sqlite3.connect('database.db')

with open('county_covid.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()
i = 0;
for index, row in data.iterrows():
    
    if row['date'] == '2020-07-27' and row['state'] == 'California':
        
        cur.execute("INSERT INTO counties (county, cases, deaths) VALUES (?, ?, ?)",
            (row["county"], row["cases"], row["deaths"] )
            )
        

    

connection.commit()
connection.close()