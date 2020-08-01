const puppeteer = require('puppeteer');
const url_names = 'https://www.utorion.com/index.php?subtopic=whoisonline';
const fs = require('fs')


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

    fs.writeFileSync(__dirname + "/lastOnlines.json", JSON.stringify(on_now))
    console.log(on_now.length + ' Players Online')
    return on_now.length
    
};

module.exports ={
    onlines_now
  
};
