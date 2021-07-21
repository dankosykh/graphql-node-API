DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id serial PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  salt VARCHAR(24) NOT NULL,
  password_hash VARCHAR (255) NOT NULL
);

CREATE TABLE posts (
  post_id serial PRIMARY KEY,
  posted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  likes INT DEFAULT 0,
  message VARCHAR(280) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id)
    REFERENCES users (user_id)
);

CREATE INDEX username_idx ON users (username);
CREATE INDEX email_idx ON users (email);
CREATE INDEX userid_idx ON users (user_id);
CREATE INDEX post_idx ON posts (post_id);

-- initial testing
-- for testing
INSERT INTO users(username, email, salt, password_hash) VALUES ('DK','dk@gmail.com', 'thisisasaltystring', 'shouldbeahashedpasswordwithsaltadded');
INSERT INTO users(username, email, salt, password_hash) VALUES ('Gary','gary@gmail.com', 'kosherSalt', 'higlyHashedPassword');
INSERT INTO posts(user_id, message) VALUES (1,'This is an initial post');
INSERT INTO posts(user_id, message) VALUES (2,'I too may post');