const Database = require('./config/database');
const connection = Database.connection;
const Character = require('./models/Character');
const cheerio = require('cheerio');
const request = require('request');



async function addHunted(name) {
    let options = {
        where: {
            name: name,
        },
        defaults: {
            name: name,
        },
    };
    let characterId = await Character.sync().then(async function () {
        return Character.findOrCreate(options).then(result => {
            let user = result[0];
            let created = result[1];

            if (!created) {
                console.log('add_hunted: O nome ' + name + ' já existe com ID: ' + user.id);
            } else {
                console.log('add_hunted: O nome ' + name + ' foi criado com ID: ' + user.id);
            }
            //let created = result[1];

            return user.id;
        });
    });

    if (characterId == null) {
        console.log('Error: ' + name + ' não foi criado');
        return;
    }

    await connection.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(async function () {
        await Hunted.sync().then(async function () {
            let options = {
                where: {
                    characterId: characterId,
                },
                defaults: {
                    characterId: characterId,
                },
            };
            return Hunted.findOrCreate(options).then((result) => {
                let user = result[0];
                let created = result[1];

                if (!created) {
                    //console.log('O character ' + name + ' já existe');
                    /*return user.update(options.defaults).then(function (updated) {
                        return [updated, created];
                    });*/
                } else {
                    let options = {
                        where: {
                            characterId: characterId,
                        },
                        defaults: {
                            hunted: true,
                        },
                    };
                    //console.log(name + " auto-generated ID: " + user.id);
                    Character.update(options).then(function (updated) {
                        return [updated, created];
                    });
                    return [user, created];
                }
            });
        }).then(result => {
            //console.log(name + " auto-generated ID: " + result.id);
        });
    });
}

async function removeHunted(name) {
    let selector = {
        where: {
            name: name
        }
    }
    var values = {
        hunted: false
    };
    Character.update(values, selector).then(function (updated) {
        console.log('hunted: ' + name + ' removido da lista.')
        return updated;
    });
}

async function findByText(page, tag, linkString) {
    const links = await page.$$(tag);
    for (var i = 0; i < links.length; i++) {
        let valueHandle = await links[i].getProperty('innerText');
        let linkText = await valueHandle.jsonValue();
        const text = getText(linkText);
        if (linkString == text) {

            return links[i];
        }
    }
    return null;

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function getText(linkText) {
    linkText = linkText.replace(/\r\n|\r/g, '\n');
    linkText = linkText.replace(/\ +/g, ' ');

    // Replace &nbsp; with a space 
    var nbspPattern = new RegExp(String.fromCharCode(160), 'g');
    return linkText.replace(nbspPattern, ' ');
}

const toSqlDatetime = (inputDate) => {
    const date = new Date(inputDate);
    const dateWithOffest = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return dateWithOffest
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
};


async function exp(hunted) { 
    return new Promise((resolve, reject) => {
        request({
            
            method: 'GET',
            url: `https://www.utorion.com/index.php?subtopic=characters&name=${hunted}`
        }, (err, res, body) => {
            
            if (err) {
                console.error(err);
                return ;
            }
            if (body.indexOf(' does not exist.') != -1) {
                console.error('Usuário mudou de nome: ' + hunted);
                return reject();
            }
            if (body.indexOf('The Following Errors Have Occurred:') != -1) {
                console.error('Erro na página: ' + hunted);
                return reject();
            }
            if (body.indexOf('cloudflare') != -1) {
                console.error('cloudflare error' + hunted);
                return reject();
            }
            if (body.indexOf('not found') != -1) {
                console.error('not found error' + hunted);
                return reject();
            }
    
            let $ = cheerio.load(body);
    
            var xp = $('table > tbody > tr > td > div > table > tbody > tr > td > div.TableContentAndRightShadow > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > font').text();
   
            if (xp) {
                return resolve(xp)
    
            } else
            {
                return resolve(0)
            }
    
        });
            
    
        });
    
    };
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
      
                
                
                
                return resolve(onlines);
            });
        });
      };



module.exports = {
    addHunted,
    removeHunted,
    findByText,
    sleep,
    getText,
    toSqlDatetime,
    exp,
    reqOnlines,
    sleep
};
