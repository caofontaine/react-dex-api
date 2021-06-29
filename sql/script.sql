CREATE TABLE Regions (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Name VARCHAR
);

CREATE TABLE Pokemon (
    ID INT GENERATED ALWAYS AS IDENTITY,
    DexNum VARCHAR(8),
    Name VARCHAR,
    Type1 VARCHAR,
    Type2 VARCHAR,
    RegionID INT,
    CONSTRAINT fk_regionid
      FOREIGN KEY(RegionID)
	   REFERENCES Regions(ID)
);

COPY regions(name)
FROM '/regions.csv'
DELIMITER ','
CSV HEADER;

COPY pokemon(dexnum,name,type1,type2,regionid)
FROM '/dex.csv'
DELIMITER ','
CSV HEADER;
