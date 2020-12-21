const { Strategy } = require('passport-local');

const localStrategy = new Strategy((username, password, done) => {
  const user = { name: "Tevo" };
  if (password !== "12345") {
    return done(null, false);
  }
  return done(null, user);
})

module.exports = localStrategy;