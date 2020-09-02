const config = {
  baseURL: "http://cigarrinho.com",
  refreshDelay: 6000,
};

const status = {
  0: '<span class="txt-red">Offline</span>',
  1: '<b class="txt-green">Online</b>',
};

const vocs = {
  D: "Druid",
  K: "Knight",
  P: "Paladin",
  S: "Sorcerer",
  ED: "Elder Druid",
  EK: "Elite Knight",
  RP: "Royal Paladin",
  MS: "Master Sorcerer",
};

document.addEventListener("DOMContentLoaded", async function () {
  const $containerHunteds = document.querySelector("#hunted-list");
  const $containerLogs = document.querySelector("#log-list");

  async function sleep(ms = 1) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function get(url, options = {}) {
    return fetch(url, options).then((response) => response.json());
  }

  async function refreshHunteds() {
    const hunteds = await get(config.baseURL + "/hunteds");
    orderBy(hunteds, ["-online", "-expDifUpdate", "-level", "name"]);

    $containerHunteds.innerHTML = "";

    for (const hunted of hunteds) {
      const $row = document.createElement("tr");

      $row.innerHTML = `
        <td>${hunted.name || "?"}</td>
        <td>${hunted.level || "?"}</td>
        <td>${vocs[hunted.vocation] || hunted.vocation || "?"}</td>
        <td>${status[hunted.online] || "?"}</td>
        <td>${hunted.exp || "0"}</td>
        <td>${formatExp(hunted.expDif || 0)}</td>
        <td>Há ${timeSince(new Date(hunted.expDifUpdate))}</td>
      `;

      $containerHunteds.appendChild($row);
    }
  }

  async function refreshLogs() {
    const logs = await get(config.baseURL + "/listLogs");

    $containerLogs.innerHTML = "";

    for (const log of logs) {
      const $row = document.createElement("tr");

      $row.innerHTML = `
        <td>${`${log.logs}`.replace(/null/g, "?") || "-"}</td>
      `;

      $containerLogs.appendChild($row);
    }
  }

  async function loopHunteds() {
    const timestamp1 = new Date().getTime();
    await refreshHunteds().catch(() => null);
    const timestamp2 = new Date().getTime();

    const diff = timestamp2 - timestamp1;
    const delay = Math.max(0, config.refreshDelay - diff);

    await sleep(delay);
    await loopHunteds();
  }

  async function loopLogs() {
    const timestamp1 = new Date().getTime();
    await refreshLogs().catch(() => null);
    const timestamp2 = new Date().getTime();

    const diff = timestamp2 - timestamp1;
    const delay = Math.max(0, config.refreshDelay - diff);

    await sleep(delay);
    await loopLogs();
  }

  loopHunteds();
  loopLogs();
});

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    const value = Math.floor(interval);
    return value + (value > 1 ? " anos" : " ano");
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    const value = Math.floor(interval);
    return value + (value > 1 ? " meses" : " mês");
  }

  interval = seconds / 86400;
  if (interval > 1) {
    const value = Math.floor(interval);
    return value + (value > 1 ? " dias" : " dia");
  }

  interval = seconds / 3600;
  if (interval > 1) {
    const value = Math.floor(interval);
    return value + (value > 1 ? " horas" : " hora");
  }

  interval = seconds / 60;
  if (interval > 1) {
    const value = Math.floor(interval);
    return value + (value > 1 ? " minutos" : " minuto");
  }

  const value = Math.floor(seconds);

  return value + (value > 1 ? " segundos" : " segundo");
}

function orderBy(items, attrs) {
  if (typeof attrs === "string") {
    attrs = [attrs];
  }

  attrs.reverse().forEach((attr) => {
    const sortDesc = attr.trim().substr(0, 1) === "-";

    if (sortDesc) {
      attr = attr.trim().substr(1);
    }

    items.sort(function (a, b) {
      if (a[attr] > b[attr]) {
        return sortDesc ? -1 : 1;
      }
      if (a[attr] < b[attr]) {
        return sortDesc ? 1 : -1;
      }

      return 0;
    });
  });

  return items;
}

function formatExp(str) {
  const prefix = str ? "+" : "";

  str = ((str || "0") + "")
    .replace(/\W+/g, "")
    .split(/(?=(?:...)*$)/)
    .join(".");

  return prefix + str;
}
