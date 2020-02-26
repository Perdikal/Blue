const router = require("express").Router();
const Project = require("../models/Project");
const User = require("../models/User");

const loginCheck = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/");
  }
};
router.get("/project/:id", loginCheck, (req, res) => {
  console.log("ijoeaijfoiea");
  const projectId = req.params.id;
  res.json({ responseKey: projectId });
  /*  Project.findById(projectId)
    .then(project => {
      res.json(project);
    })
    .catch(error => {
      res.status(500).json({
        message: err.message
      });
    }); */
});

router.get("/", (req, res) => {
  console.log("wooorks");
});

module.exports = router;
