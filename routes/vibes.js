var express = require('express');
var router = express.Router();
const models = require('../models/model');
const io = require('../sockets/base');

/* GET users listing. */
router.put('/update/:_id', function (req, res, next) {
    const changedEntry = req.body.vibe;
    io.emit('vibe', {
        'vibe': changedEntry
    });
    
    var query = {};
    if (changedEntry == 'laugh') {
        query = {
            'vibes.laugh': 1
        };
    } else if (changedEntry == 'smile') {
        query = {
            'vibes.smile': 1
        };
    } else if (changedEntry == 'wow') {
        query = {
            'vibes.wow': 1
        };
    } else if (changedEntry == 'sad') {
        query = {
            'vibes.sad': 1
        };
    } else if (changedEntry == 'angry') {
        query = {
            'vibes.angry': 1
        };
    }

    models.Rooms.findByIdAndUpdate({
        _id: req.params._id
    }, {
        $inc: query
    }, {new:true}).exec(function (e, result) {
        if (e) {
            res.status(500).send(e);
            console.log(e.message);
        } else {
            io.emit('rooms', result);
            res.send(result);
        }
    });
});

module.exports = router;
