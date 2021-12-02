const express = require('express');
const Rooms = require('../controller/rooms');
const router = express.Router();

router.get('/', Rooms.getRoomList)
router.get('/onlives', Rooms.getRoomLive)
router.get('/profile/:roomId', Rooms.getProfile)
router.get('/schedule/:roomId', Rooms.getNextLive)

module.exports = router;