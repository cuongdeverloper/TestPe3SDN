const express = require('express');
const router = express.Router();
const authController = require('../controller/AuthController');

router.get('/', (req, res) => {
  res.render('auth'); 
});
router.get('/register', (req, res) => {
  res.render('register', { error: null });
});



router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/register', authController.register);


module.exports = router;
