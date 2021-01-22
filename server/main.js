const polka = require("polka");
const sirv = require("sirv");
const sysinfo = require("systeminformation");
const cors = require("cors")({ origin: true });
const SubscribableValue = require("./SubscribableValue");

const cpuTemp = new SubscribableValue(null);
const time = new SubscribableValue({ date: new Date().toLocaleString() });

// Main data set loop
setInterval(() => {
  sysinfo.cpuTemperature((data) => {
    // Note: data.main, data.cores[] and data.max available
    cpuTemp.store.set(data);
  });

  time.store.set({ datetime: new Date().toLocaleString() });
}, 1000);

// Init `sirv` handler
const assets = sirv("public", { dev: true });

polka()
  .use(cors)
  .use(assets)
  .get("/cpu/temperature", (req, res) => {
    cpuTemp.respond(req, res);
  })
  .get("/time", (req, res) => {
    time.respond(req, res);
  })
  .listen(2000, (err) => {
    if (err) throw err;
    console.log("Braid listening on http://localhost:2000");
  });
