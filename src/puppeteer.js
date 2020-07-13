const puppeteer = require('puppeteer');
const url_names = 'https://www.utorion.com/index.php?subtopic=whoisonline';


let exp;
async function pegar_exp() {
  const browser = await puppeteer.launch({waitUntil: 'networkidle0'});
  const page = await browser.newPage();
  await page.goto(`https://www.utorion.com/index.php?subtopic=characters&name=${huntedx.name.replace(' ', '+')}`);
     if (await page.$('div.TableContentAndRightShadow > div > table > tbody > tr:nth-child(1) > td:nth-child(2)') !== null) console.log('exp encontrado');
     else {console.log('nome nao existe'); return;}
  function extractItems() {
    const extractedElements = document.querySelectorAll('div.TableContentAndRightShadow > div > table > tbody > tr:nth-child(1) > td:nth-child(2)');
    
    const items = [];
    for (let element of extractedElements) {
      items.push(element.innerText);
    }
    return items;
  }
  
  let items = await page.evaluate(extractItems);
  let exp = items[4].split(' (experience total)').join('');
  return exp;


  browser.close();
};



let on_now;
async function onlines_now() {

    const browser = await puppeteer.launch({waitUntil: 'networkidle0'});
    const page = await browser.newPage();
    await page.goto(url_names);
    await page.waitForSelector('a[href*="?subtopic=characters"]');
    on_now = await page.$$eval('.Table2 tr:not(:first-child)', ($els) => {
        return $els.map(($el) => {
            const name = $el.querySelector('td:nth-child(1) a').innerHTML;
            const level = $el.querySelector('td:nth-child(2)').innerHTML;
            const vocation = $el.querySelector('td:nth-child(3)').innerHTML.split('&nbsp;').join(' ');
            return {
                name,
                level,
                vocation
            };
        });
    });

    browser.close();
    return on_now;
};






module.exports ={pegar_exp, onlines_now}
