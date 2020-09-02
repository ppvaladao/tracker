const TeamSpeak = require('ts3-nodejs-library').TeamSpeak;

const tsConfig = {
    host: "BR.VOLTUHOST.COM",
    username: "bot",
    password: "iTd0jFR79KJY",
    serverport: "1603",
    queryport: "10011",
};

class TeamSpeakProvider {

    static connection = null;

    static async getConnection() {
        try {
            if (!this.connection) {
                console.log('Conectando ao servidor...');

                this.connection = await TeamSpeak.connect(tsConfig);

                this.connection.on("close", async () => {
                    console.log("Tentando reconectar ao servidor...");
                    await this.connection.reconnect(-1, 1000);
                    console.log("Reconectado!");
                });

                console.log('Conexão estabelecida.');
            }
        } catch (err) {
            console.log('Não foi possível conectar ao servidor.');
            throw err;
        }

        return this.connection;
    }

    static async getClients() {
        const conn = await this.getConnection();
        return conn.clientList();
    }

    static async messageAll(message = '') {
        try {
            const clients = await this.getClients();

            for (const client of clients) {
                //console.log(`Enviando a mensagem "${message}" para "${client.nickname}"`);
                await client.message(message)
            }
        } catch (err) {
            //console.log('Não foi possível enviar a mensagem.');
            throw err;
        }
    }

    static async pokeAll(message = '') {
        try {
            const clients = await this.getClients();

            for (const client of clients) {
                //console.log(`Enviando o poke "${message}" para "${client.nickname}"`);
                await client.poke(message)
            }
        } catch (err) {
            //console.log('Não foi possível enviar o poke.');
            throw err;
        }
    }

}

module.exports = TeamSpeakProvider;