const passport = require('passport')
const localStrategy = require('./strategies/local')

const initialize = () => {
  passport.use(localStrategy)

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    done(null, { id, name: 'Tevo Deserializado' });
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
