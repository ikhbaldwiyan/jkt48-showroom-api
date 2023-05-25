const express = require('express');
const Lives = require('../controller/lives');
const router = express.Router();

router.get('/stream/:roomId/:cookies', Lives.getStreamUrl)
router.get('/info/:roomId/:cookies', Lives.getTitle)
router.get('/comments/:roomId/:cookies', Lives.getComments)
router.get('/rank/:roomId/:cookies', Lives.getRank)
router.get('/gift/:roomId/:cookies', Lives.getAllGift)

module.exports = router;