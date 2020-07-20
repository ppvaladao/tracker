const Character = require('../models/Character');

module.exports = {
    async create(req, res){
        const {name} = req.body;
        console.log(req.body)
        try {
            let options = {
                where: {
                    name: name,
                },
                defaults: {
                    name: name,
                },
            };
            Character.findOrCreate(options).then((result) => {
                let user = result[0], created = result[1];
                if (created) {console.log(name + ' foi criado')};
                if (!created) {
                    console.log('char ja existe')
                } else {
                    return res.json({msg: `${name} foi adicionado a database!`});
                }
            });
        } catch (err) {
            return console.err('Erro na criação', err);
        }
    },
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





}