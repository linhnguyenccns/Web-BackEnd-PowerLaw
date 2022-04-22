const express = require('express')
var router = express.Router()

//hash password
const argon2 = require('argon2');

//jwt
var jwt = require('jsonwebtoken')
//DB models
const AccountModel = require('../models/account')

const middlewareCntroller = require("../controllers/middlewareController")

//===================================================================================================
router.get('/login', middlewareCntroller.verifyToken, async (req, res) => {
  res.status(200).json({success: true})
})

router.post('/registration', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Missing' })
  }

  try {
    //check for existing user
    const checkEmail = await AccountModel.findOne({ email })

    if (checkEmail) {
      return res.status(400).json({ success: false, message: 'Email already exists' })
    }

    //All ok
    const hashPassword = await argon2.hash(password)
    const newUser = new AccountModel({ email, password: hashPassword})
    await newUser.save()

    return res.status(200).json({ success: true, message: 'Created successfully' })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error' })
  }
})

router.post('/login', async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Missing email and/or password' })
  }

  try {
    //check for axisting user
    const user = await AccountModel.findOne({ email })
    if (!user) {
      return res.status(400).json({ success: false, message: 'Account does not exist' })
    }

    //username found
    const passwordValid = await argon2.verify(user.password, password)
    if (!passwordValid) {
      return res.status(400).json({ success: false, message: 'Incorrect password' })
    }

    //All good
    const accessToken = await jwt.sign({ userId: user._id, email: user.email }, process.env.ACCESSTOKEN_MK, { expiresIn: "1d" })

    return res.status(200).json({ success: true, message: 'User logged in successfully', accessToken: accessToken })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error' })
  }
})

module.exports = router