type Subscriber = (data: any) => void;
type EventManager<EventName> = {
	emitEvent: (eventName: EventName, data: any) => void;
	addSubscriber: (subscriber: Subscriber) => void;
};

class EventSystem<T> {
	listeners: Map<T, Array<Subscriber>>;

	constructor() {
		this.listeners = new Map();
	}

	addListener(name: T, listener: Subscriber) {
		if (!this.listeners.has(name)) {
			this.listeners.set(name, []);
		}
		(this.listeners.get(name) as Array<Subscriber>).push(listener);
	}

	removeListener(name: T, listener: Subscriber) {
		if (this.listeners.has(name)) {
			this.listeners.get(name)?.filter((value: Subscriber) => value === listener);
		}
	}

	emit(name: T, data: any) {
		if (this.listeners.has(name)) {
			this.listeners.get(name)?.forEach((listener) => {
				listener(data);
			});
		}
	}
}

export const CreateEventManager = <EventName,>() => {
	const eventManager = new EventSystem<EventName>();

	return {
		emitEvent(eventName: EventName, data: any) {
			eventManager.emit(eventName, data);
		},
		addSubscriber(eventName: EventName, subscriber: Subscriber, validate?: any) {
			const listener: Subscriber = validate
				? (data: any) => {
						validate(data);
						subscriber(data);
				  }
				: subscriber;

			eventManager.addListener(eventName, listener);
		},
	} as EventManager<EventName>;
};