const { CreateEventManager } = require("../lib/EventManager");

const someProcessEvent = CreateEventManager();
//or
const { emitEvent, addListener, addValidator } = CreateEventManager();

addListener("DataDone", (data) => {
  //do something with the data
  console.log(data);
});

addValidator("DataDone", (data) => {
  if (!("name" in data)) {
    throw Error("bad data for event DataDone");
  }
});

emitEvent("DataDone", {
  name: "magnus",
});
