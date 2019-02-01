const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    player: { type: String, required: true },
    gametype: { type: String, required: true },
    tablesize: { type: String, required: true },
    location: { type: String, required: true },
    game: { type: String, required: true },
    buyin: { type: Number, required: true },
    cashout: { type: Number, required: true },
    session_balance: { type: Number, required: true },
    date: { type: String, required: true }
});

module.exports = mongoose.model('Session', sessionSchema);