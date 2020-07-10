const Database = require('./config/database');
const connection = Database.connection;

const Character = require('./models/Character');
const Hunted = require('./models/Hunted');

async function checkStatus() {

    var date = new Date((new Date()) - 300000).toISOString().slice(0, 19).replace('T', ' ');
    console.log(date);

    connection.query(
        'UPDATE hunteds h SET online = 0 WHERE h.updatedAt <= :date',
        {
            replacements: { date: date },
        });

}

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
            //console.log(linkString);
            //console.log(text);
            //console.log("Found");
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

module.exports = {
    checkStatus,
    addHunted,
    removeHunted,
    findByText,
    sleep,
    getText,
    toSqlDatetime,
};
