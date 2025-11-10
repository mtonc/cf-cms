-- Migration number: 0001 	 2024-12-27T22:04:18.794Z
DROP TABLE IF EXISTS blogs;
CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY ASC,
    title TEXT NOT NULL,
    blurb TEXT NOT NULL,
    body TEXT NOT NULL,
    publishedAt DATETIME NOT NULL DEFAULT (current_timestamp),
    updatedDate DATETIME DEFAULT NULL,
    heroImage TEXT DEFAULT 'ai_circuits',
    heroAlt TEXT DEFAULT NULL,
    draft BOOLEAN NOT NULL DEFAULT TRUE
);

-- Insert some sample data into our comments table.
INSERT INTO blogs (title, blurb, body)
VALUES ('TEST', 'A test post','### Here is a small heading'),
       ('Another Test', 'Another test post','This is the body of the second test post.');
