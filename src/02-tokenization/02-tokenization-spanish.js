// Example of Tokenization in english
const { TokenizerEs } = require('@nlpjs/lang-es');

// Create a new instance of the tokenizer
const tokenizerEs = new TokenizerEs();

const input = 'Todavía no he terminado esas tareas, las terminaré mañana';
// Tokenization without normalization
let tokens = tokenizerEs.tokenize(input);
console.log(tokens);

// Tokenization with normalization
tokens = tokenizerEs.tokenize(input, true);
console.log(tokens);
