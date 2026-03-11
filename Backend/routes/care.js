const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getCareEntries,
  createCareEntry,
  updateCareEntry,
  deleteCareEntry
} = require('../controllers/careController');

// All routes require authentication
router.get('/', auth, getCareEntries);
router.post('/', auth, createCareEntry);
router.put('/:id', auth, updateCareEntry);
router.delete('/:id', auth, deleteCareEntry);

module.exports = router;