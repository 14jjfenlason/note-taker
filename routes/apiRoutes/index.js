const express = require('express');
const fs = require('fs');
const path = require('path'); // Import the path module
const router = express.Router();

// Define db.json file path
const dbFilePath = path.join(__dirname, '../../../develop/db/db.json');

// Define route to read and return notes from db.json
router.get('/notes', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        try {
            const notes = JSON.parse(data);
            res.json(notes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Define route to add a new note to db.json
router.post('/notes', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        try {
            const notes = JSON.parse(data);
            const newNote = req.body;
            newNote.id = Date.now(); // Generate unique id for the new note
            notes.push(newNote);

            fs.writeFile(dbFilePath, JSON.stringify(notes, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }

                res.json(newNote);
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

module.exports = router;