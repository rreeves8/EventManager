import { CreateEventManager } from "../lib/EventManager";

type EventNames = "DataDone" | "Error";
type ExampleData = {
	name: string;
};

const someProcessEvent = CreateEventManager<EventNames>();
//or
const { emitEvent, addSubscriber } = CreateEventManager<EventNames>();

addSubscriber(
	"DataDone",
	(data: ExampleData) => {
		//the subscriber
		//do something with the data
	},
	(data: ExampleData) => {
		//the validator, optional
		//validate the data, throw an error if bad
	}
);

emitEvent("DataDone", {
	name: "magnus",
});
