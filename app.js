app = require ('./src/express')
const {hunteds, exp} = require('./src/updates');

app.listen(80);

const loop1 = () => hunteds().finally(loop1);
const loop2 = () => exp().finally(loop2);

loop1();
loop2();

//excluir frags e criar killers com as infos: nick changed, lvl, date, killer..

//criar uma belongstoString(character) com diferença de xp no ultimo update, e usar o updated date pra saber a quanto tempo foi ultimo update em minutos.

//exemplo: Experiência de ED 328 Pipokero Druid atualizada de +9.691.261 para +12.421.671
// vamos salvar no banco a diferença de +12.421.671 - +9.691.261 = +2.730.410
//aí vamos criar uma rota com esse valor e o tempo do ultimo update.
// +2.730.410 5min, que vamos exibir no html.