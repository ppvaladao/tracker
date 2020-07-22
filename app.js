app = require ('./src/express')
const { tracker_exp, huntedss } = require('./src/updates');
//const onlines_now = require('.src/utorionData') //requerer onlines now daqui 

//quero saber as melhores praticas de repetir funções e entender o funcionamento; creio que simplesmente re-executar com cronjob ou setInterval não seja a melhor pratica, pois o tempo de execução pode variar.
(async function() { console.log("running..."); huntedss(); tracker_exp(); onlines_now;})();




//fazer update da xp na db tracker.js
//ajeitar logs na db e mostrar no site
//implementar notificações no teamspeak 
//colocar esquema de login para usar botões. //mais difícil - pegar com professor
app.listen(80);


