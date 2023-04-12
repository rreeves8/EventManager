class EventSystem {
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
        var _a;
        if (this.listeners.has(name)) {
            (_a = this.listeners.get(name)) === null || _a === void 0 ? void 0 : _a.filter((value) => value === listener);
        }
    }
    emit(name, data) {
        var _a;
        if (this.listeners.has(name)) {
            (_a = this.listeners.get(name)) === null || _a === void 0 ? void 0 : _a.forEach((listener) => {
                listener(data);
            });
        }
    }
}
export const CreateEventManager = () => {
    const eventManager = new EventSystem();
    return {
        emitEvent: eventManager.emit,
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
