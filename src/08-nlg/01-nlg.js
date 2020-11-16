const { NlgManager } = require('@nlpjs/nlg');

(async () => {
  const manager = new NlgManager();
  manager.add('en', 'greet', '(Hello|Hi) user! How (are you|are you doing|is it going)?');
  manager.add('es', 'greet', '¡Hola!');
  manager.add('en', 'bye', 'Good bye!');
  manager.add('es', 'bye', '¡Hasta otra!');
  const result = await manager.run({ locale: 'en', intent: 'greet' });
  console.log(result.answer);
})();
