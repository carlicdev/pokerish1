const express = require('express');
const router = express.Router();

const utils = require('../utils/utils');
const sessionsControllers = require('../controllers/sessions');


router.post('/newsession', utils.redirectLogin, sessionsControllers.sessions_newsession);

router.get('/allsessions', utils.redirectLogin, sessionsControllers.sessions_get_all);

router.get('/overview', utils.redirectLogin, sessionsControllers.sessions_get_totals);

router.get('/charts', sessionsControllers.sessions_get_all_graph);
   
router.get('/byplayer', utils.redirectLogin, sessionsControllers.sessions_byplayer);


module.exports = router;