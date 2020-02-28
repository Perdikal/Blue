/* We'll centralize our routes imports to this file to keep our code clean */

const router = require('express').Router();
const projectRoutes = require('./project');
const usersRoutes = require('./users');
const profile = require('./profile');
router.use('/api/auth', usersRoutes);
router.use('/api/auth', projectRoutes);
router.use('/api/auth', profile);

router.get('/', (req, res, next) => {
  res.send('Hello');
});

module.exports = router;
