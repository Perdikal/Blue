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

  console.log(req.body, "req.body");
  console.log(userId, "userId");
  console.log(req.params, "params");
  console.log(req.user);
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
    console.log(user);
  });
});

router.get("/project", (req, res) => {
  console.log(req.user, "uuuuser");
  const userId = req.user._id;
  console.log(req.user.projects);
  console.log(userId, "this is the userId");

  /*  const projects = [];
    Project.members.forEach(el => { if(el.includes(req.user._id)){
projects.push(Project)
    }})   */

  User.findById(userId)
    .populate("projects")
    .then(user => {
      console.log(user);
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
  console.log(members);
  Project.create({
    name: name,
    author: req.user._id,
    members: [req.user._id]
    //   members: [...members, req.user._id]
  }).then(project => {
    console.log("project", project);
    project.members.forEach(member => {
      User.findByIdAndUpdate(member, { $push: { projects: project._id } });
    });
  });
});

module.exports = router;
