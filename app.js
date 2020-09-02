app = require ('./src/express')
const {hunteds, exp} = require('./src/updates');

app.listen(80);

const loop1 = () => hunteds().finally(loop1);
const loop2 = () => exp().finally(loop2);

loop1();
loop2();


//teste.js
//usar findOrCreate, basta salvar cada killer 1x.
//encaixar esse codigo dos killers dentro de exp().















//teria como criar um model: nickChanged, que ja adiciona todos characters existentes como false numa relação de belongsTo?
//criar bot que procura nickChanged = True e busca o novo nick.