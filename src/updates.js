const Character = require('./models/Character');
const func = require('./functions');
const Logs = require('./models/Logs');
const TeamSpeakProvider = require('./TeamSpeakProvider')

async function hunteds() {
    await func.sleep(2000);
    await Character.findAll({
        attributes: ['name', 'level', 'vocation', 'exp', 'online'],
        raw: true
    }).then(async function (hunteds) {


        for (const hunted of hunteds) {
            const onlines = await func.reqOnlines();
            if (onlines.length == 0) { return; }

            const online = onlines.find(function (item) {
                return item.name == hunted.name;
            });
            if (hunted.online != !!online) {
                let values = {
                    online: !!online,
                };
                let selector = {
                    where: {
                        name: hunted.name
                    }
                };

                Character.update(values, selector).then(async function () {
                    const frase = ` ${hunted.vocation} ${hunted.level} ${hunted.name} online ${!!online} `
                    await TeamSpeakProvider.messageAll(frase);
                    await Logs.create({ logs: frase }).then(function () {
                       
                    });

                });
            }

            if (online) {
                const exp = (await func.exp(hunted.name));
                if (exp === ('')) { return; }
                await func.sleep(1000);
                if (exp != hunted.exp) {

                    let values = {
                        exp: exp,
                    };
                    let selector = {
                        where: {
                            name: hunted.name
                        }
                    };

                    Character.update(values, selector).then(async function () {
                        const frase = `${hunted.vocation} ${hunted.level} ${hunted.name} exp update de ${hunted.exp} para ${exp}`;
                        await TeamSpeakProvider.messageAll(frase);
                        await Logs.create({ logs: frase }).then(function () {
                           
                        });


                    });
                }

                if (online.vocation.match(/\b\w/g).join('') != hunted.vocation) {
                    
                    let values = {
                        vocation: online.vocation.match(/\b\w/g).join(''),
                    };
                    let selector = {
                        where: {
                            name: hunted.name,
                        }
                    };

                    Character.update(values, selector).then(async function () {

                        const frase = `A vocação de ${hunted.vocation} ${hunted.level} ${hunted.name} foi atualizado de ${hunted.vocation} para ${online.vocation}.match(/\b\w/g).join('')`
                        //await TeamSpeakProvider.messageAll(frase);
                        //await Logs.create({ logs: frase }).then(function () {
           
                        //});

                    });
                }

                if (online.level != hunted.level) {
                    let values = {
                        level: online.level,
                    };
                    let selector = {
                        where: {
                            name: hunted.name,
                        }
                    };

                    Character.update(values, selector).then(async function () {
                        const frase = `${hunted.vocation} ${hunted.level} ${hunted.name} lvl update de ${hunted.level} para ${online.level}.`
                        await TeamSpeakProvider.messageAll(frase);
                        await Logs.create({ logs: frase }).then(function () {
                            
                        });
                    });
                }
            }



        }
    })

};





module.exports = {
    hunteds

};