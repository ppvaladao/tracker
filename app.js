app = require ('./src/express')
const { tracker_exp, huntedss } = require('./src/updates');
const onlines_update = require('./src/utorionData').onlines_now

app.listen(80);

//ordenar a tabela por quem fez mais xp!






//implementar notificações no teamspeak 
//ajeitar logs na db e mostrar no site
//colocar esquema de login para usar botões. //mais difícil

const loop1 = () => huntedss().finally(loop1);
const loop2 = () => onlines_update().finally(loop2);
const loop3 = () => tracker_exp().finally(loop3);
loop1()
loop2()
loop3()



