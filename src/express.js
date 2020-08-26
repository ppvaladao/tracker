const express = require('express');
const cors = require('cors')
//express server 
const app = express();
app.use(cors())
app.use(express.static('./src/html'));
app.use(express.json());
app.use(require('./routes'));
//app.engine('html', require('ejs').renderFile);



module.exports = app;



