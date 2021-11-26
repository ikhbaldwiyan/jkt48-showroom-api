const express = require('express');
const Rooms = require('../controller/rooms');
const router = express.Router();

router.get('/', Rooms.getRoomList)
router.get('/onlives', Rooms.getRoomLive)

module.exports = router;