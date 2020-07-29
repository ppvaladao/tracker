app = require ('./src/express')
const { tracker_exp, huntedss } = require('./src/updates');
const onlines_now = require('./src/utorionData').onlines_now
//fazer update da xp na db tracker.js
//ajeitar logs na db e mostrar no site
//implementar notificações no teamspeak 
//colocar esquema de login para usar botões. //mais difícil
var work_finished;
function start(callback) {
    if (work_finished) {
        callback();
        return false;
    }

    return true;
}

async function run() {
    var more;
    huntedss();
    do {
        more = start(function () {
            console.log('END');
            var k = 5;
            k++;
            console.log(k);
        });
    } while (more);
};


(async function() { run();})();


















app.listen(80);


