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
  },
  about: {
    type: String,
    default: '',
    maxlength: [1000, 'About section cannot exceed 1000 characters']
  },
  photoUrl: {
    type: String,
    default: ''
  },
  joiningDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
developerSchema.index({ role: 1 });
developerSchema.index({ techStack: 1 });
developerSchema.index({ experience: 1 });
developerSchema.index({ name: 'text', about: 'text' });

module.exports = mongoose.model('Developer', developerSchema);