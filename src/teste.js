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




                if (online) {
                    console.log(`${hunted.name} entrou no if de onlines`);
                return true;
                } else { console.log(`${hunted.name} entrou n entrou no if `)
                return false;
                }

              if (names.includes(hunted.name)) {
                console.log(`${hunted.name} entrou no if includes`)
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
                let values = {
                    online: false
                };
                let selector = {
                    where: {
                        name: hunted.name,
                    }
                };
    
                Character.update(values, selector).then(function (updated) {
                    console.log(`${hunted.name} off list`)
                    return updated;
                });
                
              }
                
                
            });}
    
        });
    };