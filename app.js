app = require ('./src/express')
const { tracker_exp, huntedss } = require('./src/updates');
const onlines_update = require('./src/utorionData').onlines_now

app.listen(80);


//ajeitar logs na db e mostrar no site
//implementar notificações no teamspeak 
//colocar esquema de login para usar botões. //mais difícil

const loop1 = () => huntedss().finally(loop1);
const loop2 = () => tracker_exp().finally(loop2);
const loop3 = () => onlines_update().finally(loop3);
loop1()
loop2()
loop3()




