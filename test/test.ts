import { CreateEventManager } from "../lib/EventManager";

type EventNames = "DataDone" | "Error";
type ExampleData = {
  name: string;
};

const someProcessEvent = CreateEventManager<EventNames>();
//or
const { emitEvent, addListener, addValidator } =
  CreateEventManager<EventNames>();

addListener("DataDone", (data: ExampleData) => {
  //do something with the data
});
addValidator("DataDone", (data) => {
  if (!("name" in data)) {
    throw Error("bad data for event DataDone");
  }
});

emitEvent("DataDone", {
  name: "magnus",
});
