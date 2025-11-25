const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const Property = require('../models/Property');
const { protect } = require('../middleware/authMiddleware');
const asyncHandler = require('../middleware/async');

// Get user's favorites
router.get('/', protect, asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ user: req.user.id })
    .populate({
      path: 'property',
      populate: { path: 'owner', select: 'name email phone' }
    })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: favorites.length,
    data: favorites.map(f => f.property)
  });
}));

// Add to favorites
router.post('/:propertyId', protect, asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.propertyId);

  if (!property) {
    return res.status(404).json({
      success: false,
      error: 'Property not found'
    });
  }

  // Check if already favorited
  const existing = await Favorite.findOne({
    user: req.user.id,
    property: req.params.propertyId
  });

  if (existing) {
    return res.status(400).json({
      success: false,
      error: 'Property already in favorites'
    });
  }

  const favorite = await Favorite.create({
    user: req.user.id,
    property: req.params.propertyId
  });

  // Update property favorites count
  await Property.findByIdAndUpdate(req.params.propertyId, {
    $inc: { favorites: 1 }
  });

  res.status(201).json({
    success: true,
    data: favorite
  });
}));

// Remove from favorites
router.delete('/:propertyId', protect, asyncHandler(async (req, res) => {
  const favorite = await Favorite.findOneAndDelete({
    user: req.user.id,
    property: req.params.propertyId
  });

  if (!favorite) {
    return res.status(404).json({
      success: false,
      error: 'Favorite not found'
    });
  }

  // Update property favorites count
  await Property.findByIdAndUpdate(req.params.propertyId, {
    $inc: { favorites: -1 }
  });

  res.status(200).json({
    success: true,
    data: {}
  });
}));

// Check if property is favorited
router.get('/check/:propertyId', protect, asyncHandler(async (req, res) => {
  const favorite = await Favorite.findOne({
    user: req.user.id,
    property: req.params.propertyId
  });

  res.status(200).json({
    success: true,
    isFavorited: !!favorite
  });
}));

module.exports = router;
