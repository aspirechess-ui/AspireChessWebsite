const express = require('express');
const { body, validationResult } = require('express-validator');
const Program = require('../models/Program');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Validation rules for program
const programValidation = [
  body('branch')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Branch name must be between 2 and 100 characters'),
  body('location')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Location must be between 2 and 200 characters'),
  body('batches')
    .isArray({ min: 1 })
    .withMessage('At least one batch is required'),
  body('batches.*.type')
    .trim()
    .notEmpty()
    .withMessage('Batch type is required'),
  body('batches.*.schedule')
    .trim()
    .notEmpty()
    .withMessage('Batch schedule is required'),
  body('batches.*.slots')
    .isArray({ min: 1 })
    .withMessage('At least one slot is required per batch'),
  body('batches.*.slots.*.time')
    .trim()
    .notEmpty()
    .withMessage('Slot time is required'),
  body('batches.*.slots.*.level')
    .trim()
    .notEmpty()
    .withMessage('Slot level is required'),
  body('features')
    .isArray({ min: 1 })
    .withMessage('At least one feature is required'),
  body('features.*')
    .trim()
    .notEmpty()
    .withMessage('Feature cannot be empty'),
  body('colorTheme')
    .optional()
    .isIn(['green', 'blue', 'purple', 'orange', 'red', 'indigo', 'pink', 'yellow'])
    .withMessage('Invalid color theme'),
  body('whatsappNumber')
    .trim()
    .notEmpty()
    .withMessage('WhatsApp number is required')
    .matches(/^\+\d{1,4}\d{10}$/)
    .withMessage('WhatsApp number must be in format +countrycode followed by 10 digits'),
  body('displayOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Display order must be a non-negative integer')
];

// @route   GET /api/programs/test
// @desc    Test programs route
// @access  Public
router.get('/test', (req, res) => {
  console.log('Programs test route hit');
  res.json({
    success: true,
    message: 'Programs route is working',
    timestamp: new Date().toISOString()
  });
});

// @route   GET /api/programs
// @desc    Get all active programs (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/programs - Fetching active programs...');
    const programs = await Program.find({ isActive: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .select('-__v');
    
    console.log('GET /api/programs - Found programs:', programs.length);

    res.json({
      success: true,
      count: programs.length,
      data: programs
    });
  } catch (error) {
    console.error('Get programs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching programs'
    });
  }
});

// @route   GET /api/programs/admin
// @desc    Get all programs for admin (including inactive)
// @access  Private (Admin only)
router.get('/admin', [auth, adminOnly], async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = 'all' } = req.query;

    // Build query
    let query = {};

    if (search) {
      query.$or = [
        { branch: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    if (status !== 'all') {
      query.isActive = status === 'active';
    }

    // Execute query with pagination
    const programs = await Program.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Program.countDocuments(query);

    res.json({
      success: true,
      count: programs.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: programs
    });
  } catch (error) {
    console.error('Get admin programs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching programs'
    });
  }
});

// @route   GET /api/programs/:id
// @desc    Get single program
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id).select('-__v');

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    res.json({
      success: true,
      data: program
    });
  } catch (error) {
    console.error('Get program error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid program ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while fetching program'
    });
  }
});

// @route   POST /api/programs
// @desc    Create new program
// @access  Private (Admin only)
router.post('/', [auth, adminOnly, ...programValidation], async (req, res) => {
  console.log('=== POST /api/programs route hit ===');
  console.log('Request headers:', req.headers);
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  console.log('User:', req.user ? { email: req.user.email, role: req.user.role } : 'No user');
  
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('=== Validation errors ===');
      console.log(errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
        receivedData: req.body
      });
    }

    console.log('=== Validation passed, creating program ===');
    
    // Create program instance
    const programData = {
      branch: req.body.branch,
      location: req.body.location,
      batches: req.body.batches,
      features: req.body.features,
      colorTheme: req.body.colorTheme || 'blue',
      whatsappNumber: req.body.whatsappNumber,
      displayOrder: req.body.displayOrder || 0,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true
    };
    
    console.log('Program data to save:', JSON.stringify(programData, null, 2));
    
    const program = new Program(programData);
    console.log('Program instance created:', program);
    
    // Save to database
    const savedProgram = await program.save();
    console.log('=== Program saved successfully ===');
    console.log('Saved program ID:', savedProgram._id);
    console.log('Saved program:', JSON.stringify(savedProgram, null, 2));

    res.status(201).json({
      success: true,
      message: 'Program created successfully',
      data: savedProgram
    });
  } catch (error) {
    console.error('=== Create program error ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    
    if (error.name === 'ValidationError') {
      console.log('MongoDB validation errors:', error.errors);
      return res.status(400).json({
        success: false,
        message: 'Database validation failed',
        errors: Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message,
          value: err.value
        }))
      });
    }
    
    if (error.name === 'MongoError' || error.name === 'MongoServerError') {
      console.log('MongoDB error:', error);
      return res.status(500).json({
        success: false,
        message: 'Database error',
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while creating program',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// @route   PUT /api/programs/:id
// @desc    Update program
// @access  Private (Admin only)
router.put('/:id', [auth, adminOnly, ...programValidation], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const program = await Program.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    res.json({
      success: true,
      message: 'Program updated successfully',
      data: program
    });
  } catch (error) {
    console.error('Update program error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid program ID'
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Database validation failed',
        errors: Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while updating program',
      error: error.message
    });
  }
});

// @route   PATCH /api/programs/:id/toggle-status
// @desc    Toggle program active status
// @access  Private (Admin only)
router.patch('/:id/toggle-status', [auth, adminOnly], async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    program.isActive = !program.isActive;
    await program.save();

    res.json({
      success: true,
      message: `Program ${program.isActive ? 'activated' : 'deactivated'} successfully`,
      data: program
    });
  } catch (error) {
    console.error('Toggle program status error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid program ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while updating program status'
    });
  }
});

// @route   DELETE /api/programs/:id
// @desc    Delete program
// @access  Private (Admin only)
router.delete('/:id', [auth, adminOnly], async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    // Delete program from database
    await Program.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Program deleted successfully'
    });
  } catch (error) {
    console.error('Delete program error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid program ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while deleting program'
    });
  }
});

// @route   PATCH /api/programs/reorder
// @desc    Reorder programs
// @access  Private (Admin only)
router.patch('/reorder', [auth, adminOnly], async (req, res) => {
  try {
    const { programIds } = req.body;

    if (!Array.isArray(programIds)) {
      return res.status(400).json({
        success: false,
        message: 'Program IDs must be an array'
      });
    }

    // Update display order for each program
    const updatePromises = programIds.map((id, index) =>
      Program.findByIdAndUpdate(id, { displayOrder: index })
    );

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: 'Programs reordered successfully'
    });
  } catch (error) {
    console.error('Reorder programs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while reordering programs'
    });
  }
});

module.exports = router;