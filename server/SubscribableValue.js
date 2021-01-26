const store = require("svelte/store");
const makeStream = require("braid-protocol");

class SubscribableValue {
  constructor(initialValue) {
    this.store = store.writable(initialValue);
    this.nextStreamId = 1;
    this.streams = {};

    this.connectStoreToStreams();
  }

  connectStoreToStreams() {
    this.store.subscribe((value) => {
      for (const stream of Object.values(this.streams)) {
        const currentValue = JSON.stringify(value);
        stream.append(currentValue);
      }
    });
  }

  addStream(res, initialValue) {
    const streamId = this.nextStreamId++;
    this.streams[streamId] = makeStream(res, {
      initialValue,
      contentType: "application/json",
      onclose: () => {
        if (!streamId) throw new Error("null streamId");
        if (this.streams[streamId]) {
          delete this.streams[streamId];
        } else {
          console.warn("couldn't delete stream", streamId, this.streams);
        }
      },
    });
  }

  respond(req, res) {
    const currentValue = JSON.stringify(store.get(this.store));

    if (req.headers.subscribe === "keep-alive") {
      this.addStream(res, currentValue);
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(currentValue);
    }
  }
}

module.exports = SubscribableValue;
