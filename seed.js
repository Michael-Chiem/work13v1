const mongoose = require('mongoose');
const YourModel = require('./yourModel');

mongoose.connect('mongodb://localhost:27017/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        return YourModel.create([
            { ani: '1234567890', customer_info: 'CCI', final_reason: 'Reason 1', spamscore: 0.5, fraudscore: 0.3, violationscore: 0.2, spamreason: 'Reason 2', attest: 'Attest 1', count: 1 },
            // Add more documents as needed
        ]);
    })
    .then(() => {
        console.log('Database seeded successfully');
        mongoose.connection.close();
    })
    .catch(err => console.error(err));