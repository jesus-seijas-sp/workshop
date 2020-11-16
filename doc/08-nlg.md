# NLG

## Installation

First at all you'll need to install the library _@nlpjs/nlg_ that contains several classes for NLG.

```bash
  npm i @nlpjs/nlg
```

## Usage

The idea is to add answers for locale/intent

```javascript
const { NlgManager } = require('@nlpjs/nlg');

(async () => {
  const manager = new NlgManager();
  manager.add('en', 'greet', 'Hello user! How are you doing?');
  manager.add('es', 'greet', '¡Hola!');
  manager.add('en', 'bye', 'Good bye!');
  manager.add('es', 'bye', '¡Hasta otra!');
  const result = await manager.run({ locale: 'en', intent: 'greet' });
  console.log(result.answer);
})();
```

You can add several answers for the same locale/intent combination, this will do that each answer appears at random.

```javascript
const { NlgManager } = require('@nlpjs/nlg');

(async () => {
  const manager = new NlgManager();
  manager.add('en', 'greet', 'Hello user! How are you doing?');
  manager.add('en', 'greet', 'Hi user! How are you doing?');
  manager.add('es', 'greet', '¡Hola!');
  manager.add('en', 'bye', 'Good bye!');
  manager.add('es', 'bye', '¡Hasta otra!');
  const result = await manager.run({ locale: 'en', intent: 'greet' });
  console.log(result.answer);
})();
```

## Pattern

You can use patterns to generate cartesian product of options to generate sentences at random

```javascript
const { NlgManager } = require('@nlpjs/nlg');

(async () => {
  const manager = new NlgManager();
  manager.add('en', 'greet', '(Hello|Hi) user! How (are you|are you doing|is it going)?');
  manager.add('es', 'greet', '¡Hola!');
  manager.add('en', 'bye', 'Good bye!');
  manager.add('es', 'bye', '¡Hasta otra!');
  const result = await manager.run({ locale: 'en', intent: 'greet' });
  console.log(result.answer);
})();
```

## Evaluator and Template

Install _@nlpjs/evaluator_

```shell
  npm i @nlpjs/evaluator
```

Make the IoC container of the nlg instance to use _Template_ and _Evaluator_ from this library

```javascript
const { NlgManager } = require('@nlpjs/nlg');
const { Template, Evaluator } = require('@nlpjs/evaluator');

(async () => {
  const manager = new NlgManager();
  manager.container.use(Template);
  manager.container.use(Evaluator);
```

Now you can use a context and string templating to replace variables from the context:

```javascript
const { NlgManager } = require('@nlpjs/nlg');
const { Template, Evaluator } = require('@nlpjs/evaluator');

(async () => {
  const manager = new NlgManager();
  manager.container.use(Template);
  manager.container.use(Evaluator);
  manager.add('en', 'greet', '(Hello|Hi) {{ name }}! How (are you|are you doing|is it going)?');
  manager.add('es', 'greet', '¡Hola!');
  manager.add('en', 'bye', 'Good bye!');
  manager.add('es', 'bye', '¡Hasta otra!');
  const context = { name: 'John' }
  const result = await manager.run({ locale: 'en', intent: 'greet', context });
  console.log(result.answer);
})();
```

You can also use evaluations:

```javascript
  manager.add('en', 'price', 'Total price is {{ price + price * vat / 100 }}$');
  const context = { name: 'John', price: 100, vat: 10 }
  const result = await manager.run({ locale: 'en', intent: 'price', context });
  console.log(result.answer);
```

You can provide conditions for each answer:

```javascript
  manager.add('en', 'admin', 'You are not allowed to perform this action', 'role !== "admin"');
  manager.add('en', 'admin', 'You have admin rights', 'role === "admin"');
```

The last parameter will be evaluated using the context, if the result is false then this answer will not be elegible.
