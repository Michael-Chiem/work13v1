const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = 3001;

const YourModel = require('./yourModel');

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error(err));

app.get('/search/:ani', (req, res) => {
    const { ani } = req.params;

    console.log('Searching for ANI:', ani);

    YourModel.findOne({ ani: ani.trim() })
        .then(data => {
            if (!data) {
                console.log('Data not found for ANI:', ani);
                return res.status(404).json({ message: 'Data not found' });
            }
            console.log('Data found for ANI:', ani);
            res.json(data);
        })
        .catch(err => {
            console.error('Error searching for ANI:', ani);
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
