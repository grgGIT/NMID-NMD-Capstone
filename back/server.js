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
// Configure multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });
// const upload = multer({ storage: storage });

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

    res.json({id: 1, svg: 'assets/geoff-nuclear-svg.svg'});
});


// app.post('/save', upload.fields([{ name: 'image' }, { name: 'html' }, { name: 'svg' }]), (req, res) => {
//     // const { imageData, name, originalPoster } = req.body;
//     const { name, originalPoster } = req.body;
//     const imageFile = req.files['image'][0];
//     const htmlFile = req.files['html'][0];
//     const svgFile = req.files['svg'][0];


    // const base64Data = imageData.replace(/^data:image\/png;base64,/, "");
    // const filePath = `uploads/${Date.now()}.png`;

    // fs.writeFile(filePath, base64Data, 'base64', (err) => {
    //     if (err) {
    //         return res.status(500).json({ error: 'Failed to save image' });
    //     }

        // const newPoster = {
        //     name,
        //     dateTime: new Date().toISOString(),
        //     imagePath: filePath,
        //     htmlPath: htmlFile.path,
        //     svgPath: svgFile.path,
        //     originalPoster
        // };

//         fs.readFile(dataFilePath, (err, data) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Failed to read data file' });
//             }

//             const posters = JSON.parse(data);
//             posters.push(newPoster);

//             fs.writeFile(dataFilePath, JSON.stringify(posters, null, 2), (err) => {
//                 if (err) {
//                     return res.status(500).json({ error: 'Failed to save data file' });
//                 }
//                 res.json({ message: 'Save successful' });
//             });
//         });
//     });
// });


// fs.readFile(editedPath, (err, data) => {
//     if (err) {
//         return res.status(500).json({ error: 'Failed to read data file' });
//     }

//     const posters = JSON.parse(data);
//     posters.push(newPoster);

//     fs.writeFile(editedPath, JSON.stringify(posters, null, 2), (err) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to save data file' });
//         }
//         res.json({ message: 'Save successful' });
//     });
// });
// });

// app.get('/getPosters', (req, res) => {
//     fs.readFile(dataFilePath, (err, data) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to read data file' });
//         }
//         res.json(JSON.parse(data));
//     });
// });
// Define a route to serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join( __dirname, '../client/homepage/index.html'));
});
app.listen(port, () => console.log(`Server running on port ${port}`));