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
    console.log(response);
    res.json(response);
  });
});

router.post("/project/createProject", loginCheck, (req, res) => {
  const { name, members } = req.body;
  const membersId = members.map(member => {
    console.log(member.split(" "));
    return member.split();
    //return User.find({});
  });

  console.log("....fae", membersId);

  Promise.all(
    members.map(member => {
      console.log(member);
      let firstName = member.split(" ")[0];
      let lastName = member.split(" ")[1];
      console.log(firstName);
      console.log(lastName);
      return new Promise(function(res, req) {
        console.log(member[0], member[1]);
        let userFind = User.find({ firstName: firstName, lastName: lastName });
        res(userFind);
      });
    })
  ).then(result => {
    console.log("RESULLLSLL", result);

    let idArray = result.map(member => {
      console.log("member what is member actually", member);
      return member[0]._id;
    });

    console.log(idArray);
    Project.create({
      name: name,
      members: [...idArray], //[...idArray, req.user._id], I removed req.user._id so it adds the project only once to the user's project array
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

/* <<<<<<< HEAD
router.post("/project/createProject", (req, res) => {
  const { name, members } = req.body;
  const membersId = members.map(member => {
    //console.log(member.split(" ").slice(0, 1));
    //return User.find({});
  });
  Project.create({
    name: name,
    author: req.user._id,
    members: [...members, req.user._id]
  }).then(project => {
    console.log(
      project
    ); /* 
    project.members.forEach(member => {
      User.findByIdAndUpdate(member, { $push: { projects: project._id } });
 */
router.get("/project/bringmine", loginCheck, (req, res) => {
  console.log("Hellooo+");
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
  const id = req.user._id;
  const { title, description, assignee, status } = req.body;
  Task.create({
    title: title,
    description: description,
    assignee: assignee,
    status: status,
    author: id
  }).then(task => {
    Project.findByIdAndUpdate(projectId, { $push: { tasks: task._id } }).then(
      () => {
        res.json({ message: "Alles good" });
      }
    );
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
    ticket.update({ status: status }).then(task => {
      res.json(task);
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
    project: projectId
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

  /*  const projects = [];
    Project.members.forEach(el => { if(el.includes(req.user._id)){
projects.push(Project)
    }})   */

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

module.exports = router;
