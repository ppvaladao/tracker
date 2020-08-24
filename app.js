app = require ('./src/express')
const {hunteds} = require('./src/updates');
const func = require('./src/functions')

app.listen(80);

const loop1 = () => hunteds().finally(loop1);

loop1();

//criar tabela com a diferença de xp da ultima atualização de xp e retornar na tabela html com o tempo do update.