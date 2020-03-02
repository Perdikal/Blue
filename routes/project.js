const router = require('express').Router();
const Project = require('../models/Project');
const User = require('../models/User');
const Task = require('../models/Task');
const Log = require('../models/Log');

const loginCheck = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
};

router.post('/project/:id/changestatus/:taskid', loginCheck, (req, res) => {
  const ticketId = req.params.taskid;
  const { status } = req.body;
  Task.findById(ticketId).then(ticket => {
    ticket.update({ status: status }).then(task => {
      res.json(task);
    });
  });
});

router.get('/project/:id/log', loginCheck, (req, res) => {
  const projectId = req.params.id;
  Log.find({ project: projectId })
    .then(logs => {
      res.json(logs);
    })
    .catch(err => {
      console.error(err);
    });
});

router.post('/project/:id/log', loginCheck, (req, res) => {
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

router.get('/project/bringmine', loginCheck, (req, res) => {
  Project.find({ members: req.user._id })
    .then(projectList => {
      res.json(projectList);
    })
    .catch(err => {
      console.error(err);
    });
});

router.post('/project/:id/createtask', loginCheck, (req, res) => {
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
        res.json({ message: 'Alles good' });
      }
    );
  });
});

router.get('/project/:id/tasks', loginCheck, (req, res) => {
  const projectId = req.params.id;
  Task.find({ project: projectId }).then(taskList => {
    res.json(taskList);
  });
});

router.get('/project/:id', loginCheck, (req, res) => {
  const projectId = req.params.id;
  res.json({ responseKey: projectId });
  Project.findById(projectId)
    .then(project => {
      res.json(project);
    })
    .catch(error => {
      res.status(500).json({
        message: err.message
      });
    });
});

module.exports = router;
