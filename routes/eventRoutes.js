const express = require('express');
const router = express.Router();
const eventController = require('../controller/EventController');
const { isLoggedIn, requireRole } = require('../middleware/middleware');

router.get('/register', isLoggedIn, requireRole('student'), eventController.showRegisterEvent);
router.post('/:id/register', isLoggedIn, requireRole('student'), eventController.registerForEvent);

module.exports = router