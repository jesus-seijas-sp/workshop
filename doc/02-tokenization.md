# Tokenization

Every language library contains different utils of the language:
- normalizer
- tokenizer
- stemmer
- most common trigrams
- sentiment analysis data

Some languages contains more specific tools, like chinese, japanese or korean.

## Tokenization in english

First at all, install the library for the english language.

```shell
  npm i @nlpjs/lang-en
```

Now require the class **TokenizerEn** and create a new instance.

```javascript
const { TokenizerEn } = require('@nlpjs/lang-en');

const tokenizerEn = new TokenizerEn();
```

The method **tokenize** accepts a sentence and return the tokens:

```javascript
const input = 'I didn\'t finish those tasks. i\'ll finish tomorrow';
let tokens = tokenizerEn.tokenize(input);
console.log(tokens)
```

This will return:
```shell
['I', 'did', 'not', 'finish', 'those', 'tasks', 'i', 'will', 'finish', 'tomorrow']
```

We can notice that:
- "didn't" is converted to "did not"
- "i'll" is converted to "i will"
- the first "I" is uppercase and the second is lowercase, becase original case is respected.

How we can do the same but normalized? (lowercase and without decorations of characters, example: "àéïÔU" will be converted to "aeiou")
Just providing "true" as second paramter to tokenizer, representing that you want the result normalized.

```javascript
tokens = tokenizerEn.tokenize(input, true);
console.log(tokens);
```

## Tokenization in spanish (as example of other languages)

First at all, install the library for the spanish language.

```shell
  npm i @nlpjs/lang-es
```

Now require the class **TokenizerEs** and create a new instance.

```javascript
const { TokenizerEs } = require('@nlpjs/lang-es');

const tokenizerEs = new TokenizerEs();
```

Then you can tokenize with or without normalization:

```javascript
const input = 'Todavía no he terminado esas tareas, las terminaré mañana';
// Tokenization without normalization
let tokens = tokenizerEs.tokenize(input);
console.log(tokens);

// Tokenization with normalization
tokens = tokenizerEs.tokenize(input, true);
console.log(tokens);
```
