// const express = require('express')
// const path = require('path');
// const socketIo = require('socket.io');
// const app = express()
// const port = 3000

// app.use(express.static(path.join( __dirname, 'client' ))); 

// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

// // Connect MongoDB at default port 27017.
// mongoose.connect('mongodb://localhost:27017/DB Name', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
// }, (err) => {
//     if (!err) {
//         console.log('MongoDB Connection Succeeded.')
//     } else {
//         console.log('Error in DB connection: ' + err)
//     }
// });

// var array = [{
//     field:item
// }, {
//     field:item
// }];
// Model.create(
//     array
// ).then((docs) => {
    
// });


// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// module.exports = app

const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/yourDB', { useNewUrlParser: true, useUnifiedTopology: true });

const saveSchema = new mongoose.Schema({
    name: String,
    dateTime: String,
    imagePath: String 
});

const Save = mongoose.model('Save', saveSchema);

app.use(express.json());

app.post('/save', (req, res) => {
    const newSave = new Save(req.body);
    newSave.save()
        .then(() => res.json({ message: 'Save successful' }))
        .catch(err => res.status(400).json({ error: err.message }));
});
app.get('/getPosters', (req, res) => {
    Save.find({})
        .then(posters => res.json(posters))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(3000, () => console.log('Server running on port 3000'));