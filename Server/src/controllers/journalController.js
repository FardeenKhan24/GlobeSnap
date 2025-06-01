const Journal = require('../models/Journal');
const fs = require('fs');
const path = require('path');

const createJournal = async (req, res) => {
  const { title, location, description, date } = req.body;

  if (
    !title?.trim() ||
    !location?.trim() ||
    !date?.trim() ||
    !description?.trim() ||
    !req.files || 
    req.files.length === 0
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

if (description.trim().length < 50) {
  return res.status(400).json({ message: 'Experience must be at least 50 characters long' });
}


  const images = req.files.map(file => file.path.replace(/\\/g, '/'));

  const journal = new Journal({
    user: req.user.id,
    title,
    location,
    description,
    date,
    images,
  });

  try {
    await journal.save();
    res.status(201).json(journal);
  } catch (error) {
    console.error('Error creating journal entry:', error);
    res.status(500).json({ message: 'Server error while creating journal entry' });
  }
};


const getUserJournals = async (req, res) => {
    const journals = await Journal.find({ user: req.user.id });
    res.json(journals);
};

const editJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    if (journal.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { title, location, description, date } = req.body;

    if (
      !title?.trim() ||
      !location?.trim() ||
      !date?.trim() ||
      !description?.trim()
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (description.trim().length < 50) {
      return res
        .status(400)
        .json({ message: 'Experience must be at least 50 characters long' });
    }

    if (req.files && req.files.length > 0) {
      journal.images = req.files.map((file) => file.path.replace(/\\/g, '/'));
    }

    journal.title = title;
    journal.location = location;
    journal.description = description;
    journal.date = date;

    await journal.save();

    res.json({ message: 'Journal updated successfully', journal });
  } catch (error) {
    console.error('Error editing journal:', error);
    res.status(500).json({ message: 'Server error while updating journal' });
  }
};


const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    if (journal.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Journal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });

  } catch (error) {
    console.error('Error deleting journal:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};



module.exports = { createJournal, getUserJournals, deleteJournal,editJournal };
