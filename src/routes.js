var express = require('express');
var router = express.Router();
const huntedss = require('./updates').huntedss;
const path = require('path');
const characterControllers = require('./controllers/characterController');
const logsController = require('./controllers/logsController');
var fs = require('fs');
var usersFilePath = path.join(__dirname, '../utorionData/lastOnlines.json');



//todos onlines com lvl atualizado
router.get('/allonlines', function(req, res){
  var readable = fs.createReadStream(usersFilePath);
  readable.pipe(res);
});




router.post('/hunted', characterControllers.create); //cria
router.delete('/hunted', characterControllers.delete); //deleta
router.get('/huntedon', characterControllers.listOnline); //lista hunteds online
router.get('/huntedoff', characterControllers.listOff); //lista hunteds online
router.get('/listLogs', logsController.listLogs); //lista hunteds online



module.exports = router;