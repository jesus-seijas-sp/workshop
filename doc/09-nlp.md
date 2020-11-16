# NLP

## Installation

First at all you'll need to install the library _@nlpjs/basic_ that creates the basic ecosystem of classes and the IoC container.

```bash
  npm i @nlpjs/basic
```

## Usage

Create a _conf.json_ file:

```json
{
  "settings": {
    "nlp": {
      "corpora": [
        "../../data/corpus-smalltalk-en.json"
      ]
    }
  },
  "use": ["Basic", "LangEn"]
}
```

Create _index.js_:

```javascript
const { dockStart } = require('@nlpjs/basic');

(async () => {
  const dock = await dockStart();
  const nlp = dock.get('nlp');
  await nlp.train();
  const result = await nlp.process('tell me who are you?');
  console.log(result);
})();
```