
import { EventEmitter } from 'events';

export default class EventHandler {
    static _eventHandler = null;

    static Instance() {
        if (EventHandler._eventHandler === null) {
            EventHandler._eventHandler = new EventEmitter();
        }

        return EventHandler._eventHandler;
    }
}