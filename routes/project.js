const router = require("express").Router();
const Project = require("../models/Project");
const User = require("../models/User");
const Task = require("../models/Task");
const Log = require("../models/Log");

const loginCheck = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/");
  }
};

router.get("/allMembers", (req, res) => {
  User.find({}).then(response => {
    res.json(response);
  });
});

router.post("/project/createProject", loginCheck, (req, res) => {
  const { name, members } = req.body;
  const membersId = members.map(member => {
    return member.split();
    //return User.find({});
  });

  console.log("....fae", membersId);

  Promise.all(
    members.map(member => {
      let firstName = member.split(" ")[0];
      let lastName = member.split(" ")[1];
      return new Promise(function(res, req) {
        let userFind = User.find({ firstName: firstName, lastName: lastName });
        res(userFind);
      });
    })
  ).then(result => {
    let idArray = result.map(member => {
      console.log("member what is member actually", member);
      return member[0]._id;
    });

    Project.create({
      name: name,
      members: [...idArray, req.user._id], //[...idArray, req.user._id], I removed req.user._id so it adds the project only once to the user's project array
      author: req.user._id
    }).then(project => {
      project.members.forEach(member => {
        User.findByIdAndUpdate(member, {
          $push: { projects: project._id }
        }).then(updated => {
          console.log("user has been updated!", updated);
        });
      });

      res.json(project);
    });
  });
});

router.get("/projects", loginCheck, (req, res) => {
  console.log("All of the projects");
  Project.find({ members: { $in: [req.user._id] } })
    .then(projectList => {
      res.json(projectList);
    })
    .catch(err => {
      console.error(err);
    });
});

router.get("/project/bringmine", loginCheck, (req, res) => {
  Project.find({ members: req.user._id })
    .then(projectList => {
      res.json(projectList);
    })
    .catch(err => {
      console.error(err);
    });
});

router.post("/project/:id/createtask", loginCheck, (req, res) => {
  const projectId = req.params.id;
  const { title, description, assignee, status } = req.body;
  console.log(assignee);
  User.findOne({ firstName: assignee.split(" ")[0] }).then(result => {
    Task.create({
      project: projectId,
      title: title,
      description: description,
      assignee: result._id,
      author: req.user._id
    })
      .then(task => {
        Project.findByIdAndUpdate(projectId, {
          $push: { tasks: task._id }
        }).then(ele => {
          console.log("TAAASSSKKOKIAEJOIJEIOAJFOIAEJF", task);
          res.json(task);
        });
      })
      .catch(err => {
        console.error(err);
      });
  });
});

router.get("/project/:id/tasks", loginCheck, (req, res) => {
  const projectId = req.params.id;
  Task.find({ project: projectId }).then(taskList => {
    res.json(taskList);
  });
});

router.post("/project/:id/changestatus/:taskid", loginCheck, (req, res) => {
  const ticketId = req.params.taskid;
  const { status } = req.body;
  Task.findById(ticketId).then(ticket => {
    ticket.updateOne({ status: status }).then(task => {
      res.json({ ticket, status });
    });
  });
});

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  LOG  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

router.get("/project/:id/log", loginCheck, (req, res) => {
  const projectId = req.params.id;
  Log.find({ project: projectId })
    .then(logs => {
      res.json(logs);
    })
    .catch(err => {
      console.error(err);
    });
});

router.post("/project/:id/log", loginCheck, (req, res) => {
  const projectId = req.params.id;
  const { comment } = req.body;
  Log.create({
    author: req.user._id,
    comment: comment,
    project: projectId,
    name: req.user.firstName + " " + req.user.lastName
  })
    .then(log => {
      res.json(log);
    })
    .catch(err => {
      console.error(err);
    });
});

router.get("/project/:id", loginCheck, (req, res) => {
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

router.get(`/projecta/:id`, loginCheck, (req, res) => {
  const projectId = req.params.id;
  Project.findById(projectId)
    .then(project => {
      res.json(project);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

router.post("/project/:id/delete", loginCheck, (req, res, next) => {
  const projectId = req.params.id;

  Project.findByIdAndRemove(projectId)
    .then(project => {
      console.log("Project DELETEEEED");
      User.findByIdAndUpdate(
        req.user._id,
        { $pull: { projects: project._id } },
        { new: true }
      ).then(() => {
        res.json();
      });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
