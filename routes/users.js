const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

//>>>>>>>>>>>>>>>>>>>>>   SIGNUP   <<<<<<<<<<<<<<<<<<<<<<

router.post("/signup", (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!email) {
    return res.status(400).json({ message: "email can't be empty" });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: "Password is too short" });
  }

  User.findOne({ email: email })
    .then(found => {
      if (found) {
        return res.status(400).json({ message: "email is already taken" });
      }
      return bcrypt
        .genSalt()
        .then(salt => {
          return bcrypt.hash(password, salt);
        })
        .then(hash => {
          return User.create({
            firstName: firstName,
            lastName: lastName,
            role: role,
            email: email,
            password: hash
          });
        })
        .then(newUser => {
          req.login(newUser, err => {
            if (err)
              res.status(500).json({ message: "Error while logging in" });
            else res.json(newUser);
          });
        });
    })
    .catch(err => {
      res.status(500).json({ message: "Error while authorizing" });
    });
});

//>>>>>>>>>>>>>>>>>>>>>>   LOGIN   <<<<<<<<<<<<<<<<<<<<<<<

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Error while authenticating" });
    }
    if (!user) {
      // no user found with email or password didn't match
      return res.status(400).json({ message: info.message });
    }
    req.login(user, err => {
      if (err) {
        return res.status(500).json({ message: "Error while logging in" });
      }
      res.json(user);
    });
  })(req, res, next);
});

// >>>>>>>>>>>>>>>>>>  LOGOUT  <<<<<<<<<<<<<<<<<<<<<

router.delete("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Successful logout" });
});

//  <<<<<<<<<<<<<<<<<  LOGGEDIN   >>>>>>>>>>>>>>>>>
router.get("/loggedin", (req, res) => {
  res.json(req.user);
});

// <<<<<<<<<<<<<<<<<<<< Linkedin Login >>>>>>>>>>>>>>>>>>>>>
router.get("/linkedin", passport.authenticate("linkedin"));

router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    failureRedirect: "/login",
    successRedirect: "http://localhost:3000/"
  })
);

module.exports = router;
