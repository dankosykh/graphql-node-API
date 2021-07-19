DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;

CREATE TABLE users (
  user_id serial PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  salt VARCHAR(16) NOT NULL,
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

CREATE INDEX user_idx ON users (user_id);
CREATE INDEX post_idx ON posts (post_id);