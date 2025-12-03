const express = require('express');
const Developer = require('../models/Developer');
const router = express.Router();

// Get all developers with optional filters
router.get('/', async (req, res) => {
  try {
    const { role, search } = req.query;
    let query = {};

    if (role && role !== 'All') {
      query.role = role;
    }

    if (search) {
      query.techStack = { $regex: search, $options: 'i' };
    }

    const developers = await Developer.find(query)
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: developers.length,
      data: developers
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch developers',
      error: err.message
    });
  }
});

// Add new developer
router.post('/', async (req, res) => {
  try {
    const { name, role, techStack, experience } = req.body;

    // Validation
    if (!name || !role || !techStack || experience === undefined) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

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

    const developer = await Developer.create({
      name: name.trim(),
      role,
      techStack: techArray,
      experience: Number(experience)
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
    
    res.status(500).json({
      success: false,
      message: 'Failed to add developer',
      error: err.message
    });
  }
});

module.exports = router;