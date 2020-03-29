const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const mongoosedata = require('../models/user')

passport.use(new LocalStrategy( {usernameField: 'email'},
  function (username, password, done) {
    mongoosedata.findOne({
      email: username
    }, function (err, user) {
      console.log('logging userdata in local strategy: ', user)
      console.log('client entered the following password: ', password)
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, console.log('credentials incorrect'))
      }
      return done(null, user)
    })
  }
))


passport.serializeUser(function (user, done) {
  console.log('serializing: ' + user.id)
  done(null, user.id)
})


passport.deserializeUser(function (id, done) {
  console.log('deserializing: ' + id)
  mongoosedata.findById(id, function (err, user) {
    done(err, user)
  })
})

module.exports = passport