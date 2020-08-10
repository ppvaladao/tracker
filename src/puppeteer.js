const { Cluster } = require('puppeteer-cluster');
const fs = require('fs');

          async function onlines() {
            const cluster = await Cluster.launch({
                concurrency: Cluster.CONCURRENCY_CONTEXT,
                maxConcurrency: 2,
              });

          await cluster.queue(async ({ page }) => {
          await page.goto('https://www.utorion.com/index.php?subtopic=whoisonline');
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
          try
          {fs.writeFileSync("./utorionData/lastOnlines.json", JSON.stringify(on_now));console.log(`file updated with ${on_now.length} players.`)}
          catch (e) 
          {console.log(e)}
        });
        await cluster.idle();
        await cluster.close();
        };



module.exports = onlines;
    
