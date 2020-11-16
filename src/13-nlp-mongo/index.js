const { dockStart } = require('@nlpjs/basic');

(async () => {
  const dock = await dockStart();
  const database = dock.get('database');
  await database.connect();
  const nlp = dock.get('nlp');
  await nlp.train();
})();