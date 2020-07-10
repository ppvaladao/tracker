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


//ajeitar botao de add/remover hunted em src/html/index.html.
//conferir rota de logs e settar em box no html
//definir 'onlines' de 'namess() && huntedss()', em updates.js, pra pegar da nossa rota '/allonlines', algo como: "const onlines = await fetch("http://localhost/allonlines").then(function(response) {return response.json();})"






//colocar as funções abaixo em loop independente. 
(async function download_all() {
    huntedss(),
        namess()
})();

app.listen(80);



