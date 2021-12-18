const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeColltroler');

router.get('/stored/courses', meController.storedCourses);
router.get('/stored/notifications', meController.storedNoti);
router.post('/:id/delete-notifications', meController.deleteNoti);
router.get('/stored/courses/search', meController.searchCourses);
router.get('/trash/courses', meController.trashCourses);
router.get('/friends', meController.listFriends);
router.post('/:id/addfriend', meController.addFriends);
router.post('/:id/deletefriend', meController.deleteFriends);

module.exports = router;
