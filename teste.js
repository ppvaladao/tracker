const Character = require('./models/Character');
const Hunted = require('./models/Hunted');
const onlines_now = require('./puppeteer');
const func = require('./functions');
const fetch = require('fetch');

//precisamos implementar esse esquema de pegar onlines, esse arquivo é pra testar, depois será implementado em updates.js
async function onlinesReturn() {
    const onlines = await fetch("http://localhost/allonlines").then(response => response.json())
    return onlines
  }


async function coco() {
    var Logs = new Array();
    const onlines = await onlinesReturn();
    console.log(onlines)
    break
    for (const online of onlines) {
        await Character.sync().then(async function() {
            let options = {
                where: {
                    name: online.name,
                },
                defaults: {
                    name: online.name,
                    level: online.level,
                    vocation: online.vocation,
                },
            };
            Character.findOrCreate(options).then((result) => {
                let user = result[0];
                let created = result[1];
                if (!created) {
                    //char existe
                    if (user.level != online.level) {
                        Logs.push('O level de ' + user.name + ' atualizado de ' + user.level + ' para ' + online.level);
                        
                    }
                    if (user.vocation != online.vocation) {
                        Logs.push('A Vocation: vocation de ' + user.name + ' atualizado de ' + user.vocation + ' para ' + online.vocation);
                    }
                    return user.update(options.defaults).then(function(updated) {
                        return [updated, created];
                    });
                } else {
                    return [user, created];
                }
            });
        })
    };
    return Logs;
}


(async function onlinesReturn() {
    coco();
  })();