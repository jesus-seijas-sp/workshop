# NLP on intent

## Add intent

Add intent to the corpus:

```json
    {
      "intent": "joke",
      "utterances": [
        "Tell me a chuck norris joke",
        "joke about chuck norris",
        "chuck norris fact"
      ]
    },
```

## PROXY!!!!

We are going to do calls to internet, so configure the proxy in .env if you are using it:

```
HTTP_PROXY=http://<proxy ip>:<proxy port>
```

## Add onIntent event

```javascript
const { request } = require('@nlpjs/request');
// ...

  nlp.onIntent = async (nlp, input) => {
    if (input.intent === 'joke') {
      const apiAnswer = await request('http://api.icndb.com/jokes/random');
      input.answer = apiAnswer.value.joke;
    }
  };
```
