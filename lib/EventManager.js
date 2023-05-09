"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventManager = void 0;
class EventSystem {
    listeners;
    validators;
    constructor() {
        this.listeners = new Map();
        this.validators = new Map();
    }
    addListener(name, listener) {
        if (!this.listeners.has(name)) {
            this.listeners.set(name, []);
        }
        this.listeners.get(name).push(listener);
    }
    addValidator(name, validator) {
        this.validators.set(name, validator);
    }
    removeListener(name, listener) {
        if (this.listeners.has(name)) {
            this.listeners.get(name)?.filter((value) => value === listener);
        }
    }
    emit(name, data) {
        if (this.listeners.has(name)) {
            if (this.validators.has(name)) {
                this.validators.get(name)(data);
            }
            this.listeners.get(name)?.forEach((listener) => {
                listener(data);
            });
        }
    }
}
const CreateEventManager = () => {
    const eventManager = new EventSystem();
    return {
        emitEvent(eventName, data) {
            eventManager.emit(eventName, data);
        },
        addListener(eventName, listener) {
            eventManager.addListener(eventName, listener);
        },
        addValidator(eventName, validator) {
            eventManager.addValidator(eventName, validator);
        },
    };
};
exports.CreateEventManager = CreateEventManager;
