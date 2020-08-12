const cheerio = require('cheerio');
const request = require('request');
var player = "Axer";
request({
    method: 'GET',
    url: `https://www.utorion.com/index.php?subtopic=characters&name=${player}`
}, (err, res, body) => {

    if (err) return console.error(err);

    let $ = cheerio.load(body);

    let title = $('div.Border_2 > div > div > div:nth-child(10) > table > tbody > tr > td > div > table > tbody > tr > td > div.TableContentAndRightShadow > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > font').text();

    console.log(`exp de ${player} é ${title}`);
});





