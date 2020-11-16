const { dockStart } = require('@nlpjs/basic');
const { request } = require('@nlpjs/request');

(async () => {
  const dock = await dockStart();
  const nlp = dock.get('nlp');
  nlp.onIntent = async (nlp, input) => {
    if (input.intent === 'joke') {
      const apiAnswer = await request('http://api.icndb.com/jokes/random');
      input.answer = apiAnswer.value.joke;
    }
  };
  const bot = dock.get('bot');
  bot.registerAction('saveClaim', (session, context, params) => {
    console.log(context.userName);
    console.log(context.reason);
    session.say(`[claim created with reason "${context.reason}"]`)
  });
})();