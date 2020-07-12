const md5 = require('md5');
const func = require('./functions');
const Character = require('./models/Character');
const Frag = require('./models/Frag');
const Hunted = require('./models/Hunted');

const mostrarHuntedOn = require('./updates').mostrarHuntedOn;



(async function xd() {
    const huntedxs = await mostrarHuntedOn(); 
    for (huntedx of huntedxs){
        console.log(huntedx)
        //fazer um fetch e pegar xp agora!
    }
})();
















// function getFrags($els) {
//     return $els.map(($el) => {
//         const name = $el.querySelector('a').innerHTML;
//         const level = $el.innerHTML.replace(/\D/g, '').slice(0, -1);
//         const date = $el.previousElementSibling.innerHTML;

//         return {
//             date,
//             name,
//             level,
//         };
//     });
// }

// async function saveFrag(data) {
//     const {date, name, level} = data;
//     const hash = md5(`${date}${name}${level}`);

//     let model = Frag.findOne({
//         raw: true,
//         where: {hash},
//     });

//     if (!model) {
//         model = await Frag.create({
//             ...data,
//             hash,
//         });
//     }

//     return model;
// }

// async function tracker(page_tracker) {
//     //await page.setViewport({width: 1250, height: 723});
//     const ids = await Hunted.findAll({raw: true}).map((item) => {
//         return item.characterId;
//     });

//     let hunteds;

//     if (Array.isArray(ids) && ids.length) {
//         hunteds = await Character.findAll({
//             raw: true,
//             where: {
//                 id: ids,
//             },
//         });
//     }

//     // hunteds = ['Hellkayzer', 'Hakai', 'Habeas Corpos', 'Fastermouse Record', 'Favela Sinistra', 'Ethernal Oblivion', 'Aaragon', 'Comi Chorando'];

//     for (var i = 0; i < hunteds.length; i++) {
//         const hunted = hunteds[i];
//         const huntedName = hunted.name;

//         await page_tracker.goto('https://www.utorion.com/index.php?subtopic=characters&name=' + huntedName.replace(' ', '+'));
//         // verificar se a pagina carregou, e possui Content ou server is down
//         try {
//             await page_tracker.waitForSelector('#Content');

//             var doesnot = await func.findByText(page_tracker, 'b', 'The Following Errors Have Occurred:');
//             if (doesnot) {
//                 console.log('tracker: char ' + huntedName + ' mudou de nome');
//             } else {
//                 //const level_ = await func.findByText(page_tracker, 'td', 'Level:');
//                 //const level = await page_tracker.evaluate($el => $el.nextSibling.innerText.trim(), level_);
//                 //const vocation_ = await func.findByText(page_tracker, 'td', Profession:');
//                 //const vocation = await page_tracker.evaluate($el => $el.nextSibling.innerText.trim(), vocation_);
//                 var lastLogin_ = await func.findByText(page_tracker, 'td', 'Last login:');
//                 lastLogin_ = await page_tracker.evaluate($el => $el.nextSibling.innerText.trim(), lastLogin_);
//                 const accountStatus_ = await func.findByText(page_tracker, 'td', 'Account Status:');
//                 const accountStatus = await page_tracker.evaluate($el => $el.nextSibling.innerText.trim(), accountStatus_);
//                 //const accountStatus = await page_tracker.evaluate($el => document.querySelector($el).innerHTML.trim(), '#news > div.Border_2 > div > div > div: nth - child(2) > table > tbody > tr > td > div > table > tbody > tr > td > div.TableContentAndRightShadow > div > table > tbody > tr > td: nth - child(2) > table > tbody > tr: nth - child(9) > td: nth - child(2)');

//                 const lastLogin = func.toSqlDatetime(lastLogin_);
//                 console.log('tracker: char ' + huntedName/* + ", level: " + level + ", vocation: " + vocation*/ + ', last login: ' + lastLogin + ', account status: ' + accountStatus);

//                 // Justifieds
//                 await page_tracker.waitForSelector('#ButtonInjust');
//                 await page_tracker.click('#ButtonInjust');

//                 const justifieds = await page_tracker.$$eval('#DisplayInjust td:nth-child(2)', getFrags);
//                 console.log('JUSTFIED', justifieds.length);

//                 for (const frag of justifieds) {
//                     await saveFrag({
//                         ...frag,
//                         characterId: hunted.id,
//                         justfied: true,
//                     });
//                 }

//                 // Unjustifieds
//                 await page_tracker.waitForSelector('#ButtonUnjust');
//                 await page_tracker.click('#ButtonUnjust');

//                 const unjustifieds = await page_tracker.$$eval('#DisplayUnjust td:nth-child(2)', getFrags);
//                 console.log('UNJUSTIFIED', unjustifieds.length);

//                 for (const frag of unjustifieds) {
//                     await saveFrag({
//                         ...frag,
//                         characterId: hunted.id,
//                         justfied: false,
//                     });
//                 }

//                 console.log('FIM');
//                 await func.sleep(99999);
//             }
//         } catch (e) {
//             console.log('error tracker: ' + e);
//             var error = await func.findByText(page_tracker, 'h2', 'Web server is down');
//             if (error) {
//                 i--;
//                 console.log('tracker: char ' + huntedName + ', updating error: server is down');
//             } else if (e.indexOf('TimeoutError') != -1) {
//                 i--;
//                 console.log('tracker: char ' + huntedName + ', updating error: timeout');
//             }
//         }
//     }
// }

// module.exports = tracker;