const jwt = require('jsonwebtoken')
const User = require('../models/user')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// @desc  Register new user
// @route POST /api/auth/register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = await User.create({ username, email, password })

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc  Login user
// @route POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      await User.findByIdAndUpdate(user._id, { isOnline: true })

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc  Logout user
// @route POST /api/auth/logout
const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { isOnline: false })
    res.json({ message: 'Logged out successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { registerUser, loginUser, logoutUser }
