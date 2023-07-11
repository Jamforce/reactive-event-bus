import { bus, EventBus } from './classes/rx-event-bus.class';
import { Subscribe } from './decorators/subscribe.decorator';

declare global {
    var eventBus: EventBus<Record<string, unknown>>;
}

globalThis.eventBus = bus;

export { EventBus, Subscribe };