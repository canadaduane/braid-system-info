const polka = require("polka");
const makeStream = require("braid-protocol");
const fs = require("fs");
const sysinfo = require("systeminformation");

const cors = require("cors")({ origin: true });

polka()
  .use(cors)
  .get("/cpu/temperature", (req, res) => {
    let timer;

    const stream = makeStream(res, {
      initialValue: "0.0",
      contentType: "text/plain",
      onclose() {
        clearInterval(timer);
      },
    });

    timer = setInterval(() => {
      sysinfo.cpuTemperature((data) => {
        // Note: data.cores[] and data.max also available
        stream.append(data.main.toString());
      });
    }, 1000);
  })
  .get("/time", (req, res) => {
    let timer;

    const stream = makeStream(res, {
      initialValue: new Date().toLocaleString(),
      contentType: "text/plain",
      onclose() {
        clearInterval(timer);
      },
    });

    timer = setInterval(() => {
      stream.append(new Date().toLocaleString());
    }, 1000);
  })
  .listen(2000, (err) => {
    if (err) throw err;
    console.log("listening on http://localhost:2000");
  });
