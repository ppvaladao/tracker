app = require ('./src/express')
const {hunteds} = require('./src/updates');

app.listen(80);

const loop1 = () => hunteds().finally(loop1);


loop1();
