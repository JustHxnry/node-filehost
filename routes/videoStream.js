const express = require('express');
const videoStreamController = require('./../controllers/videoStream');

const router = express.Router();

router
    .get('/:id', videoStreamController);

module.exports = router;