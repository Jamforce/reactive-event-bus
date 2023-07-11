import { RxEventBus } from '../../src/classes/rx-event-bus.class';

describe('Rx Event Bus Class', () => {
  it('should create an instance', () => {
    expect(new RxEventBus()).toBeTruthy();
  });
  it('basic emit subscribe', () => {
    const spy = jest.fn();
    const eventBus = new RxEventBus();
    eventBus.on('GetSomethingMessage').subscribe(spy);
    eventBus.emit('GetSomethingMessage', { error: 1 });
    eventBus.emit('GetSomethingMessage', { error: 2 });
    eventBus.emit('GetSomethingMessage', { error: 3 });
    expect(spy.mock.calls.length).toBe(3);
  });
  it('subscribe with once option', () => {
    const spy = jest.fn();
    const eventBus = new RxEventBus();
    eventBus.on('GetSomethingMessage', { once: true }).subscribe(spy);
    eventBus.emit('GetSomethingMessage', { error: 1 });
    eventBus.emit('GetSomethingMessage', { error: 2 });
    eventBus.emit('GetSomethingMessage', { error: 3 });
    expect(spy.mock.calls.length).toBe(1);
  });
  it('subscribe with state option', () => {
    const spy = jest.fn();
    const eventBus = new RxEventBus();
    eventBus.emit('GetSomethingMessage', { error: 1 });
    eventBus.on('GetSomethingMessage', { state: true }).subscribe(spy);
    eventBus.emit('GetSomethingMessage', { error: 2 });
    expect(spy.mock.calls.length).toBe(2);
  });
  it('get message latest value', () => {
    const eventBus = new RxEventBus();
    expect(eventBus.getMessageValues('GetSomethingMessage')).toEqual({ error: 2 });
  });
});
