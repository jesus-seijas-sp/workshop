# Confusion Matrix

From the code of the previous example, we will remove the last part, the measure one.

We will modify the require from utils to include _NlpAnalyzer_

```javascript
const { CorpusLookup, NlpAnalyzer } = require('@nlpjs/utils');
```

Then we add an async function to execute the code.
We create a new instance of _NlpAnalyzer_ and call the analyze method.
This methods requires 3 things: a corpus (in NLP.js json format), a function for the train that will receive the corpus and a function for the process that will receive sentences and the output from the train.
Finally, the _generateExcel_ method saves the json analysis into an excel file.

```javascript
(async () => {
  const analyzer = new NlpAnalyzer();
  const analysis = await analyzer.analyze(corpus, train, process);
  console.log(`Precision: ${analysis.confusionMatrix.totals.precision}`);
  await analyzer.generateExcel('confussion-matrix.xlsx', analysis);
})();
```