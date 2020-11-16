const { dockStart } = require('@nlpjs/basic');

(async () => {
  const dock = await dockStart();
  const nlp = dock.get('nlp');
  await nlp.train();
  const result = await nlp.process('tell me who are you?');
  console.log(result);
})();