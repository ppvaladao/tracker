const Character = require('./models/Character');
const func = require('./functions');
const fs = require(`fs`);
const Logs = require('./models/Logs');

async function huntedss() {
    await Character.findAll({
        attributes: ['name', 'level', 'vocation', 'exp', 'online'],
        raw: true
    }).then(async function (hunteds) {


        for (const hunted of hunteds) {
            const onlines = await func.reqOnlines();
            const online = onlines.find(function (item) {
                return item.name == hunted.name;
            });

            const exp = (await func.exp(hunted.name));
            if (exp != hunted.exp) {

                let values = {
                    exp: exp,
                };
                let selector = {
                    where: {
                        name: hunted.name
                    }
                };

                Character.update(values, selector).then(function () {
                    const frase = `Experiência de ${hunted.name} atualizada de ${hunted.exp} para ${exp}`;
                    Logs.create({logs: frase}).then(function () {
                        console.log('log criado com ' + frase)
                    });
                   

                });
            }

            if (hunted.online != !!online) {
                let values = {
                    online: !!online,
                };
                let selector = {
                    where: {
                        name: hunted.name
                    }
                };

                Character.update(values, selector).then(function () {
                    const frase = ` ${hunted.name} online ${!!online} `
          
                    Logs.create({logs: frase}).then(function () {
                        console.log('log criado com ' + frase)
                    });

                });
            }


            if (online && online.vocation != hunted.vocation) {
                console.log('vocacao change')
                console.log(`${hunted.name} ${hunted.level} ${hunted.vocation} ${online.vocation}`)
                let values = {
                    level: online.level,
                    vocation: online.vocation,
                };
                let selector = {
                    where: {
                        name: hunted.name,
                    }
                };

                Character.update(values, selector).then(function () {
            
                    const frase = `O level de ${hunted.name} foi atualizado de ${hunted.level} para ${online.level}.`
                    Logs.create({logs: frase}).then(function () {
                        console.log('log criado com ' + frase)
                    });

                });
            }

            if (online && online.level != hunted.level) {
                let values = {
                    level: online.level,
                };
                let selector = {
                    where: {
                        name: hunted.name,
                    }
                };

                Character.update(values, selector).then(function () {
                    const frase = `O level de ${hunted.name} foi atualizado de ${hunted.level} para ${online.level}.`
                    Logs.create({logs: frase}).then(function () {
                        console.log('log criado com ' + frase)
                    });
                });
            }


        }
    })

};





module.exports = {
    huntedss

};