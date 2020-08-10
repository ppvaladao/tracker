const { Cluster } = require('puppeteer-cluster');
const fs = require('fs');

//fazer com esquema certo de cluster.

async function exp(name) {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 2,
      });
await cluster.queue(async (name, { page }) => {
    console.log(`exp start, com name ${name}`)
    try {
    await page.goto(`https://www.utorion.com/index.php?subtopic=characters&name=${name.replace(' ', '+')}`); }
    catch (e) {console.log(e)} //
    console.log('foi na page')
    if (await page.$('div.TableContentAndRightShadow > div > table > tbody > tr:nth-child(1) > td:nth-child(2)') !== null) {console.log(`exp de ${name} encontrada`)}
    else { return;}
 function extractItems() {
   const extractedElements = document.querySelectorAll('div.TableContentAndRightShadow > div > table > tbody > tr:nth-child(1) > td:nth-child(2)');
   
   const items = [];
   for (let element of extractedElements) {
     items.push(element.innerText);
   }
   return items;
 }
 let items = await page.evaluate(extractItems);
 let exp = items[4].split(' (experience total)').join('').split('not gain exp').join('0');
 return exp;
});
await cluster.idle();
await cluster.close();
};

module.exports = exp;