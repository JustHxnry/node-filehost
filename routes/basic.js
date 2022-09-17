const express = require('express');
const basicController = require('./../controllers/basic');

const router = express.Router();

router
    .get('/', basicController.home)
    .get('*', basicController.notfound);

module.exports = router;