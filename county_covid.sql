DROP TABLE IF EXISTS counties;

CREATE TABLE counties(
    Id INTEGER PRIMARY KEY,
    cases INTEGER NOT NULL,
    deaths INTEGER NOT NULL,
    county TEXT NOT NULL,
    UNIQUE (Id)
);