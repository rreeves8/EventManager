type Subscriber = (data: any) => void;
export type EventManager<EventName> = {
    emitEvent: (eventName: EventName, data: any) => void;
    addSubscriber: (subscriber: Subscriber) => void;
};
export declare const CreateEventManager: <EventName>() => EventManager<EventName>;
export {};
