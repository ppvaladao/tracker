var express = require('express');
var router = express.Router();
const mostrarHuntedOn = require('./updates').mostrarHuntedOn;
const updates = require('./updates').huntedss().updates;


//falta importar 'updates = []' de 'huntedss()' em updates.js



router.get('/', function (req, res) {
    res.render(__dirname + '/html/index.html');
});


router.get('/huntedsOn', async function(req, res){
    const huntedsOn = await mostrarHuntedOn()

    res.json(huntedsOn);
  });

  router.get('/updatesPush', function (req, res) {
    res.json();
});


module.exports = router;