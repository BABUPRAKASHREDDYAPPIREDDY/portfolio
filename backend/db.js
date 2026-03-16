const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Create messages table
        db.run(`CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Create posts table
        db.run(`CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (!err) {
                // Insert some sample posts if table is empty
                db.get("SELECT COUNT(*) AS count FROM posts", (err, row) => {
                    if (row && row.count === 0) {
                        const insert = 'INSERT INTO posts (title, content) VALUES (?, ?)';
                        db.run(insert, ['My First Post', 'This is a sample blog post about technology and biology. Welcome to my new website!']);
                        db.run(insert, ['Studying Abroad Journey', 'Sharing my experiences and thoughts about studying abroad and exploring new cultures.']);
                    }
                });
            }
        });
    }
});

module.exports = db;