const { containerBootstrap } = require('@nlpjs/core');
const { LangEn } = require('@nlpjs/lang-en');
const { NluNeural } = require('@nlpjs/nlu');
const { NlpAnalyzer } = require('@nlpjs/utils');
const corpus = require('../../data/corpus-en.json');

async function train(corpus) {
  const preparedCorpus = corpus.data.reduce((prev, current) => {
    prev.push(...(current.utterances.map(x => ({ utterance: x, intent: current.intent }))));
    return prev;
  }, []);
  const container = containerBootstrap();
  container.use(LangEn);
  const net = new NluNeural({ locale: 'en', container });
  await net.train(preparedCorpus);
  return net;
}

const process = (utterance, input) => input.process(utterance);

(async () => {
  const analyzer = new NlpAnalyzer();
  const analysis = await analyzer.analyze(corpus, train, process);
  console.log(`Precision: ${analysis.confusionMatrix.totals.precision}`);
  await analyzer.generateExcel('confussion-matrix.xlsx', analysis);
})();

