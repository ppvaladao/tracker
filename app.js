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


//ajeitar botao de add/remover hunted em src/html/index.html. (urgente) // depois (colocar remover hunted pra realmente remover (não urgente))

//conferir rota de logs que vem da function 'huntedss()' em 'updates.js'.

//mudar tracker pra deixar mais rapido e atualizando xp //usar fetch no for de hunteds, atualiza só se data.response vir numero e fica em loop full, if char not exist, iniciar o tracker que busca num for de frags o nome do novo char baseado em lvl.

//colocar as funções abaixo em loop independente. 
(async function download_all() {
    huntedss(),
        namess()
})();

app.listen(80);



