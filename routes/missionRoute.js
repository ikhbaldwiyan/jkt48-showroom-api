const express = require("express");
const Missions = require("../controller/missions");
const router = express.Router();

router.get("/", Missions.getMissionList);

module.exports = router;
