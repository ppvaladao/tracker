const express = require('express');
var fs = require('fs');
const path = require('path');


 //express server 
 const app = express();
  app.use(require('./routes'));
  app.engine('html', require('ejs').renderFile);

 

  module.exports = app;


 