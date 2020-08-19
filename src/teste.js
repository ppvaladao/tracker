const { TeamSpeak } = require("ts3-nodejs-library");

var teamspeak;

async function connect() {
  teamspeak = new TeamSpeak({
    host: "BR.VOLTUHOST.COM",
    queryport: 10011,
    serverport: "1603",
    username: "tracker",
    password: "WdbiL8CpfZiq"
  });
  teamspeak.on("ready", () => {
    console.log("ready");
  });

  teamspeak.on("error", () => {
    console.log("error");
  });

  teamspeak.on("close", async () => {
    console.log("disconnected, trying to reconnect...");
    await teamspeak.reconnect(-1, 1000);
    console.log("reconnected!");
  });
  console.log(teamspeak);
};

async function sendMessage(message) {
  const clients = await teamspeak.clientList();
  clients.forEach(client => {
    console.log("Sending 'Hello!' Message to", client.nickname)
    client.message("Hello!")
  });
}

(async () => {
  await connect();
  //await sendMessage("Oi");
})();