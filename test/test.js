const { CreateEventManager } = require("../lib/EventManager");

const { emitEvent, addSubscriber } = CreateEventManager();

addSubscriber(
	"DataDone",
	(data) => {
		//the subscriber
		//do something with the data
		console.log(data);
	}
);

emitEvent("DataDone", {
	name: "magnus",
});
