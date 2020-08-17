
const { TeamSpeak,  } = require("ts3-nodejs-library")
TeamSpeak.connect({
    host: "BR.VOLTUHOST.COM",
  nickname: "NodeJS Query Framework",
  username: "NodeJS",
  serverport: "1603",
  queryport: "10011"
  }).then(async teamspeak => {
    const clientList = await teamspeak.getClientByName('Pedro');
    console.log(clientList)
  }).catch((e)=> {e; console.log(e)} )


//BR.VOLTUHOST.COM:1603
 //sacode.typefrag.com
 //tilera.serverbb.net
