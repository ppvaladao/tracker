const cheerio = require('cheerio');
const request = require('request');
const DatePtBR = require('date-pt-br')
const date = new DatePtBR()
const xd = date.getHourMinute().replace(':', ': ')
console.log(xd)

async function tracker(hunted) {

  return new Promise((resolve, reject) => {
    request({

      method: 'GET',
      url: `https://www.utorion.com/index.php?subtopic=characters&name=${hunted}`
    }, (err, res, body) => {

      if (err) {
        console.error(err);
        return reject();
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


      const xp = $('table > tbody > tr > td > div > table > tbody > tr > td > div.TableContentAndRightShadow > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > font').text();
      const tbodyKillers = $('div:nth-child(6) > table > tbody > tr > td > div > table > tbody > tr > td > div.TableContentAndRightShadow > div > table > tbody')
      const allKillersOnly = $('div:nth-child(6) > table > tbody > tr > td > div > table > tbody > tr > td > div.TableContentAndRightShadow > div > table > tbody > tr:nth-child(n) > td:nth-child(2) > a:nth-child(n)');

      const KillerListOnly = tbodyKillers
        .find(allKillersOnly)
        .toArray()
        .map(element => {
          return [$(element).parent().parent().children('td:nth-child(1)').text(),
                  $(element).parent().text().split(' by ')[0].split(' level ')[1],
                  $(element).attr('href').replace('index.php?subtopic=characters&name=', '',).replace('+', ' ')];
        });


        console.log((KillerListOnly))

      //salvar cada KillerListOnly na de killers de cada char, sem a hora.




    });


  });

};





