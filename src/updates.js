const Character = require('./models/Character');
const Logs = require('./models/Logs');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const request = require('request');
const exp = require('./puppeteer2');
const fs = require('fs');
const baseURL = "localhost"



async function tracker() {
    const hunteds = await Character.findAll({
        attributes: ['name', 'level', 'vocation', 'exp', 'online'],
        where: {
            hunted: true,
        },
        raw: true,
    }).then(async function (hunteds) {

        for (const hunted of hunteds) {
            request({
                method: 'GET',
                url: `https://www.utorion.com/index.php?subtopic=characters&name=${hunted.name}`
            }, (err, res, body) => {

                if (err) {
                    console.error(err);
                    return false;
                }
                if (body.indexOf(' does not exist.') != -1) {
                    console.error('Usuário mudou de nome: ' + hunted.name);
                    return false;
                }
                if (body.indexOf('The Following Errors Have Occurred:') != -1) {
                    console.error('Erro na página: ' + hunted.name);
                    return false;
                }

                let $ = cheerio.load(body);

                var xp = $('table > tbody > tr > td > div > table > tbody > tr > td > div.TableContentAndRightShadow > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > font').text();
                var level = $('div.TableContentAndRightShadow > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2)').text();
                var zeroxp = $('#news > div.Border_2 > div > div > div:nth-child(8) > table > tbody > tr > td > div > table > tbody > tr > td > div.TableContentAndRightShadow > div > table > tbody > tr:nth-child(1) > td:nth-child(2)');
                var vocation = $('div.TableContentAndRightShadow > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2)').text();
                //#news > div.Border_2 > div > div > div:nth-child(2) > table > tbody > tr > td > div > table > tbody > tr > td > div.TableContentAndRightShadow > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2)
                //const lastLogin = $('div.TableContentAndRightShadow > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(8) > td:nth-child(2)').text();



                if (xp && xp != hunted.exp) {
                    var values = {
                        exp: xp,
                        vocation: vocation
                    };
                    var selector = {
                        where: {
                            name: hunted.name,
                        }
                    };

                    Character.update(values, selector).then(function (updated) {
                        console.log(`A experiência de ${hunted.name} foi atualizada de ${hunted.exp} para ${xp}`)
                        return updated;
                    });
                }


                if (level)
                    level = parseInt(level);
                if (level > 0 && level != hunted.level) {
                    //level = parseInt(level);
                    //console.log(level);
                    var values = {
                        level: level
                    };
                    var selector = {
                        where: {
                            name: hunted.name,
                        }
                    };

                    Character.update(values, selector).then(function (updated) {
                        console.log(`O level de ${hunted.name} foi atualizado de ${hunted.level} para ${level}.`)
                        return updated;
                    });
                }

            });
        }
    });
};

//const onlines = fetch(`http://${baseURL}/allonlines`).then(response => response.json());
        



async function reqOnlines() {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            url: `https://www.utorion.com/index.php?subtopic=whoisonline`
        }, (err, res, body) => {

            if (err) {
                console.error(err);

                // Se a requisição falhar, vamos REJEITAR a Promise (dizer que deu errado / chamar o catch) enviando o erro
                return reject(err);
            }

            const $ = cheerio.load(body);

            const onlines = [];

            $('.Table2 tr:not(:first-child)').each(function () {
                const $el = $(this);
                const name = $el.find('td:nth-child(1) a').text();
                const level = $el.find('td:nth-child(2)').text();
                const vocation = $el.find('td:nth-child(3)').text().split('&nbsp;').join(' ');
                onlines.push({
                    name,
                    level,
                    vocation,
                });
            });

            try {
                // criar diretorio se nao existe
                fs.writeFileSync('./utorionData/lastOnlines.json', JSON.stringify(onlines));
                console.log(`file updated with ${onlines.length} players.`);
            } catch (e) {
                console.log(e);

                // Se a escrita no arquivo falhar, vamos REJEITAR a Promise (dizer que deu errado / chamar o catch) enviando o erro
                return reject(err);
            }

            // Tudo deu certo, vamos RESOLVER a Promise (dizer que deu certo / chamar o then) enviando os onlines
            return resolve(onlines);
        });
    });
};

async function huntedss() {
    console.log('huntedss started')
    const onlines = await fetch(`http://${baseURL}/allonlines`).then(response => response.json());
    await Character.findAll({
        attributes: ['name', 'level', 'vocation', 'exp', 'online'],
        raw: true
    }).then(async function (hunteds) {
        for (const hunted of hunteds) {
            let online = onlines.find(function (item) {
                return item.name == hunted.name;
            });

            var values = {
                online: !!online
            };
            var selector = {
                where: {
                    name: hunted.name
                }
            };
            await Character.update(values, selector).then(function (update) {
                console.log(`${hunted.name} foi setado pra ${!!online}`)
                //if (online)
                //console.log(`${hunted.name} ficou online `)
                //salvar update log na db 

            });

        }
    })

};

module.exports = {
    tracker,
    reqOnlines,
    huntedss

};