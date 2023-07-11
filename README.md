<p align="center">
  <img width="300" height="300" src="https://i.ibb.co/QMSFRHY/pinterest-profile-image.png">
</p>

>Disclaimer:
This project is a fork of [reactive-event-bus](https://github.com/rafael-fecha/reactive-event-bus). It includes modifications and enhancements made by [Jamforce](https://github.com/Jamforce). Please note that Jamforce is not the original author/maintainer of the project.


## What is it ?

Reactive Event Bus is a typescript publish/subscribe event bus powered with RXJS. **Allows to get events data from the past (subscribing after emitting !) and provides options for automatic events unsubscriptions :star:**


## Motivation
Imagine having a large scale application containing a lot of components interacting with each other, and we want a way to make your components communicate while maintaining loose coupling and separation of concerns principles. The Event Bus pattern can be a good solution for our problem.

Implementing an Event Bus pattern can be beneficial for our code base as it helps loose coupling your classes and promotes a publish-subscribe pattern. It also help components interact without being aware of each other. Whichever implementation we choose to follow is a matter of taste and requirements. The main idea behind it is that we can connect two objects/two classes that have different lifecycles or a very different hierarchy or items dependency in the simplest way possible. That’s all.



## Installation

```bash
npm install reactive-event-bus
yarn add reactive-event-bus
```

## :rocket:  Usage

In order to be able to use the bus in our components you should import the side effects only exposing a eventBus global instance.

```ts
import 'reactive-event-bus';

eventBus.emit(...)
eventBus.on(...)
```

Declare some Events. Doesn't matter how you call them. The only one important thing is to keep them in one-level nested object. In which way you will declare event names and what data you will pass to them - it's completely up to you

```ts
type Events = {
  'app:start': string,
  'message:greet': string,
  'message:bye': string,
  'user:registered': { firstName: string, lastName: string, age?: number },
  'age:changed': number,
}

const bus: EventBus<Events> = eventBus;
...
bus.emit('age:changed', '10'); // it will raise an error, age should be a number
bus.emit('age:changed', 10); // OK
...
bus.on('app:start'); // OK
bus.on('app:stop'); // it will raise an error, the event does not exists
...
```

You can start publishing the events and subscribing to them. With all types auto-infered.

**Registering events**

Option 1

```ts
eventBus.on('user:registered').subscribe(() => {})
```
**Note:** on() returns an observable so you pipe any operator on top of the returned observable.
on('user:registered').pipe(debounceTime(2000))subscribe(() => {})

-----------------------------------------------------------------------------------------------------------------------------

Option 2

**Automagically events unsubscription :pray:** - the good thing about this option is that the developer does not need to handle the unsubscription of the event as it happens with the on().

**NOTE:** To use this option you must have declared on your component file the lifecycles which will be overriden by the decorator: (React - componentDidMount/componentWillUnmount, Angular - ngOnInit/ngOnDestroy, VanillaCustomElement/StencilJS - connectedCallback/disconnectedCallback).

```ts
@Subscribe('user:registered')
 onUserRegistered(data) {
  // do something
}
```

**Additional options**

If we want to just receive the first data of the subscription, there is the option: {once: true}. 
So after the first subscription, is automatically unsubscribed.

```ts
eventBus.on('user:registered', {once: true})).subscribe(() => {})

# or

@Subscribe('user:registered', {once: true})
  onUserRegistered(data) {
   // do something
}

```

If we want to subscribe and receive passed events data (emits that happened before subscribe), there is the option: { state: true }.

**NOTE:** With this option you cannot use patterns.

```ts
eventBus.on('user:registered', {state: true})).subscribe(() => {})

# or 

@Subscribe('user:registered', {state: true})
  onUserRegistered(config) {
   // do something
}
```

If we want to emit the first value and then ignore emitted values for a specified duration, there is the option: { throttleTime: durationTime }.

```ts
eventBus.on('user:registered', { throttleTime: 1000 })).subscribe(() => {})

# or 

@Subscribe('user:registered', { throttleTime: 1000 })
  onUserRegistered(data) {
   // do something
}
```

**Dispatching events**
```ts
eventBus.emit({ type: 'user:registered', data: { firstName: 'rafael', lastName: 'fecha' } })
```

## Patterns
Patterns may contain multiple segments split by :. Use this feature to create namespaces for messages you emit. You can use * in pattern to subscribe to any matching segment, or use ** to subscribe to all segments, starting from particular position.

For example, you can use on('error:*') and subscribe to all errors, including something like error:http or error:internal and so on:
```ts

eventBus.emit('app:start',     'started');
eventBus.emit('message:greet', 'Hi!');
eventBus.emit('message:bye',   'Bye!');

eventBus.on('app:start').subscribe((data: string) => {
  console.log(data); // will receive 'started' only
});

eventBus.on('message:greet').subscribe((data: string) => {
  console.log(data); // will receive 'Hi!' only
});

eventBus.on('message:*').subscribe((data: string) => {
  console.log(data); // will receive both 'Hi!' and 'Bye!'
});

eventBus.on('**').subscribe((data: string) => {
  console.log(data); // will receive all messages: 'started', 'Hi!' and 'Bye!'
});

```

## Tests
```bash
npm run test
yarn test
```

## :metal:  Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.


## Acknowledgements

This project is a fork of reactive-event-bus created by [rafael-fecha](https://github.com/rafael-fecha). The original repository can be found [here](https://github.com/rafael-fecha/reactive-event-bus).
