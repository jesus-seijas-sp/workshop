const { TokenizerEn } = require('@nlpjs/lang-en');
const { NeuralNetwork } = require('@nlpjs/neural');
const { CorpusLookup } = require('@nlpjs/utils');
const corpus = require('../../data/corpus-en.json');

const tokenizer = new TokenizerEn();
const tokenize = x => tokenizer.tokenize(x, true);

function train(corpus) {
  const net = new NeuralNetwork({ log: false });
  const lookups = new CorpusLookup(corpus, { tokenizeAndStem: tokenize }, false);
  net.train(lookups.trainData);
  return { net, lookups };  
}

function process(utterance, input) {
  const formatted = input.lookups.prepareInput(utterance);
  const output = input.net.run(formatted);
  return { classifications: input.lookups.objToClassifications(output) };
}

const net = train(corpus);
let total = 0;
let good = 0;
corpus.data.forEach(item => {
  item.tests.forEach(test => {
    total += 1;
    const { classifications } = process(test, net);
    if (classifications[0].intent === item.intent) {
      good += 1;
    }
  });
});
console.log(`${good} good of a total of ${total} (${good*100/total}%)`);
