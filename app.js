app = require ('./src/express')
const { tracker, huntedss, reqOnlines } = require('./src/updates');

//const onlines = require('./src/puppeteer');
app.listen(80);

//ordenar a tabela por quem fez mais xpx
//implementar notificações no teamspeak 
//ajeitar logs na db e mostrar no site
//colocar esquema de login para usar botões. //mais difícil




const loop1 = () => reqOnlines().finally(loop1);
const loop2 = () => huntedss().finally(loop2);

loop1();
loop2();
