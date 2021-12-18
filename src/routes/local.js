const express = require('express');
const router = express.Router();

const localController = require('../app/controllers/LocalController');

router.get('/everybody', localController.index);

module.exports = router;
