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
                    const frase = ` ${hunted.name} online ${!!online} `
                    await TeamSpeakProvider.messageAll(frase);
                    Logs.create({ logs: frase }).then(function () {
                        console.log('log criado com ' + frase)
                    });

                });
            }

            if (online) {
                const exp = (await func.exp(hunted.name));
                if (exp === ('')) { return; }
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
                        const frase = `Experiência de ${hunted.name} atualizada de ${hunted.exp} para ${exp}`;
                        await TeamSpeakProvider.messageAll(frase);
                        Logs.create({ logs: frase }).then(function () {
                            console.log('log criado com ' + frase)
                        });


                    });
                }

                if (online.vocation != hunted.vocation) {
                    console.log('vocacao change')
                    console.log(`${hunted.name} ${hunted.level} ${hunted.vocation} ${online.vocation}`);
                    let values = {
                        vocation: online.vocation,
                    };
                    let selector = {
                        where: {
                            name: hunted.name,
                        }
                    };

                    Character.update(values, selector).then(async function () {

                        const frase = `A vocação de ${hunted.name} foi atualizado de ${hunted.vocation} para ${online.vocation}.`
                        await TeamSpeakProvider.messageAll(frase);
                        Logs.create({ logs: frase }).then(function () {
                            console.log('log criado com ' + frase)
                        });

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
                        const frase = `O level de ${hunted.name} foi atualizado de ${hunted.level} para ${online.level}.`
                        await TeamSpeakProvider.messageAll(frase);
                        Logs.create({ logs: frase }).then(function () {
                            console.log('log criado com ' + frase)
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