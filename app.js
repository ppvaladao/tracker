const Database = require('./src/config/database');
const connection = Database.connection;
app = require ('./src/express')

// Models 
const Character = require('./src/models/Character');
const Death = require('./src/models/Death');
const Killer = require('./src/models/Killer');
const Hunted = require('./src/models/Hunted');
const Frag = require('./src/models/Frag');
const { namess, huntedss } = require('./src/updates');

//colocar essas funções em loop independente. (async () { huntedss(), namess() })();

//criar tabela de exp em hunteds.

//ajeitar botão add/remover hunted(colocar pra remover msm), {src/html/index.html}.

//conferir no routes.js a rota de logs que vem da function 'huntedss()' em 'updates.js'.

//colocar esquema de login para usar botões.



app.listen(80);


