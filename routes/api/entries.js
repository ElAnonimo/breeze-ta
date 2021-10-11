const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middlewares/auth');
const Entry = require('../../models/Entry');

// @route GET api/entries
// @desc get all entries
// @access public
router.get('/', async (req, res) => {
  try {
    const entries = await Entry
      .find({})
      .sort({ date: -1 });    // -1 to sort descending

    await res.json(entries);
  } catch(err) {
    console.log('error fetching all entries:', err.message);
    res.status(500).json({ message: 'error fetching all entries' });
  }
});

// @route POST api/entry
// @desc create or update entry
// @access private
router.post('/', [auth, [
  check('name', 'name is required').not().isEmpty(),
  check('number', 'number is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // build entry object
  const entryFields = {};
  entryFields.name = req.body.name;
  entryFields.number = req.body.number;
  entryFields.user = req.user.id;

  try {
    let entry = await Entry.findOne({ user: req.user.id });

    if (entry) {
      // update entry
      entry = await Entry.findOneAndUpdate(
        { user: req.user.id },
        { $set: entryFields },
        { new: true }
      );

      return await res.json(entry);
    }

    // create entry
    entry = new Entry(entryFields);
    await entry.save();
    await res.json(entry);
  } catch(err) {
    console.log('error creating or updating entry:', err.message);
    res.status(500).send({ message: 'error creating or updating entry' });
  }
});

// @route GET api/entry/entry/:entry_id
// @desc get entry by id
// @access private
router.get('/entry/:entry_id', async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.entry_id);

    if (!entry) {
      return res.status(404).json({ message: 'no entry found for id provided' });
    }

    await res.json(entry);
  } catch(err) {
    console.log('error fetching entry by id:', err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'no entry found for id provided' });
    }

    res.status(500).json({ message: 'error fetching entry by id' });
  }
});

// @route DELETE api/entry/entry/:entry_id
// @desc delete entry by id
// @access private
router.delete('/entry/:entry_id', auth, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.entry_id);

    if (!entry) {
      return res.status(404).json({ message: 'no entry found for id provided' });
    }

    // check if current user owns entry
    if (entry.user.toString() !== req.user.id) {
      // 401 for not authorized
      return res.status(401).json({ message: 'user not authorized to delete this entry' });
    }

    await entry.remove();

    await res.json({ message: 'entry deleted' });
  } catch(err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'no entry found for id provided' });
    }

    res.status(500).json({ message: 'error deleting entry by id' });
  }
});

module.exports = router;
