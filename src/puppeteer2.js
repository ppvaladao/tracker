const puppeteer = require('puppeteer');

async function exp(name) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`https://www.utorion.com/index.php?subtopic=characters&name=${name.replace(' ', '+')}`);
  if (await page.$('div.TableContentAndRightShadow > div > table > tbody > tr:nth-child(1) > td:nth-child(2)') !== null) {
    console.log(`exp de ${name} encontrada ${exp}`);
  } else {
    exp = -1;
    return -1;
  }

  function extractItems() {
    const extractedElements = document.querySelectorAll('div.TableContentAndRightShadow > div > table > tbody > tr:nth-child(1) > td:nth-child(2)');

    const items = [];
    for (let element of extractedElements) {
      items.push(element.innerText);
    }
    return items;
  }
  
  try {
    let items = await page.evaluate(extractItems);
  } catch (e) {
    exp = -1;
    return -1;
  }
  if (items[4].indexOf('not gain exp') != -1) {
    exp = 0;
    return 0;
  }
  //console.log("valor do item: " + items[4].split(' ')[0]);
  exp = items[4].split(' ')[0];
  await browser.close()
  return exp;
};



  




//fazer com esquema certo de cluster.

module.exports = exp;