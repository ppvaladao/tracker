var express = require('express');
var router = express.Router();
const huntedss = require('./updates').huntedss;
const path = require('path');
const characterControllers = require('./controllers/characterController');
var fs = require('fs');
var usersFilePath = path.join(__dirname, './utorionData/lastOnlines.json');

router.get('/', function (req, res) {
    res.render(__dirname + '/html/index.html');
});

router.get('/huntedsOn', async function(req, res){
    const huntedsOn = await mostrarHuntedOn()

    res.json(huntedsOn);
  });


//todos onlines com lvl atualizado
router.get('/allonlines', function(req, res){
    var readable = fs.createReadStream(usersFilePath);
    readable.pipe(res);
});



router.post('/hunted', characterControllers.create); //cria
router.delete('/hunted', characterControllers.delete); //deleta
router.get('/hunted', characterControllers.listOnline); //lista hunteds online



module.exports = router;