const express = require('express')
const IndLiveController = require('../controller/idnLives')
const router = express.Router()

router.get('/stream', IndLiveController.getLives)
router.get('/stream/:username', IndLiveController.getMemberLive)

module.exports = router