// Linkedin Login Strategy

const passport = require("passport");
const LinkedinStrategy = require("passport-linkedin-oauth2").Strategy;
const User = require("../models/User");

passport.use(
  new LinkedinStrategy(
    {
      clientID: process.env.client_id,
      clientSecret: process.env.client_secret,
      callbackURL: "http://127.0.0.1:3001/api/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_liteprofile"]
    },
    function(token, tokenSecret, profile, done) {
      console.log(profile);
      User.findOne({ linkedinId: profile.id })
        .then(user => {
          if (user) {
            done(null, user);
          }

          return User.create({
            linkedinId: profile.id,
            lastName: profile.name.familyName,
            image_url: profile.photos[0],
            email: profile.emails.value
          }).then(newUser => {
            done(null, newUser);
          });
        })
        .catch(err => done(err));
    }
  )
);
