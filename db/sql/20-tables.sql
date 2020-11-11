
-------------------
-- Users section --
-------------------

DROP TABLE IF EXISTS users;
CREATE TABLE users (
	uid        SERIAL PRIMARY KEY,
	email      TEXT UNIQUE NOT NULL,
	password   TEXT NOT NULL
);