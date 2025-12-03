const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['Frontend', 'Backend', 'Full-Stack', 'DevOps', 'Mobile']
  },
  techStack: [{
    type: String,
    trim: true
  }],
  experience: {
    type: Number,
    required: [true, 'Experience is required'],
    min: [0, 'Experience cannot be negative'],
    max: [50, 'Experience seems too high']
  }
}, {
  timestamps: true
});

// Index for faster searches
developerSchema.index({ role: 1 });
developerSchema.index({ techStack: 1 });

module.exports = mongoose.model('Developer', developerSchema);