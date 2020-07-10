const Character = require('./models/Character');
const Hunted = require('./models/Hunted');
const onlines_now = require('./puppeteer');
const func = require('./functions');
const fetch = require('fetch');
const { logsReturn } = require('./functions');

//fazer tabela html com a rota de logs, hunted only. (preciso de um box)
//definir 'onlines' de 'namess() && huntedss()', em updates.js, pra pegar da nossa rota '/allonlines', algo como: "const onlines = await fetch("http://localhost/allonlines").then(function(response) {return response.json();})"
//ajeitar botao de add/remover hunted em src/html/index.html.

async function mostrarHuntedOn() {

    return await Hunted.findAll({
        attributes: ['id', 'characterId', 'online'],
        where: {
            online: false
        },
        raw: true,
    }).then(async function (hunteds) {
        const response = [];
        for (hunted of hunteds) {
        const character = await Character.findByPk(hunted.characterId, {raw: true})
            response.push({name: character.name, level: character.level, vocation:character.vocation})
            
    };
    return response
    });

};

async function namess() {
    var Logs = new Array();
    const onlines = await onlines_now();
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
    const onlines = await onlines_now();
    var Logs = new Array();
    await Hunted.findAll({
        attributes: ['id', 'characterId', 'online'],
        raw: true
    }).then(async function(hunteds) {
        for (const hunted of hunteds) {
            let characterId = hunted.characterId;
            let character = await Character.findByPk(characterId);

            // verifica se o hunted está ativo ou inativo
            if (character.hunted == true) {
                let online = onlines.find(function(item) {
                    return item.name == character.name;
                });

                if (online) {
                    if (character.level != online.level || character.vocation != online.vocation) {
                        if (character.level != online.level) {
                            console.log('hunted: level de ' + online.name + ' atualizado de ' + character.level + ' para ' + online.level);
                            Logs.push({

                                update: `${online.name} foi atualizado do level ${character.level} para o level ${online.level} `,
        
                            })
                        }
                        else {
                            console.log('hunted: vocation de ' + online.name + ' atualizado de ' + character.vocation + ' para ' + online.vocation);
                            Logs.push({

                                updateVoc: `${online.name} foi atualizado do level ${character.level} para o level ${online.level} `,
        
                            })
                        }
                        
                        var values = {
                            level: online.level,
                            vocation: online.vocation
                        };
                        var selector = {
                            where: {
                                id: characterId,
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
                        characterId: characterId
                    }
                };
                await Hunted.update(values, selector).then(function (update) {
                    if (online)
                    Logs.push({

                        update: `${character.name} ficou online `,

                    })
                        
                    else
                      
                    Logs.push({

                            update: `${character.name} nao estava online e foi settado off`,
    
                        })
                });
            }
        }
    }) 
    return Logs;
  };




  module.exports ={
        namess, 
        huntedss,
        mostrarHuntedOn
    };

 
