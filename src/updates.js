const Character = require('./models/Character');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const func = require('./functions')
async function onlinesReturn() {
    const onlines = await fetch("http://localhost/allonlines").then(response => response.json());
    return onlines;
};




async function huntedss() {
    console.log('huntedss started')
    // Unexpected token < in JSON at position 0
    const onlines = await onlinesReturn();
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
                            console.log('hunted: level de ' + online.name + ' atualizado de ' + hunted.level + ' para ' + online.level);
                            //salvar na db de logs `${online.name} foi atualizado do level ${hunted.level} para o level ${online.level} `
                        }
                        else {
                            console.log('hunted: vocation de ' + online.name + ' atualizado de ' + hunted.vocation + ' para ' + online.vocation);
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
                    console.log(`${hunted.name} ficou online `)
                    //salvar update log na db 
                        
                });
            
        }
    }) 
 
  };

  async function tracker_exp() {
    const hunteds = await Character.findAll({
        attributes: ['name', 'level', 'vocation', 'exp', 'online'],
        where: {
            online: true,
        },
        raw: true,
    }).then(async function (hunteds) {
        for (const hunted of hunteds){
            console.log(hunted.name)
            const xp = await func.pegar_exp(hunted.name);
            console.log(`${hunted.name} fez ${xp} de xp hoje.`)
            //'update de exp' na tabela
      
        }
    
    });
    
};



  module.exports ={
        huntedss,
        tracker_exp
    };

 
