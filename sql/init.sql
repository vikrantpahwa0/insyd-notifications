DROP TABLE IF EXISTS users, posts, comments;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  url TEXT
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id),
  user_id INTEGER REFERENCES users(id),
  text TEXT
);

CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  recipient_id INTEGER NOT NULL REFERENCES users(id),
  comment_id INTEGER NOT NULL REFERENCES comments(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_read BOOLEAN DEFAULT FALSE
);

INSERT INTO users (email, password) VALUES
('user1@example.com', 'pass1'),
('user2@example.com', 'pass2'),
('user3@example.com', 'pass3'),
('user4@example.com', 'pass4'),
('user5@example.com', 'pass5');

INSERT INTO posts (title, url) VALUES
('Post One', 'https://example.com/post1'),
('Post Two', 'https://example.com/post2'),
('Post Three', 'https://example.com/post3'),
('Post Four', 'https://example.com/post4'),
('Post Five', 'https://example.com/post5');
