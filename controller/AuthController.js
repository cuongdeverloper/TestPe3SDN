const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.showLogin = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.render('login', { error: 'Invalid credentials' });
  }

  req.session.user = user;
  res.redirect(user.role === 'admin' ? '/registrations/list' : '/events/register');
};
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('register', { error: 'Username already exists' });
    }

    // Validate role
    if (role !== 'admin' && role !== 'student') {
      return res.render('register', { error: 'Invalid role. Must be either admin or student.' });
    }

    const newUser = new User({ username, password, role: role || 'student' });
    await newUser.save();

    // Redirect on success
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.render('register', { error: 'Internal Server Error' });
  }
};



exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};