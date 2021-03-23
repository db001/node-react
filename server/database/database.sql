-- CREATE DATABASE googleauth;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 

CREATE TABLE users(
  user_id UUID DEFAULT uuid_generate_v4(),
  google_id VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (user_id)
);
