class EventSystem {
    listeners;
    constructor() {
        this.listeners = new Map();
    }
    addListener(name, listener) {
        if (!this.listeners.has(name)) {
            this.listeners.set(name, []);
        }
        this.listeners.get(name).push(listener);
    }
    removeListener(name, listener) {
        if (this.listeners.has(name)) {
            this.listeners.get(name)?.filter((value) => value === listener);
        }
    }
    emit(name, data) {
        if (this.listeners.has(name)) {
            this.listeners.get(name)?.forEach((listener) => {
                listener(data);
            });
        }
    }
}
exports.CreateEventManager = () => {
    const eventManager = new EventSystem();
    return {
        emitEvent(eventName, data) {
            eventManager.emit(eventName, data);
        },
        addSubscriber(eventName, subscriber, validate) {
            const listener = validate
                ? (data) => {
                    validate(data);
                    subscriber(data);
                }
                : subscriber;
            eventManager.addListener(eventName, listener);
        },
    };
};
