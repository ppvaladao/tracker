const Character = require('./models/Character');
const func = require('./functions');
const Logs = require('./models/Logs');
const ExpDif = require('./models/ExpDif');
const TeamSpeakProvider = require('./TeamSpeakProvider')
const DatePtBR = require('date-pt-br');
const { response } = require('express');
const date = new DatePtBR()


async function hunteds() {
    await func.sleep(5000);
    await Character.findAll({
        attributes: ['name', 'level', 'vocation', 'exp', 'online', 'id'],
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

                    if (hunted.online = true && hunted.level > 350) {
                        let newDate = date.getHourMinute();
                        let frase = `${newDate} ${hunted.vocation} ${hunted.level} ${hunted.name} online.`
                        await Logs.create({ logs: frase }).then(async function () {
                            let fraseTs3 = `${newDate.replace(':', 'Â«')} ${hunted.vocation} ${hunted.level} ${hunted.name} online.`
                            await TeamSpeakProvider.messageAll(fraseTs3);
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

                        const frase = `${newDate} A vocaÃ§Ã£o de ${hunted.vocation} ${hunted.level} ${hunted.name} foi atualizado de ${hunted.vocation} para ${online.vocation.match(/\b\w/g).join('')}`
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
                            let newDate = date.getHourMinute();
                            let frase = `${newDate} ${hunted.vocation} ${hunted.level} ${hunted.name} lvl ${hunted.level} to ${online.level}.`

                            await Logs.create({ logs: frase }).then(async function () {
                                let fraseTs3 = `${newDate.replace(':', 'Â«')} ${hunted.vocation} ${hunted.level} ${hunted.name} lvl ${hunted.level} to ${online.level}.`
                                await TeamSpeakProvider.messageAll(fraseTs3);
                            });
                        }
                    });
                }
            }



        }
    })

};

async function exp() {
    await Character.findAll({
        attributes: ['id', 'name', 'level', 'vocation', 'exp', 'online'],
        raw: true,
        where: {
            online: true
        }
    }).then(async function (hunteds) {

        for (const hunted of hunteds) {
            console.log(hunted.name);
            const exp = await func.exp(hunted.name);


            if (exp === ('')) {
                return;
            }

            await func.sleep(500);
            if (exp && exp != hunted.exp) {
                let values = {
                    exp: exp
                };
                let selector = {
                    where: {
                        name: hunted.name
                    }
                };
                Character.update(values, selector).then(async function () {
                    const newDate = date.getHourMinute();
                    //colocar aqui um if, se a xp nova contiver um '-', nÃ£o entra aqui.
                    let diff = exp.split('+').join('').split('-').join('').split('.').join('') - hunted.exp.split('+').join('').split('-').join('').split('.').join('');
                    const frase = `${newDate} ${hunted.vocation} ${hunted.level} ${hunted.name} exp ${hunted.exp} to ${exp}`;
                    if (diff > 300000 && hunted.level > 350) {

                        await Logs.create({ logs: frase }).then(async function () {
                            let fraseTs3 = `${newDate.replace(':', 'Â«')} ${hunted.vocation} ${hunted.level} ${hunted.name} exp ${hunted.exp} to ${exp}`;
                            await TeamSpeakProvider.messageAll(fraseTs3);
                            await ExpDif.create({
                                expDif: diff,
                                characterId: hunted.id
                            }).then(async function (response) {

                            });
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
