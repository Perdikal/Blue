const passport = require("passport");
const User = require("../models/User");

passport.serializeUser((loggedInUser, cb) => {
  console.log("serialize", loggedInUser);
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession)
    .then(userDocument => {
      console.log("deserialize", userDocument);
      cb(null, userDocument);
    })
    .catch(err => {
      cb(err);
    });
});
