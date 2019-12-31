const express = require('express');
const router = express.Router();

// @route   GET api/cexercises
// @desc    Get all users exercises
// @acces   Private
router.get('/', (req, res) => {
  res.send("Get all user's exercises!");
});

// @route   POST api/exercises
// @desc    Add a new exercises
// @acces   Private
router.post('/', (req, res) => {
  res.send('Add an exercise!');
});

// @route   PUT api/exercises/:id
// @desc    Update user's exercise
// @acces   Private
router.put('/:id', (req, res) => {
  res.send("Update a user's exercise!");
});

// @route   DELETE api/exercises/:id
// @desc    Delete user's exercise
// @acces   Private
router.delete('/:id', (req, res) => {
  res.send("Delete a user's exercise!");
});

module.exports = router;
