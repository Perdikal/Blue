const express = require("express");
const router = express.Router();
const User = require("../models/User");

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

router.get("/project", (req, res) => {
  console.log(req.user, "uuuuser");
  const userId = req.user.projects;
  console.log(req.user.projects);
  console.log(userId, "this is the userId");

  /*  const projects = [];
    Project.members.forEach(el => { if(el.includes(req.user._id)){
projects.push(Project)
    }})   */

  User.findById(userId)
    .populate("project")
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
  const { name } = req.body;
  Project.create(
    {
      name: name,
      author: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      members: [
        {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
      ],
      tasks: [
        {
          type: Schema.Types.ObjectId,
          ref: "Task"
        }
      ]
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    }
  );
});

module.exports = router;
