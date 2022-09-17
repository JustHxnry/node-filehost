const express = require('express');
const filesController = require('./../controllers/files');

const router = express.Router();

router
    .post('/', filesController.uploadFile)
    .delete('/:file', filesController.deleteFile);

module.exports = router;