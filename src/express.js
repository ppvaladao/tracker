const express = require('express');
var fs = require('fs');
const path = require('path');


 //express server 
  const app = express();
      app.use(express.static('./src/html'));
        app.use(express.json());
        app.use(require('./routes'));
        //app.engine('html', require('ejs').renderFile);

 

  module.exports = app;


 
