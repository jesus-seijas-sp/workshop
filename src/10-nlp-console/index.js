const { dockStart } = require('@nlpjs/basic');

(async () => {
  const dock = await dockStart();
  const nlp = dock.get('nlp');
  await nlp.train();
  const consoleConnector = dock.get('console');
  consoleConnector.say('Say something');
})();