const User = require('./models/User');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

function initialize(passport) {
  passport.use(new LocalStrategy({usernameField:'email', passwordField:'password'}, async (email, password, done) => {


  }))
  passport.serializeUser((user, done) => {
        
  });

  passport.deserializeUser(async (id, done) => {

  });
}

module.exports = initialize;