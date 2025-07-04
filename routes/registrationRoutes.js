const express = require('express');
const router = express.Router();
const registrationController = require('../controller/registrationController');
const { isLoggedIn, requireRole } = require('../middleware/middleware');

router.get('/cancel', isLoggedIn, requireRole('student'), registrationController.showCancelPage);
router.post('/:id', isLoggedIn, requireRole('student'), registrationController.cancelRegistration);
router.get('/list', isLoggedIn, requireRole('admin'), registrationController.viewRegistrations);
router.get('/search', isLoggedIn, requireRole('admin'), registrationController.searchByDate);

module.exports = router;