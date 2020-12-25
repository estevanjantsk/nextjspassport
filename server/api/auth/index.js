const express = require('express');
const passport = require('passport');
const Joi = require('joi');
const { User } = require("../../db/models");
const router = express.Router();

const schema = Joi.object({
  username: Joi.string()
    .required()
    .alphanum()
    .min(3)
    .max(30),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  passwordconfirmation: Joi.ref('password'),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
})
  .with('password', 'passwordconfirmation');

router.post('/signup', async (req, res) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });

    const user = await User.create(req.body);

    req.login(user, function (err) {
      if (err) { throw err; }
      return res.json({ status: 'success', message: user })
    });

  }
  catch (err) {
    if (err.isJoi) {
      const joiErrors = err.details.reduce(function (rv, x) {
        (rv[x['context']['key']] = rv[x['context']['key']] || []).push(x['message']);
        return rv;
      }, {})
      return res.status(422).json({ status: 'error', message: joiErrors })
    }
    res.status(500).json({ status: 'error', message: err })
  }
})

router.post('/signin', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {

    if (err) { return next(err); }

    if (!user) { return res.status(422).json({ status: 'error', message: info.message }) }

    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.json({ status: 'success', user });
    });

  })(req, res, next);
})

router.post('/logout', (req, res) => {
  req.logout();
  res.json({ status: 'success', message: 'logged out successfully' });
});

module.exports = router;