const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

//importing models
const User = require("../models/user")
var profileLock = []

router.post("/", [check("email", "please Enter a valid email.").isEmail(), check("password", "Password is required.").exists()], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(req.body)
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email: email })
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "User does not exist." }] })
    }

    //authenticating password
    const isMatch = await bcrypt.compare(password, user.password)

    var toLock = profileLock.findOne({ email: email })

    if (toLock && toLock.attempts == 4) {
      if (toLock.time > Date.now()) return res.status(400).json({ errors: [{ msg: "Profile is Locked." }] })
      else {
        toLock.attempts = 0
      }
    }

    if (!isMatch) {
      if (toLock) {
        if (toLock.attempts == 3) {
          toLock.time = Date.now() + 3000000
          toLock.attempts++
          return res.status(400).json({ errors: [{ msg: "Profile is Locked." }] })
        } else {
          toLock.attempts++
        }
      } else {
        toLock.push({ attempts: 1, time: Date.now() })
      }

      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] })
    }

    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    req.status(400).send(err)
  }
})

module.exports = router
