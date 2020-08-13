const Character = require('./models/Character');
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

function reqOnlines() {
    request({
        method: 'GET',
        url: `https://www.utorion.com/index.php?subtopic=whoisonline`
    }, (err, res, body) => {
    
        if (err) return console.error(err);
    
        var $ = cheerio.load(body);
    
        var onlines = [];
        $('.Table2 tr:not(:first-child)').each(function() {
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
            fs.writeFileSync("./utorionData/lastOnlines.json", JSON.stringify(onlines));
            console.log(`file updated with ${onlines.length} players.`);
        } catch (e) {
            console.log(e);
        }
    
       
    })
};

reqOnlines();


module.exports = reqOnlines;


// async function onlines() {
    
//     const hunteds = Character.findAll({
//         attributes: ['name', 'level', 'vocation', 'exp', 'online'],
//         raw: true,
//     }).then(async function (hunteds) {
            
    
//         });
//     };


    