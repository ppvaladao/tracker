app = require ('./src/express')
const { tracker, huntedss, exp } = require('./src/updates');

//const onlines = require('./src/puppeteer');
app.listen(80);

//ordenar a tabela por quem fez mais xpx
//implementar notificações no teamspeak 
//ajeitar logs na db e mostrar no site
//colocar esquema de login para usar botões. //mais difícil




const loop1 = () => huntedss().finally(loop1);


loop1();
