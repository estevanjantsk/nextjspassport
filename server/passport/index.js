const passport = require('passport')
const localStrategy = require('./strategies/local')

const initialize = () => {
  passport.use(localStrategy);

  passport.serializeUser(function ({ id, email, username }, done) {
    done(null, { id, email, username });
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
}

const middlewares = () => {
  return [
    passport.initialize(),
    passport.session(),
  ]
}

module.exports = {
  initialize,
  middlewares
}
