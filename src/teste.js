const cheerio = require('cheerio');
const request = require('request');
const md5 = require('md5');
const Frag = require('./models/Frag');



(async function name(params) {
  tracker('polvilho');
})();

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
        .map(element => $(element).attr('href').replace('index.php?subtopic=characters&name=', '',).replace('+', ' '));


      console.log(KillerListOnly)
     

      tbodyKillers.find('tr').each(function (index, tr) {
        $(tr).find('td').each(function (index, td) {
          console.log($(td).text())
          
          //pra pegar só nome de killers, sem bichos, podemos usar a const 'notMonster'
          const notMonster = KillerListOnly.find(function (item) {
            return item.name == hunted.name;
          });

          
          //quebrar os dados pra salvar os nomes separados, com as infos: nick changed, lvl, date, killer.. criar nova db relacionada characterkILLS, excluir frags
          
          //depois fazer a busca de all killers/lvl para encontrar o novo nick quando o char foi setado pra nick changed true.

        });


      });





    });


  });

};





