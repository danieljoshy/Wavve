const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { protect } = require('../middleware/auth')

// @route GET /api/users
router.get('/', protect, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select('-password')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @route GET /api/users/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
