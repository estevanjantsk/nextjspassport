const { Strategy } = require('passport-local');
const { Op } = require("sequelize");
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
    return done(null, false, { message: 'invalid username/email or password' });
  }

  if (! await user.isPasswordValid(password)) {
    return done(null, false, { message: 'invalid username/email or password' });
  }

  return done(null, { id: user.id, username: user.username, email: user.email });
})

module.exports = localStrategy;