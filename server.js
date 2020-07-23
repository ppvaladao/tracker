app = require ('./src/express')
const { tracker_exp, huntedss } = require('./src/updates');
const onlines_now = require('./src/utorionData').onlines_now

//fazer esquema de loop function
async function xd() { console.log("running..."); huntedss(); tracker_exp(); onlines_now();};
(async function() { xd();})();

//fazer update da xp na db tracker.js
//ajeitar logs na db e mostrar no site
//implementar notificações no teamspeak 
//colocar esquema de login para usar botões. //mais difícil
app.listen(80);


