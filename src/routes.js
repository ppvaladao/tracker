var express = require('express');
var router = express.Router();
const huntedss = require('./updates').huntedss;
const path = require('path');
const characterControllers = require('./controllers/characterController');


router.get('/', function (req, res) {
    res.render(__dirname + '/html/index.html');
});

router.get('/huntedsOn', async function(req, res){
    const huntedsOn = await mostrarHuntedOn()

    res.json(huntedsOn);
  });


//todos onlines com lvl atualizado
router.get('/allonlines', async function(req, res){
    res.header("Content-Type",'application/json');
    res.sendFile(path.join(__dirname, './utorionData/lastOnlines.json'));

});



router.post('/hunted', characterControllers.create); //cria
router.delete('/hunted', characterControllers.delete); //deleta
router.get('/hunted', characterControllers.listOnline); //lista hunteds online



module.exports = router;