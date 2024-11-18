const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

const clientPath = path.join(__dirname, '..', 'client');
app.use(express.static(clientPath));
app.use(express.json());

const dataFilePath = path.join(__dirname, 'posters.json');

// Ensure the data file exists
if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
}

// Endpoint to retrieve posters
app.get('/getPosters', (req, res) => {
    fs.readFile(dataFilePath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data file' });
        }
        res.json(JSON.parse(data));
    });
});

app.post('/save', (req, res) => {
    const { imageData, name, originalPoster } = req.body;
    const base64Data = imageData.replace(/^data:image\/png;base64,/, "");
    const filePath = `uploads/${Date.now()}.png`;

    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to save image' });
        }

        const newPoster = {
            name,
            dateTime: new Date().toISOString(),
            imagePath: filePath,
            originalPoster
        };

        fs.readFile(dataFilePath, (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read data file' });
            }

            const posters = JSON.parse(data);
            posters.push(newPoster);

            fs.writeFile(dataFilePath, JSON.stringify(posters, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to save data file' });
                }
                res.json({ message: 'Save successful' });
            });
        });
    });
});

// app.get('/getPosters', (req, res) => {
//     fs.readFile(dataFilePath, (err, data) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to read data file' });
//         }
//         res.json(JSON.parse(data));
//     });
// });

app.listen(port, () => console.log(`Server running on port ${port}`));