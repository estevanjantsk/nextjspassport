const { Strategy } = require('passport-local');

const localStrategy = new Strategy((username, password, done) => {
  const user = { id: "123", name: "Tevo" };
  if (password !== "12345") {
    return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
})

module.exports = localStrategy;