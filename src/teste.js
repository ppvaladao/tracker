const cheerio = require('cheerio');
const request = require('request');
const md5 = require('md5');
const Frag = require('./models/Frag');



      //salvar apenas o nick de todos os killers
      //trocar frags por killers
      //colocar na tabela killers nickChanged
      //if nickChanged o outro bot vai acessar os killers e buscar quem eles mataram naquela exata hora, com uma quantidade x de acerto o nick é atualizado e o status nickChanged é setado Off, fazendo um novo registro tbm numa nova tabela que contem o historico com all nicks 

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


      console.log(KillerListOnly, )
    //   const killer = KillerListOnly.find(function (item) {
    //     return item.name == hunted.name;
    // });
      
      tbodyKillers.find('tr').each (function(index, tr) {
        $(tr).find('td').each (function(index, td) {
          console.log($(td).text())
          //quebrar os dados pra salvar os nomes separados, com as infos: lvl, date, killer.. criar nova db pra isso relacionada.
          //pra pegar só nome de killers, sem bichos, podemos usar a const 'KillerListOnly'
          //depois esse msm tracker vai buscar na db quem trocou de nick, se tiver true vai buscar all killers/lvl para encontrar o novo nick nos frags.
         
        }); 
  
        
      }); 



      //achar tabela e fazer um for pra salvar datam lvl e killers
      //depois podemos buscar os killers com os dados salvos



      
      if (xp) {
        return resolve(xp)

      } else {
        return resolve(0)
      }

    });


  });

};








function getFrags($els) {
  return $els.map(($el) => {
    const name = $el.querySelector('a').innerHTML;
    const level = $el.innerHTML.replace(/\D/g, '').slice(0, -1);
    const date = $el.previousElementSibling.innerHTML;

    return {
      date,
      name,
      level,
    };
  });
}

async function saveFrag(data) {
  const { date, name, level } = data;
  const hash = md5(`${date}${name}${level}`);

  let model = Frag.findOne({
    raw: true,
    where: { hash },
  });

  if (!model) {
    model = await Frag.create({
      ...data,
      hash,
    });
  }

  return model;
}


async function clickFrags() {
  document.getElementById("#ButtonInjust").click();
  const lastFrag = () => $('#DisplayInjust > table > tbody > tr:nth-child(1) > td:nth-child(2) > a')
  return lastFrag();

}
function tip(o) {

  var input = document.querySelector("#ButtonInjust");
  var total = input.value * o.innerHTML;
  console.log(total)
  document.querySelector("#tip").innerHTML = "&#36;" + total;

}

