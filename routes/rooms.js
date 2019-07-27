var express = require('express');
var router = express.Router();
const models = require('../models/model');
const io = require('../sockets/base');

/* GET users listing. */
router.put('/enter/:_id', function (req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    var query = {
        "vibers": 1
    };
    
    models.Rooms.findByIdAndUpdate({
        _id: req.params._id
    }, {
        $inc: query
    }, {
        new: true
    }).exec(function (e, result) {
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
