// server.js

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
    
        // Construct a regex pattern to match ANI with or without the country code
        const aniWithoutCountryCode = ani.replace(/^1/, ''); // Remove the leading '1' if present
        const aniWithCountryCode = '1' + aniWithoutCountryCode; // Add the country code
        const aniRegex = new RegExp(`^(${aniWithCountryCode}|${aniWithoutCountryCode})$`);
    
        YourModel.find({ ani: { $regex: aniRegex } })
            .then(data => {
                if (!data || data.length === 0) {
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
