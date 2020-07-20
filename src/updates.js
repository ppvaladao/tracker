const Character = require('./models/Character');
const Hunted = require('./models/Hunted');
const onlines_now = require('./puppeteer');
const func = require('./functions');
const fetch = require('node-fetch');

async function onlinesReturn() {
    const onlines = await fetch("http://localhost/listOnline").then(response => response.json())
    return onlines
  };

//atualiza all chars, independente de ser hunted
async function namess() {
    var Logs = new Array();
    const onlines = await onlinesReturn();
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


async function huntedss() {
    const onlines = await onlinesReturn();
    await Character.findAll({
        attributes: ['name', 'level', 'vocation', 'exp', 'online'],
        raw: true
    }).then(async function(hunteds) {
        for (const hunted of hunteds) {
            // verifica se o hunted está ativo ou inativo
            if (hunted.hunted == true) {
                let online = onlines.find(function(item) {
                    return item.name == character.name;
                });

                if (online) {
                    if (hunted.level != online.level || hunted.vocation != online.vocation) {
                        if (hunted.level != online.level) {
                            console.log('hunted: level de ' + online.name + ' atualizado de ' + character.level + ' para ' + online.level);
                            //salvar na db de logs `${online.name} foi atualizado do level ${hunted.level} para o level ${online.level} `
                        }
                        else {
                            console.log('hunted: vocation de ' + online.name + ' atualizado de ' + character.vocation + ' para ' + online.vocation);
                            //salvar na db de logs `${online.name} foi atualizado do level ${hunted.level} para o level ${online.level} `
                        }
                        
                        var values = {
                            level: online.level,
                            vocation: online.vocation
                        };
                        var selector = {
                            where: {
                                name: hunted.name,
                            }
                        };
                        
                        Character.update(values, selector).then(function (updated) {
                            return updated;
                        });
                    }
                }

                var values = {
                    online: !!online
                };
                var selector = {
                    where: {
                        name: hunted.name
                    }
                };
                await Character.update(values, selector).then(function (update) {
                    if (online)
                    console.log(`${character.name} ficou online `)
                    //salvar update log na db 
                        
                });
            }
        }
    }) 
 
  };




  module.exports ={
        namess, 
        huntedss
    };

 
