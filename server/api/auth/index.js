const express = require("express")
const passport = require("passport")
const router = express.Router()

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    // const { email, password } = req.body;

    // if (!email || !password) {
    //   res.status(500).json({ status: 'error', message: 'Email and password required' })
    //   return
    // }
    return res.json({ status: 'success', message: 'logged in' })

  })

module.exports = router;