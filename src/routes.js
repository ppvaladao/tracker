var express = require('express');
var router = express.Router();
const onlines_now = require('./puppeteer');
const mostrarHuntedOn = require('./updates').mostrarHuntedOn;
const huntedss = require('./updates').huntedss;



router.get('/', function (req, res) {
    res.render(__dirname + '/html/index.html');
});


router.get('/huntedsOn', async function(req, res){
    const huntedsOn = await mostrarHuntedOn()

    res.json(huntedsOn);
  });

  router.get('/logsreturn', async function(req, res){
    
    res.json(await huntedss());
  });

  router.get('/allonlines', async function(req, res){
    const onlines = await onlines_now()

    res.json(onlines);
  });




module.exports = router;