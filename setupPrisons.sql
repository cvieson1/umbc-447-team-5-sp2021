DROP TABLE IF EXISTS prisons;

CREATE TABLE prisons(
    Id INTEGER PRIMARY KEY,
    prisonID INTEGER NOT NULL,
    prison TEXT NOT NULL,
    theDate TEXT NOT NULL,
    UNIQUE(Id)
    
);