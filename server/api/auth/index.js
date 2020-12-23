const express = require("express")
const passport = require("passport")
const router = express.Router()

router.post('/signin',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/signin',
    failureFlash: true
  })
)

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;