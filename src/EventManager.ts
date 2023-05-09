type Listener = (data: any) => void;
type Validator = (data: any) => void;

class EventSystem<T> {
  listeners: Map<T, Array<Listener>>;
  validators: Map<T, Validator>;

  constructor() {
    this.listeners = new Map();
    this.validators = new Map();
  }

  addListener(name: T, listener: Listener) {
    if (!this.listeners.has(name)) {
      this.listeners.set(name, []);
    }
    (this.listeners.get(name) as Array<Listener>).push(listener);
  }

  addValidator(name: T, validator: Validator) {
    this.validators.set(name, validator);
  }

  removeListener(name: T, listener: Listener) {
    if (this.listeners.has(name)) {
      this.listeners.get(name)?.filter((value: Listener) => value === listener);
    }
  }

  emit(name: T, data: any) {
    if (this.listeners.has(name)) {
      if (this.validators.has(name)) {
        (this.validators.get(name) as Validator)(data);
      }
      this.listeners.get(name)?.forEach((listener) => {
        listener(data);
      });
    }
  }
}

export type EventManager<EventName> = {
  emitEvent: (eventName: EventName, data: any) => void;
  addListener: (eventName: EventName, listener: Listener) => void;
  addValidator: (eventName: EventName, validator: Validator) => void;
};

export const CreateEventManager = <EventName>() => {
  const eventManager = new EventSystem<EventName>();

  return {
    emitEvent(eventName: EventName, data: any) {
      eventManager.emit(eventName, data);
    },
    addListener(eventName: EventName, listener: Listener) {
      eventManager.addListener(eventName, listener);
    },
    addValidator(eventName: EventName, validator: Validator) {
      eventManager.addValidator(eventName, validator);
    },
  } as EventManager<EventName>;
};
