const Character = require('./models/Character');
const func = require('./functions');
const Logs = require('./models/Logs');
const TeamSpeakProvider = require('./TeamSpeakProvider')
const DatePtBR = require('date-pt-br')
const date = new DatePtBR()


async function hunteds() {
    const newDate = date.getHourMinute().replace(':', '¦');

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
                    if (hunted.online = true) {
                        const frase = `${newDate} ${hunted.vocation} ${hunted.level} ${hunted.name} online.`
                        await TeamSpeakProvider.messageAll(frase);
                        await Logs.create({ logs: frase }).then(function () {

                        });
                    }

                });
            }

            if (online) {


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

                        const frase = `${newDate} A vocação de ${hunted.vocation} ${hunted.level} ${hunted.name} foi atualizado de ${hunted.vocation} para ${online.vocation.match(/\b\w/g).join('')}`
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
                        if (online.level > hunted.level) {
                            const frase = `${newDate} ${hunted.vocation} ${hunted.level} ${hunted.name} lvl update de ${hunted.level} para ${online.level}.`
                            await TeamSpeakProvider.messageAll(frase);
                            await Logs.create({ logs: frase }).then(function () {

                            });
                        }
                    });
                }
            }



        }
    })

};

async function exp() {
    const newDate = date.getHourMinute().replace(':', '¦');
    await Character.findAll({
        attributes: ['name', 'level', 'vocation', 'exp', 'online'],
        raw: true,
        where: {
            online: true
        }
    }).then(async function (hunteds) {
        for (const hunted of hunteds) {

            const exp = await func.exp(hunted.name);

            if (exp === ('')) { `exp do ${hunted} vazia, retornando`; return; }
            const expPura = exp.split('+').join('').split('-').join('').split('.').join('');
            const huntedExpPura = hunted.exp.split('+').join('').split('-').join('').split('.').join('');
            let diff = expPura - huntedExpPura;
           // console.log(
           //     expPura, huntedExpPura, diff)
            //console.log(`Exp de ${hunted.name} é ${exp}, diferença ${diff}`);
            await func.sleep(500);
            if (exp != hunted.exp) {
                let values = {
                    exp: exp
                };
                let selector = {
                    where: {
                        name: hunted.name
                    }
                };
                Character.update(values, selector).then(async function () {
                    const frase = `${newDate} ${hunted.vocation} ${hunted.level} ${hunted.name} exp update de ${hunted.exp} para ${exp}`;

                    if (exp != 0 && diff > 300000) {
                        await Logs.create({ logs: frase }).then(async function () {
                            //await TeamSpeakProvider.messageAll(frase);
                        });
                    }




                });
               
            }
        };
    });
};

module.exports = {
    hunteds,
    exp

};