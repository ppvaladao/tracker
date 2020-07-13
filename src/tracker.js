const md5 = require('md5');
const func = require('./functions');
const Character = require('./models/Character');
const Frag = require('./models/Frag');
const Hunted = require('./models/Hunted');
const mostrarHuntedOn = require('./updates').mostrarHuntedOn;
const onlines_now = require('./puppeteer');
const pegar_exp = require('./puppeteer').pegar_exp;


(async function tracker_exp() {
    const huntedxs = await mostrarHuntedOn(); 
    for (huntedx of huntedxs){
        console.log(huntedx.name)
        const xp = await pegar_exp();
        console.log(`${huntedx.name} fez ${xp} de xp hoje. ID ${huntedx.id}`)
        //'update de exp' na tabela, usando a pk('huntedx.id')
  
    }
})();



