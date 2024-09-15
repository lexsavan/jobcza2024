const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run('CREATE TABLE jobs (title TEXT, company TEXT, description TEXT)');
});

app.get('/jobs', (req, res) => {
    db.all('SELECT * FROM jobs', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/jobs', (req, res) => {
    const { title, company, description } = req.body;
    db.run('INSERT INTO jobs (title, company, description) VALUES (?, ?, ?)', [title, company, description], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Job posted successfully!' });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
