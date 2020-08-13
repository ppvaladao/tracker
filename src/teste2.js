const Character = require('./models/Character');
function onlines() {
    const hunteds = Character.findAll({
        attributes: ['name', 'level', 'vocation', 'exp', 'online'],

        raw: true,
    }).then(function (hunteds) {
            for (hunted of hunteds)
            {request({
                method: 'GET',
                url: `https://www.utorion.com/index.php?subtopic=whoisonline`
            }, (err, res, body) => {
            
                if (err) return console.error(err);
            
                var $ = cheerio.load(body);
                
                let names = $('td:nth-child(1) a').text();

                let online = names.find(function (item) {
                    return item.name === hunted.name;
                });
                console.log(`oi`)
              if (online) {
                console.log(`${hunted.name} online, e entrou no if includes`)
                let values = {
                    online: true
                };
                let selector = {
                    where: {
                        name: hunted.name,
                    }
                };
    
                Character.update(values, selector).then(function (updated) {
                    console.log(`${hunted.name} ficou on`)
                    return updated;
                });
              } else
              {
                {`console.log${hunted.name} n foi encontrado nos names`}
                
              }
                
                
            });}
    
        });
    };

    

