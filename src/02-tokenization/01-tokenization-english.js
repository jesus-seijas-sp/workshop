// Example of Tokenization in english
const { TokenizerEn } = require('@nlpjs/lang-en');

// Create a new instance of the tokenizer
const tokenizerEn = new TokenizerEn();

const input = 'I didn\'t finish those tasks. i\'ll finish tomorrow';
// Tokenization without normalization
let tokens = tokenizerEn.tokenize(input);
console.log(tokens);

// Tokenization with normalization
tokens = tokenizerEn.tokenize(input, true);
console.log(tokens);
