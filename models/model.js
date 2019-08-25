const mongoose = require('mongoose');

// ===============
// Database Config
// ===============
const Schema = mongoose.Schema;

mongoose.connect('mongodb+srv://rk_vibe:rkvibe123@cluster0-yoxmj.mongodb.net/viberdb?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

// =======
// Schemas
// =======

const roomsSchema = new Schema({
    title: String,
    season: Number,
    episode: Number,
    vibers: Number,
    vibes: {
        haha: Number,
        smile: Number,
        wow: Number,
        sad: Number,
        angry: Number
    },
    created: {
        type: Date,
        default: Date.now
    }
}, {
    strict: false
});

const models = {};
models.Rooms = mongoose.model('rooms', roomsSchema);

module.exports = models;