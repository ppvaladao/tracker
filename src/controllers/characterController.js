const Character = require('../models/Character');


module.exports = {
    async create(req, res){
        const {name} = req.body;
        const namex = name.toLowerCase().replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
        try {
            let options = {
                where: {
                    name: namex,
                },
                defaults: {
                    name: namex,
                    hunted: true
                },
            };
            Character.findOrCreate(options).then((result) => {
                let user = result[0], created = result[1];
                if (created) {console.log(namex + ' foi criado')};
                if (!created) {
                    console.log('char ja existe')
                } else {
                    return res.json({msg: `${namex} foi adicionado a database!`});
                }
            });
        } catch (err) {
            return console.err('Erro na criação', err);
        }
    },

    // e se eu tentar remover um cara que não existe? a mensagem será a mesma?
    async delete(req, res){
        try {
            const {name} = req.body;
            await Character.destroy({where: {name: name }});
            return res.json({msg: `Exclusão de ${name} feita com sucesso!`});
        } catch (err) {
            return console.log("Erro na exclusão: ", err);
        }
    },



    async listOnline(req, res){
        try {
            const huntedsOnlines = await Character.findAll({
                attributes: ['name', 'level', 'vocation', 'exp', 'online'],
                where: {
                    online: true,
                },
                order: [
                    ['level', 'DESC'],
                ],
                raw: true,
                
            }).then(async function (hunteds) {
                
                return res.json (hunteds)
            
            });
        } catch (err) {
            return console.log("Erro na listagem de onlines: ", err);
        }
    },

    async listOff(req, res){
        try {
            const huntedsOnlines = await Character.findAll({
                attributes: ['name', 'level', 'vocation', 'exp', 'online'],
                where: {
                    online: false,
                },
                raw: true,
            }).then(async function (hunteds) {
                return res.json (hunteds)
            
            });
        } catch (err) {
            return console.log("Erro na listagem de onlines: ", err);
        }
    },
    

    async listAll(req, res){
        try {
            const huntedsOnlines = await Character.findAll({
                attributes: ['name', 'level', 'vocation', 'exp', 'online'],          
                raw: true,
            }).then(async function (hunteds) {
                return res.json (hunteds)
            
            });
        } catch (err) {
            return console.log("Erro na listagem de onlines: ", err);
        }
    },


}