const express = require('express');
const router = express.Router();

const AdminController = require('../app/controllers/AdminController');

router.get('/create/notifications', AdminController.show);
router.post('/store/notifications', AdminController.store);

module.exports = router;
