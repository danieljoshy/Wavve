const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')

// Placeholder — Room model and logic to be implemented
router.get('/', protect, (req, res) => {
  res.json([])
})

module.exports = router
