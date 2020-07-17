var express = require('express');
var router = express.Router();
const onlines_now = require('./puppeteer').onlines_now;
const mostrarHuntedOn = require('./updates').mostrarHuntedOn;
const huntedss = require('./updates').huntedss;
const path = require('path');
const Hunted = require('./models/Hunted');

router.get('/', function (req, res) {
    res.render(__dirname + '/html/index.html');
});

router.get('/huntedsOn', async function(req, res){
    const huntedsOn = await mostrarHuntedOn()

    res.json(huntedsOn);
  });

router.get('/logsreturn', async function(req, res){
  //await huntedss() puxar retornos dos huntedss e rotear.

  res.json({response: 'teste'}.response);
});

router.get('/allonlines', async function(req, res){
  const onlines = await onlines_now()

  res.json(onlines);
});

const requireJsonContent = () => {
  return (req, res, next) => {
    console.log(req.headers);
    if (1 > 2) {
      console.log(req.headers['content-type'].indexOf('application/json'));
      res.status(400).send('Server requires application/json');
      console.log("error");
    } else {
      next();
    }
  }
}

router.post('/addhunted', requireJsonContent(), async function (req, res) {
  console.log("chegou requisicao");

    var nome = req.body.name;
    Hunted.create({  
      nome: nome,
    }).then(customer => {    
      // Send created customer to client
      res.send(customer);
    });

});

module.exports = router;