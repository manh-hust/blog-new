const express = require('express');
const router = express.Router();

const UserController = require('../app/controllers/UserController');
const authMiddleware = require('../app/middleware/auth');

router.get('/list-users', authMiddleware.requireAuth, UserController.show);
router.get('/create', UserController.create);
router.post('/store', UserController.store);
router.put('/:id', UserController.update);
router.delete('/:id/delete', UserController.delete);
router.get('/:id/infor', authMiddleware.requireAuth, UserController.infor);

module.exports = router;
