const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = require('../middleware/auth.middleware');
const JWTSecret = process.env.jwtSecret;
const User = require('../models/User');

// @route   GET api/auth
// @desc    Get logged in user
// @acces   Private
router.get('/', auth, async (req, res) => {
  try {
    // in users.js we assigned the user from the jwt payload to req.user so we can use the id in User.findById(req.user.id)
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth
// @desc    Log in user
// @acces   Public
router.post(
  '/',
  [
    check('email', 'Include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // search for the user by looking for the email
      let user = await User.findOne({ email });

      // if no user
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      // if passwords don't match
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // if passwords match
      // get the user id
      const payload = {
        user: {
          id: user.id
        }
      };
      // sign the token
      jwt.sign(
        payload,
        JWTSecret,
        {
          expiresIn: 3600
        },
        // return the token
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
