const mongoose = require('mongoose');

const jewelryCareSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  lastCleaned: {
    type: Date,
    default: Date.now
  },
  nextCleaningDue: {
    type: Date
  },
  notes: {
    type: String
  },
  cleaningFrequency: {
    type: Number,
    default: 30 // days
  }
}, {
  timestamps: true
});

// Auto-calculate next cleaning date
jewelryCareSchema.pre('save', function(next) {
  if (this.lastCleaned && this.cleaningFrequency) {
    const nextDate = new Date(this.lastCleaned);
    nextDate.setDate(nextDate.getDate() + this.cleaningFrequency);
    this.nextCleaningDue = nextDate;
  }
  next();
});

module.exports = mongoose.model('JewelryCare', jewelryCareSchema);