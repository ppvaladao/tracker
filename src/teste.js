const { TeamSpeak } = require("ts3-nodejs-library");


async function ts3() {
  const teamspeak = new TeamSpeak({
    host: "BR.VOLTUHOST.COM",
    queryport: 10011,
    username: "bot",
    password: "WdbiL8CpfZiq",
    serverport: 1603
  })

  teamspeak.on("ready", async () => {
    const frase = 'testando 1'
    const frase2 = 'testando 2'
    teamspeak.gm(frase );
    teamspeak.gm(frase2 );
  })




}

//http://www.bibicraft.it/serverquery/serverquery.html#permreset
ts3()