app = require ('./src/express')
const {hunteds, exp} = require('./src/updates');

app.listen(80);

const loop1 = () => hunteds().finally(loop1);
const loop2 = () => exp().finally(loop2);

//loop1();
//loop2();


//updates.js
//settar findOrCreate no ExpDiff, dentro de exp().
//mostrar na rota /hunteds os dados da db de Character + ExpDiff


//teste.js
//usar findOrCreate, basta salvar cada killer 1x.
//encaixar esse codigo dos killers dentro de exp().

//criar novo models pro status nickChanged > belgosTo(character); o hunteds vai settar nickChaged True.
//criar bot que procura nickChanged = True e busca o novo nick.