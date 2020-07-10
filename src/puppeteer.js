//puppeteer new
const { Cluster } = require('puppeteer-cluster');
const url_names = 'https://www.utorion.com/index.php?subtopic=whoisonline';
async function onlines_now() {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 5,
    });

    let on_now;

    // pegar onlines // exportar pro update -dar nome a função e exportar função-
    await cluster.queue(async ({ page }) => {
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
    });
    await cluster.idle();
    await cluster.close();

    return on_now;
}

module.exports = onlines_now;
