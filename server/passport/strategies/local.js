const { Strategy } = require('passport-local');
const { Op } = require("sequelize");
const utils = require('../../utils');
const { User } = require("../../db/models");

const localStrategy = new Strategy(async (username, password, done) => {

  let user = await User.findOne({
    where: {
      [Op.or]: [
        { username: username },
        { email: username }
      ]
    }
  });

  if (!user) {
    return done(null, false, { message: 'invalid username or email' });
  }

  if (! await user.isPasswordValid(password)) {
    return done(null, false, { message: 'Incorrect password.' });
  }

  return done(null, user);
})

module.exports = localStrategy;