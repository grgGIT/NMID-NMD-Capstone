const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const clientPath = path.join(__dirname, '..', 'client');
app.use(express.static(clientPath));
app.use(express.json());

const originalsPath = path.join(__dirname, 'posters.json');
const editedPath = path.join(__dirname, 'uploads', 'edited.json');

// Ensure the data file exists
if (!fs.existsSync(originalsPath)) {
    fs.writeFileSync(originalsPath, JSON.stringify([]));
}

// data file check for the edited.json
if (!fs.existsSync(editedPath)) {
    fs.writeFileSync(editedPath, JSON.stringify([]));
}


// Endpoint to retrieve posters
app.get('/getPosters', (req, res) => {
    fs.readFile(originalsPath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data file' });
        }
        res.json(JSON.parse(data));
    });
});

app.get('/getSavedPosters', (req, res) => {
    fs.readFile(editedPath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data file' });
        }
        res.json(JSON.parse(data));
    });
});

app.get('/getSelectedPosterNumber', (req, res) => {
    const posterId = parseInt(req.query.id, 10); // Get the ID from query parameters

    fs.readFile(originalsPath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        const posters = JSON.parse(data);
        const selectedPoster = posters.find(poster => poster.id === posterId);

        if (!selectedPoster) {
            return res.status(404).json({ error: 'Poster not found' });
        }

        res.json({ id: selectedPoster.id });
    });
});

app.post( '/savePoster', (req, res) => {
    
});

// Define a route to serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join( __dirname, '../client/homepage/index.html'));
});
app.listen(port, () => console.log(`Server running on port ${port}`));