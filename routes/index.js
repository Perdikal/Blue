/* We'll centralize our routes imports to this file to keep our code clean */

const router = require("express").Router();
const usersRoutes = require("./auth");
const projectRoutes = require("./project");

router.use("/api/auth", usersRoutes);
router.use("/api", projectRoutes);

module.exports = router;
