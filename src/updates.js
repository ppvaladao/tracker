const Character = require('./models/Character');
const fetch = require('node-fetch');
const func = require('./functions')
var baseURL = 'cigarrinho.com' 
// 'cigarrinho.com','127.0.0.1';




async function huntedss() {
    const onlines = await fetch(`http://${baseURL}/allonlines`).then(response => response.json());
    await Character.findAll({
        attributes: ['name', 'level', 'vocation', 'exp', 'online'],
        raw: true
    }).then(async function(hunteds) {
        for (const hunted of hunteds) {
                let online = onlines.find(function(item) {
                    return item.name == hunted.name;
                });

                if (online) {
                    if (hunted.level != online.level || hunted.vocation != online.vocation) {
                        if (hunted.level != online.level) {
                            //console.log('hunted: level de ' + online.name + ' atualizado de ' + hunted.level + ' para ' + online.level);
                            //salvar na db de logs `${online.name} foi atualizado do level ${hunted.level} para o level ${online.level} `
                        }
                        else {
                            //console.log('hunted: vocation de ' + online.name + ' atualizado de ' + hunted.vocation + ' para ' + online.vocation);
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
                        
                        await Character.update(values, selector).then(function (updated) {
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
                    //if (online)
                    //console.log(`${hunted.name} ficou online `)
                    //salvar update log na db 
                        
                });
            
        }
    }) 
 
  };

  async function tracker_exp() {
    const onlines = await fetch(`http://${baseURL}/allonlines`).then(response => response.json());
    const hunteds = await Character.findAll({
        attributes: ['name', 'level', 'vocation', 'exp', 'online'],
        where: {
            online: true,
        },
        raw: true,
    }).then(async function (hunteds) {
        for (const hunted of hunteds){
            let online = onlines.find(function(item) {
                return item.name == hunted.name;
            });
            if (online){

            
            const xp = await func.pegar_exp(hunted.name);
            const xp2 = xp.split('+').join('').split('.').join('');
            //console.log(`${hunted.name} fez ${xp2} de xp hoje.`)
            //'update de exp' na tabela
            var values = {
                exp: xp2,
            };
            var selector = {
                where: {
                    name: hunted.name,
                }
            };
            
            Character.update(values, selector).then(function (updated) {
                //console.log(`xp de ${hunted.name} foi atualizada`)
                return updated;
            });
            
        
            }
        }
    
    });
    
};



  module.exports ={
        huntedss,
        tracker_exp
    };

 
