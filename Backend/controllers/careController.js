const JewelryCare = require('../models/JewelryCare');

// Get all care entries for user
exports.getCareEntries = async (req, res) => {
  try {
    const entries = await JewelryCare.find({ user: req.user._id })
      .populate('product')
      .sort({ createdAt: -1 });
    
    res.json(entries);
  } catch (error) {
    console.error('Get care entries error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create care entry
exports.createCareEntry = async (req, res) => {
  try {
    const { product, lastCleaned, notes } = req.body;

    const careEntry = new JewelryCare({
      user: req.user._id,
      product,
      lastCleaned,
      notes
    });

    await careEntry.save();
    await careEntry.populate('product');

    res.status(201).json(careEntry);
  } catch (error) {
    console.error('Create care entry error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update care entry
exports.updateCareEntry = async (req, res) => {
  try {
    const { lastCleaned, notes } = req.body;

    const careEntry = await JewelryCare.findById(req.params.id);

    if (!careEntry) {
      return res.status(404).json({ message: 'Care entry not found' });
    }

    // Check if user owns this entry
    if (careEntry.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (lastCleaned) careEntry.lastCleaned = lastCleaned;
    if (notes !== undefined) careEntry.notes = notes;

    await careEntry.save();
    await careEntry.populate('product');

    res.json(careEntry);
  } catch (error) {
    console.error('Update care entry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete care entry
exports.deleteCareEntry = async (req, res) => {
  try {
    const careEntry = await JewelryCare.findById(req.params.id);

    if (!careEntry) {
      return res.status(404).json({ message: 'Care entry not found' });
    }

    // Check if user owns this entry
    if (careEntry.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await JewelryCare.findByIdAndDelete(req.params.id);

    res.json({ message: 'Care entry deleted successfully' });
  } catch (error) {
    console.error('Delete care entry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};