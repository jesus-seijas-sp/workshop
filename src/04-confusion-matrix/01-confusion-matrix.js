const { TokenizerEn } = require('@nlpjs/lang-en');
const { NeuralNetwork } = require('@nlpjs/neural');
const { CorpusLookup, NlpAnalyzer } = require('@nlpjs/utils');
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

(async () => {
  const analyzer = new NlpAnalyzer();
  const analysis = await analyzer.analyze(corpus, train, process);
  console.log(`Precision: ${analysis.confusionMatrix.totals.precision}`);
  await analyzer.generateExcel('confussion-matrix.xlsx', analysis);
})();
