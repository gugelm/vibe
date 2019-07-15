const mongoose = require('mongoose');

// ===============
// Database Config
// ===============
const Schema = mongoose.Schema;
// mongoose.connect('mongodb://justfortuts:a1b2c3d4@ds155461.mlab.com:55461/justfortuts', {
//     useNewUrlParser: true
// });
mongoose.connect('mongodb://viberuser:viberpass123@ds249967.mlab.com:49967/viberdb', {
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