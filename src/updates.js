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
            
                if (err) return console.error(err);
            
                let $ = cheerio.load(body);
            
                const xp = $('table > tbody > tr > td > div > table > tbody > tr > td > div.TableContentAndRightShadow > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > font').text();
                const level = $('div.TableContentAndRightShadow > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2)').text();
                //const vocation = $('div.TableContentAndRightShadow > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2)').text();
                //const lastLogin = $('div.TableContentAndRightShadow > div > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(8) > td:nth-child(2)').text();
                if (xp != hunted.xp)
                {
                    var values = {
                        exp: xp
                    };
                    var selector = {
                        where: {
                            name: hunted.name,
                        }
                    };

                    Character.update(values, selector).then(function (updated) {
                     
                        console.log(`A experiência de ${hunted.name} foi atualizada de ${hunted.xp} para ${xp}`)
                        return updated;
                    });
                } 

                // if (level != hunted.level)
                // {
                //     var values = {
                //         level: level
                //     };
                //     var selector = {
                //         where: {
                //             name: hunted.name,
                //         }
                //     };

                //     Character.update(values, selector).then(function (updated) {
                //         console.log(`O level de ${hunted.name} foi atualizado de ${hunted.level} para ${level}.`)
                //         return updated;
                //     });
                // } 
              
                
                
            });
        }
    });
};

module.exports = {
    tracker
};