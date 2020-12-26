const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require("../../db/models");

const GOOGLE_CLIENT_ID = '307692688990-549lafml64j6ltg63a0c5k356bni3uga.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'baUsJuciDWLTi8W4FfF_QrfF';

const googleStrategy = new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    User
      .findOne({
        where: {
          email: profile.emails[0].value
        }
      })
      .then(function (user) {
        if (user) {
          return user.update({
            googleId: profile.id
          });
        }
        else {
          return User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            username: 'g_' + profile.name.givenName + '_' + profile.name.familyName
          });
        }
      })
      .then(({ id, username, email }) => {
        return done(null, { id, username, email })
      })
      .catch(err => {
        return done(err)
      })
  }
);

module.exports = googleStrategy;