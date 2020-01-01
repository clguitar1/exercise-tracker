const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth.middleware');

const User = require('../models/User');
const Exercise = require('../models/Exercise');

// @route   GET api/exercises
// @desc    Get all users exercises
// @acces   Private
router.get('/', auth, async (req, res) => {
  try {
    // In users.js we assigned the user from the jwt payload to req.user so we can use the id in req.user.id from auth.js.
    const exercises = await Exercise.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(exercises);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/exercises
// @desc    Add a new exercise
// @acces   Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, sets, reps, duration } = req.body;

    try {
      const newExercise = new Exercise({
        name,
        sets,
        reps,
        duration,
        // In users.js we assigned the user from the jwt payload to req.user so we can use the id in req.user.id from auth.js.
        user: req.user.id
      });

      const exercise = await newExercise.save();

      res.json(exercise);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/exercises/:id
// @desc    Update user's exercise
// @acces   Private
router.put('/:id', auth, async (req, res) => {
  const { name, sets, reps, duration } = req.body;

  // build an exercise object
  const exerciseFields = {};
  if (name) exerciseFields.name = name;
  if (sets) exerciseFields.sets = sets;
  if (reps) exerciseFields.reps = reps;
  if (duration) exerciseFields.duration = duration;

  try {
    // get the right exercise to update
    let exercise = await Exercise.findById(req.params.id);

    if (!exercise) return res.status(404).json({ msg: 'Exercise not found' });

    // verify that user owns the exercise
    if (exercise.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      { $set: exerciseFields },
      { new: true }
    );

    res.json(exercise);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/exercises/:id
// @desc    Delete user's exercise
// @acces   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // get the right exercise to update
    let exercise = await Exercise.findById(req.params.id);

    if (!exercise) return res.status(404).json({ msg: 'Exercise not found' });

    // verify that user owns the exercise
    if (exercise.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Exercise.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Exercise deleted.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
