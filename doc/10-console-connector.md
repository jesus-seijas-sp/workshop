# Console Connector

## Usage

Add _ConsoleConnector_ to the plugins of _conf.json_

```json
{
  "settings": {
    "nlp": {
      "corpora": [
        "../../data/corpus-smalltalk-en.json"
      ]
    }
  },
  "use": ["Basic", "LangEn", "ConsoleConnector"]
}
```

Modify _index.js_:

```javascript
const { dockStart } = require('@nlpjs/basic');

(async () => {
  const dock = await dockStart();
  const nlp = dock.get('nlp');
  await nlp.train();
  const consoleConnector = dock.get('console');
  consoleConnector.say('Say something');
})();
```