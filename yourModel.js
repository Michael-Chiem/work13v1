const mongoose = require('mongoose');

const yourSchema = new mongoose.Schema({
    ani: { type: String, required: true },
    final_reason: { type: String, required: true },
    spamscore: { type: Number, required: true },
    fraudscore: { type: Number, required: true },
    violationscore: { type: Number, required: true },
    spamreason: { type: String, required: true },
    attest: { type: String, required: true },
    count: { type: Number, required: true }
});

const YourModel = mongoose.model('YourModel', yourSchema);

module.exports = YourModel;
