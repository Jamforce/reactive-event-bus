import { Subscribe } from '../../src/decorators/subscribe.decorator';
import { RxEventBus } from '../../src/classes/rx-event-bus.class';

interface MessageData {
  message: string;
  error: number;
}

const mockMessageData = { message: 'test', error: 1 };

let messageValue: MessageData | null = null;

class TestClass {
  handleSomethingMessage(data: MessageData) {
    messageValue = data;
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

describe('Subscribe decorator', () => {
  it('subscription in connectedCallback', () => {
    Subscribe('GetSomethingMessage')(
      TestClass.prototype,
      'handleSomethingMessage',
      // @ts-ignore
      Object.getOwnPropertyDescriptor(TestClass.prototype, 'handleSomethingMessage')
    );
    TestClass.prototype.connectedCallback();
    const eventBus = new RxEventBus();
    eventBus.emit('GetSomethingMessage', mockMessageData);
    TestClass.prototype.disconnectedCallback();
    expect(messageValue).toEqual(mockMessageData);
  });
  it('unsubscription in disconnectedCallback', () => {
    messageValue = null;
    Subscribe('GetSomethingMessage')(
      TestClass.prototype,
      'handleSomethingMessage',
      Object.getOwnPropertyDescriptor(TestClass.prototype, 'handleSomethingMessage') as PropertyDescriptor
    );
    TestClass.prototype.connectedCallback();
    TestClass.prototype.disconnectedCallback();
    const eventBus = new RxEventBus();
    eventBus.emit('GetSomethingMessage', mockMessageData);
    expect(messageValue).toBeNull();
  });
});
