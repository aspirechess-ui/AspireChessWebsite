const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: String,
    required: true,
    trim: true
  }
});

const batchSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true
  },
  schedule: {
    type: String,
    required: true,
    trim: true
  },
  slots: [slotSchema]
});

const programSchema = new mongoose.Schema({
  branch: {
    type: String,
    required: [true, 'Branch name is required'],
    trim: true,
    maxlength: [100, 'Branch name cannot exceed 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  batches: [batchSchema],
  features: [{
    type: String,
    trim: true,
    maxlength: [100, 'Feature cannot exceed 100 characters']
  }],
  colorTheme: {
    type: String,
    enum: ['green', 'blue', 'purple', 'orange', 'red', 'indigo', 'pink', 'yellow'],
    default: 'blue'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  whatsappNumber: {
    type: String,
    default: "+917039184939",
    trim: true
  }
}, {
  timestamps: true
});

// Index for efficient querying
programSchema.index({ isActive: 1, displayOrder: 1 });

module.exports = mongoose.model('Program', programSchema);