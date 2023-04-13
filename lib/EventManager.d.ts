type Subscriber = (data: any) => void;
export type EventManager<EventName> = {
    emitEvent: (eventName: EventName, data: any) => void;
    addSubscriber: (eventName: EventName, subscriber: Subscriber, validate?: any) => void;
};
export declare const CreateEventManager: <EventName>() => EventManager<EventName>;
export {};
