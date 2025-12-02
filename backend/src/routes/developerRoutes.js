const express = require('express');
const { readDevelopers, writeDevelopers, generateId } = require('../utils/fileHandler');
const router = express.Router();

// Validation helper
const validateDeveloper = (data) => {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  
  if (!data.role) {
    errors.push('Role is required');
  }
  
  const validRoles = ['Frontend', 'Backend', 'Full-Stack', 'DevOps', 'Mobile'];
  if (data.role && !validRoles.includes(data.role)) {
    errors.push('Invalid role selected');
  }
  
  if (!data.techStack || (typeof data.techStack === 'string' && !data.techStack.trim())) {
    errors.push('Tech stack is required');
  }
  
  if (data.experience === undefined || data.experience < 0) {
    errors.push('Valid experience is required');
  }
  
  if (data.experience > 50) {
    errors.push('Experience seems too high');
  }
  
  return errors;
};

// Get all developers with optional filters
router.get('/', async (req, res) => {
  try {
    const { role, search } = req.query;
    let developers = await readDevelopers();

    // Filter by role
    if (role && role !== 'All') {
      developers = developers.filter(dev => dev.role === role);
    }

    // Search in tech stack
    if (search) {
      const searchLower = search.toLowerCase();
      developers = developers.filter(dev =>
        dev.techStack.some(tech => 
          tech.toLowerCase().includes(searchLower)
        )
      );
    }

    // Sort by newest first
    developers.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.json({
      success: true,
      count: developers.length,
      data: developers
    });
  } catch (err) {
    console.error('Error reading developers:', err);
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

    // Validate input
    const validationErrors = validateDeveloper(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: validationErrors.join(', ')
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

    // Read existing developers
    const developers = await readDevelopers();

    // Create new developer object
    const newDeveloper = {
      _id: generateId(),
      name: name.trim(),
      role,
      techStack: techArray,
      experience: Number(experience),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to array
    developers.push(newDeveloper);

    // Save to file
    await writeDevelopers(developers);

    res.status(201).json({
      success: true,
      message: 'Developer added successfully',
      data: newDeveloper
    });
  } catch (err) {
    console.error('Error adding developer:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to add developer',
      error: err.message
    });
  }
});

// Get single developer by ID (bonus endpoint)
router.get('/:id', async (req, res) => {
  try {
    const developers = await readDevelopers();
    const developer = developers.find(dev => dev._id === req.params.id);

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
    res.status(500).json({
      success: false,
      message: 'Failed to fetch developer',
      error: err.message
    });
  }
});

module.exports = router;