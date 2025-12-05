const express = require('express');
const Developer = require('../models/Developer');
const { protect } = require('../middleware/auth');
const { developerSchema } = require('../validation/developerSchema');
const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// @route   GET /api/developers
// @desc    Get all developers with filters, search, sort, pagination
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { role, search, sort, page = 1, limit = 10 } = req.query;
    
    // Build query
    let query = {};

    // Filter by role
    if (role && role !== 'All') {
      query.role = role;
    }

    // Search by name or tech stack
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { techStack: { $regex: search, $options: 'i' } },
        { about: { $regex: search, $options: 'i' } }
      ];
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // Default: newest first
    
    if (sort === 'exp_asc') {
      sortOption = { experience: 1 };
    } else if (sort === 'exp_desc') {
      sortOption = { experience: -1 };
    } else if (sort === 'name_asc') {
      sortOption = { name: 1 };
    } else if (sort === 'name_desc') {
      sortOption = { name: -1 };
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const developers = await Developer.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .populate('createdBy', 'name email');

    // Get total count for pagination
    const total = await Developer.countDocuments(query);

    res.json({
      success: true,
      count: developers.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: developers
    });
  } catch (err) {
    console.error('Error fetching developers:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch developers',
      error: err.message
    });
  }
});

// @route   GET /api/developers/:id
// @desc    Get single developer by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const developer = await Developer.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!developer) {
      return res.status(404).json({
        success: false,
        message: 'Developer not found'
      });
    }

    res.json({
      success: true,
      data: developer
    });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Developer not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to fetch developer',
      error: err.message
    });
  }
});

// @route   POST /api/developers
// @desc    Create new developer
// @access  Private
router.post('/', async (req, res) => {
  try {
    // Validate input
    const { error } = developerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { name, role, techStack, experience, about, photoUrl, joiningDate } = req.body;

    // Process tech stack
    const techArray = typeof techStack === 'string' 
      ? techStack.split(',').map(tech => tech.trim()).filter(Boolean)
      : techStack;

    if (techArray.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one technology is required'
      });
    }

    // Create developer
    const developer = await Developer.create({
      name: name.trim(),
      role,
      techStack: techArray,
      experience: Number(experience),
      about: about || '',
      photoUrl: photoUrl || '',
      joiningDate: joiningDate || Date.now(),
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Developer added successfully',
      data: developer
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(err.errors).map(e => e.message).join(', ')
      });
    }
    
    console.error('Error creating developer:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to add developer',
      error: err.message
    });
  }
});

// @route   PUT /api/developers/:id
// @desc    Update developer
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    // Validate input
    const { error } = developerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { name, role, techStack, experience, about, photoUrl, joiningDate } = req.body;

    // Check if developer exists
    let developer = await Developer.findById(req.params.id);
    
    if (!developer) {
      return res.status(404).json({
        success: false,
        message: 'Developer not found'
      });
    }

    // Process tech stack
    const techArray = typeof techStack === 'string' 
      ? techStack.split(',').map(tech => tech.trim()).filter(Boolean)
      : techStack;

    // Update fields
    developer.name = name.trim();
    developer.role = role;
    developer.techStack = techArray;
    developer.experience = Number(experience);
    developer.about = about || '';
    developer.photoUrl = photoUrl || '';
    if (joiningDate) developer.joiningDate = joiningDate;

    await developer.save();

    res.json({
      success: true,
      message: 'Developer updated successfully',
      data: developer
    });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Developer not found'
      });
    }
    
    console.error('Error updating developer:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to update developer',
      error: err.message
    });
  }
});

// @route   DELETE /api/developers/:id
// @desc    Delete developer
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const developer = await Developer.findById(req.params.id);

    if (!developer) {
      return res.status(404).json({
        success: false,
        message: 'Developer not found'
      });
    }

    await developer.deleteOne();

    res.json({
      success: true,
      message: 'Developer deleted successfully'
    });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Developer not found'
      });
    }
    
    console.error('Error deleting developer:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to delete developer',
      error: err.message
    });
  }
});

module.exports = router;