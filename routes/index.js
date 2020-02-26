const express = require('express');
const router = express.Router();
const usersRoutes = require("./users");


/* GET home page */
router.get('/', (req, res, next) => {
  res.send('Hello');
});

module.exports = router;
