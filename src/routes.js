var express = require('express');
var router = express.Router();
const onlines_now = require('./puppeteer');
const mostrarHuntedOn = require('./updates').mostrarHuntedOn;


//falta importar 'updates = []' de 'huntedss()' em updates.js
//algo tipo: const updates = require('./updates').huntedss().updates;



router.get('/', function (req, res) {
    res.render(__dirname + '/html/index.html');
});


router.get('/huntedsOn', async function(req, res){
    const huntedsOn = await mostrarHuntedOn()

    res.json(huntedsOn);
  });

  router.get('/allonlines', async function(req, res){
    const onlines = await onlines_now()

    res.json(onlines);
  });


  router.get('/updatesPush', function (req, res) {
    res.json();
});


module.exports = router;