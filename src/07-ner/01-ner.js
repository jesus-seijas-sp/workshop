const { Ner } = require('@nlpjs/ner');

(async () => {
  const ner = new Ner();
  ner.addRuleOptionTexts('en', 'hero', 'spiderman', ['spiderman', 'spider-man', 'Peter Parker']);
  ner.addRuleOptionTexts('en', 'hero', 'batman', ['batman', 'dark knight', 'Bruce Wayne']);
  ner.addRuleOptionTexts('en', 'food', 'pasta', ['pasta', 'spaghetti', 'macaroni', 'raviolli']);
  ner.addRuleOptionTexts('en', 'food', 'fruit', ['apple', 'banana', 'macaroni', 'strawberry']);
  let result = await ner.process({ locale: 'en', text: 'I saw peter parker eating an apple in New York' });
  console.log(result);
  result = await ner.process({ locale: 'en', text: 'I saw peter prker eating an aple in New York' });
  console.log(result);
})();
