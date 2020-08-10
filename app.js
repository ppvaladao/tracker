app = require ('./src/express')
const { huntedss, tracker_exp } = require('./src/updates');
const onlines = require('./src/puppeteer');
app.listen(80);

//ordenar a tabela por quem fez mais xp!



//implementar notificações no teamspeak 
//ajeitar logs na db e mostrar no site
//colocar esquema de login para usar botões. //mais difícil

const loop1 = () => huntedss().finally(loop1);
const loop2 = () => onlines().finally(loop2);
const loop3 = () => tracker_exp().finally(loop3); //passar parametro pra função e organizar na forma correta do cluster.
loop1()
loop2()
//loop3() 



