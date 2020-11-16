const { NlgManager } = require('@nlpjs/nlg');
const { Template, Evaluator } = require('@nlpjs/evaluator');

(async () => {
  const manager = new NlgManager();
  manager.container.use(Template);
  manager.container.use(Evaluator);
  manager.add('en', 'greet', '(Hello|Hi) {{ name }}! How (are you|are you doing|is it going)?');
  manager.add('es', 'greet', '¡Hola!');
  manager.add('en', 'bye', 'Good bye!');
  manager.add('es', 'bye', '¡Hasta otra!');
  manager.add('en', 'price', 'Total price is {{ price + price * vat / 100 }}$');
  manager.add('en', 'admin', 'You are not allowed to perform this action', 'role !== "admin"');
  manager.add('en', 'admin', 'You have admin rights', 'role === "admin"');
  manager.add('en', 'messages', 'You have {{ messages }} new message{{ plural(messages)}}');
  const plural = num => num === 1 ? '' : 's';
  const context = { name: 'John', price: 100, vat: 10, role: 'user', plural, messages: 1 };
  const result = await manager.run({ locale: 'en', intent: 'messages', context });
  console.log(result.answer);
})();
