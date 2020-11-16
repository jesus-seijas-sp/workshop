const { Bench } = require('@nlpjs/utils');
const { Ner } = require('@nlpjs/ner');
const airports = require('../../data/airports.json');

function createNer(threshold) {
  const airportKeys = Object.keys(airports);
  const ner = new Ner({ threshold });
  airportKeys.forEach(key => {
    const airport = airports[key];
    ner.addRuleOptionTexts('en', 'airport', airport.icao, [airport.city, airport.name]);
  });
  return ner;
}

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
