var express = require('express');
var router = express.Router();
const characterControllers = require('./controllers/characterController');
const logsController = require('./controllers/logsController');






router.post('/hunted', characterControllers.create); //cria
router.delete('/hunted', characterControllers.delete); //deleta
router.get('/huntedon', characterControllers.listOnline); //lista hunteds online
router.get('/huntedoff', characterControllers.listOff); //lista hunteds online
router.get('/listLogs', logsController.listLogs); //lista hunteds online



module.exports = router;