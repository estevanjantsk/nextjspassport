const express = require("express")
const router = express.Router()

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(500).json({ status: 'error', message: 'Email and password required' })
    return
  }
})

module.exports = router;