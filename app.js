app = require ('./src/express')
const {huntedss} = require('./src/updates');

app.listen(80);

//ordenar a tabela por quem fez mais xp
//implementar notificações no teamspeak 
//colocar esquema de login para usar botões. //mais difícil



const loop1 = () => huntedss().finally(loop1);


loop1();
