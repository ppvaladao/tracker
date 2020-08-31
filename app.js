app = require ('./src/express')
const {hunteds, exp} = require('./src/updates');

app.listen(80);

const loop1 = () => hunteds().finally(loop1);
const loop2 = () => exp().finally(loop2);

//loop1();
loop2();


//mostrar na rota /hunteds os dados da db de Character + ExpDiff, e settar findOrCreate no ExpDiff.
