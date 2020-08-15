const Logs = require('../models/Logs');


module.exports = {
    
    async listLogs(req, res){
        try {
            const huntedsOnlines = await Logs.findAll({
                attributes: ['logs'],
                raw: true,
            }).then(async function (logs) {
                return res.json (logs.reverse())
            
            });
        } catch (err) {
            return console.log("Erro na listagem de logs: ", err);
        }
    }

}