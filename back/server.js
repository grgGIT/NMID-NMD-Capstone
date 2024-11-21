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

let selectedPosterId = 1;

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

    // res.json({id: 1, svg: 'assets/geoff-nuclear-svg.svg'});
    // res.json({id: 2, svg: 'assets/geoff-ball-svg.svg'});

    if (selectedPosterId === 7) {
        res.json({id: 7, svg: 'assets/geoff-nuclear-svg.svg'});
    }
    else {
        res.json({id: 5, svg: 'assets/geoff-ball-svg.svg'});
    }
});

app.post('/selectPoster', (req, res) => {
    console.log('Youre in the post request!');
    selectedPosterId = req.body.id;
    console.log(`Selected Poster ID Is ${selectedPosterId}`);
    res.json({ message: 'Poster selection submitted successfully' });
});

app.post( '/savePoster', (req, res) => {
    const newPosterData = req.body;

    fs.readFile(editedPath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        const posters = JSON.parse(data);
        posters.push(newPosterData);

        fs.writeFile(editedPath, JSON.stringify(posters, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save data' });
            }
            res.json({ message: 'Poster saved successfully' });
        });
    });
});

// Define a route to serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join( __dirname, '../client/homepage/index.html'));
});
app.listen(port, () => console.log(`Server running on port ${port}`));