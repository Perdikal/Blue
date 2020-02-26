const express = require("express");
const router = express.Router();

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
  console.log(req.user);
  //const userId = req.user.projects;
  console.log(req.user.projects);
  /* const projects = [];
    Project.members.forEach(el => { if(el.includes(req.user._id)){
projects.push(Project)
    }})  */

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
  const { name, author, members } = req.body;
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
