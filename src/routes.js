var express = require('express');
var router = express.Router();
const onlines_now = require('./puppeteer').onlines_now;
const huntedss = require('./updates').huntedss;
const path = require('path');
const Hunted = require('./models/Hunted');
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
  const onlines = await onlines_now()

  res.json(onlines);
});



router.post('/create', characterControllers.create); //cria
router.delete('/delete', characterControllers.delete); //deleta
router.get('/listOnline', characterControllers.listOnline); //lista hunteds online




module.exports = router;