CREATE TABLE person(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE score(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  score INTEGER,
  person_id INTEGER,
  FOREIGN KEY (person_id) REFERENCES person (id)
);