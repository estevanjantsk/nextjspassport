const passport = require('passport')
const localStrategy = require('./strategies/local')
const googleStrategy = require('./strategies/google')

const initialize = () => {
  passport.use(localStrategy);
  passport.use(googleStrategy);

  passport.serializeUser(function ({ id, email, username }, done) {
    return done(null, { id, email, username });
  });

  passport.deserializeUser(function (user, done) {
    return done(null, user);
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
