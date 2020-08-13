const Character = require('./models/Character');
const Logs = require('./models/Logs');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const request = require('request');
const exp = require('./puppeteer2');

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
                #news > div.Border_2 > div > div > div:nth-child(2) > table > tbody > tr > td > div > table > tbody > tr > td > div.TableContentAndRightShadow > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2)
                //const lastLogin = $('div.TableContentAndRightShadow > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(8) > td:nth-child(2)').text();
            


                if (xp && xp != hunted.exp)
                {
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

module.exports = {
    tracker,

};