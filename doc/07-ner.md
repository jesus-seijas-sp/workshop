# NER

## Installation

First at all you'll need to install the library _@nlpjs/ner_ that contains several classes for NER.

```bash
  npm i @nlpjs/ner
```

## Usage

Require the _Ner_ class from the library _@nlpjs/ner_

```javascript
const { Ner } = require('@nlpjs/ner');
```

Create an async envelope, because the _process_ method is a promise, an create a new instance of _Ner_ class

```javascript
(async () => {
  const ner = new Ner();
})();
```

We will create two entities: hero and food. Hero will contain two options, spiderman and batman, while food will contain pasta and fruit.
We add each option and the texts that will detect the option with the method _addRuleOptionTexts_:

```javascript
(async () => {
  const ner = new Ner();
  ner.addRuleOptionTexts('en', 'hero', 'spiderman', ['spiderman', 'spider-man', 'Peter Parker']);
  ner.addRuleOptionTexts('en', 'hero', 'batman', ['batman', 'dark knight', 'Bruce Wayne']);
  ner.addRuleOptionTexts('en', 'food', 'pasta', ['pasta', 'spaghetti', 'macaroni', 'raviolli']);
  ner.addRuleOptionTexts('en', 'food', 'fruit', ['apple', 'banana', 'macaroni', 'strawberry']);
})();
```

Now we can process a text, providing also the locale of the text, to find entities.

```javascript
  let result = await ner.process({ locale: 'en', text: 'I saw peter parker eating an apple in New York' });
  console.log(result);
```

By default, the NER has a threshold of 0.8, that means that NER will match substrings even with an error of 2 characters each 10, using levenhstein distance.

```javascript
  result = await ner.process({ locale: 'en', text: 'I saw peter prker eating an aple in New York' });
  console.log(result);
```

## Huge NER

When the threshold is 1, so we are searching for exact results, it's able to process millions of options in milliseconds. If the threshold is not 1, then instead of an exact search if does a similar search that requires more computational time to calculate distances, and for huge amounts of options that means a performance issue.

In data there is a file with the airport codes, cities, airport names, that is a huge amount of data. Let's benchmark the search by similar and by exact.

First at all, the requires:

```javascript
const { Bench } = require('@nlpjs/utils');
const { Ner } = require('@nlpjs/ner');
const airports = require('../../data/airports.json');
```

Then we need a function that creates a NER instance with a given threshold, and trains it with the airports: 

```javascript
function createNer(threshold) {
  const airportKeys = Object.keys(airports);
  const ner = new Ner({ threshold });
  airportKeys.forEach(key => {
    const airport = airports[key];
    ner.addRuleOptionTexts('en', 'airport', airport.icao, [airport.city, airport.name]);
  });
  return ner;
}
```

Finally, create both NER instances, one with exact and one with similar, and we create a new _Bench_ instance with duration 10 seconds that will measure the process for similar and equal NER instances.


```javascript
(async () => {
  const input = { locale: 'en', text: 'I want to travel to San francisco tomorrow' };
  const bench = new Bench({ duration: 10000 });
  const nerSimilar = createNer(0.8);
  const nerEqual = createNer(1);
  bench.add('Similar', () => nerSimilar.process(input));
  bench.add('Equal', () => nerEqual.process(input));
  const result = await bench.run();
  console.log(result);
})();
```

## Other NERs

There is also a NER for regular expressions and other one for Builtin entities (also called Golden Entities) using Microsoft Recognizers or Duckling.