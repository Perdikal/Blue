const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Project = require("../models/Project");

router.get("/profile", (req, res) => {
  const userId = req.params.id;

  Profile.findById(userId)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

router.post("/profile/edit", (req, res) => {
  const userId = req.user._id;
  const { firstName, lastName, email, role } = req.body;
  User.findByIdAndUpdate(
    userId,
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role
    },
    { new: true }
  ).then(user => {
    res.json(user);
  });
});

router.get("/project", (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .populate("projects")
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

router.post("/project", (req, res) => {
  const { name, members } = req.body;
  Project.create({
    name: name,
    author: req.user._id,
    members: [...members, req.user._id]
  }).then(project => {
    project.members.forEach(member => {
      User.findByIdAndUpdate(member, { $push: { projects: project._id } });
    });
  });
});

module.exports = router;
