type Listener = (data: any) => void;
type Validator = (data: any) => void;
export type EventManager<EventName> = {
    emitEvent: (eventName: EventName, data: any) => void;
    addListener: (eventName: EventName, listener: Listener) => void;
    addValidator: (eventName: EventName, validator: Validator) => void;
};
export declare const CreateEventManager: <EventName>() => EventManager<EventName>;
export {};
