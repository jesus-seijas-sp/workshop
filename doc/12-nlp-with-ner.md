# NLP with NER

Create a file _heros.json_ with real names and locations of super heros:

```json
{
  "spiderman": {
    "realName": "Peter Parker",
    "city": "Queens, New York"
  },
  "ironman": {
    "realName": "Tony Stark",
    "city": "Stark Tower, New York"
  },
  "thor": {
    "realName": "Odinson",
    "city": "Asgard"
  }
}
```

Create a corpus that also adds the entity hero:
```json
{
  "name": "Corpus with entities",
  "locale": "en-US",
  "contextData": "./heros.json",
  "data": [
    {
      "intent": "hero.saw",
      "utterances": [
        "I saw @hero"
      ],
      "answers": [
        "You saw {{ hero }}"
      ]
    },
    {
      "intent": "hero.realname",
      "utterances": [
        "what is the real name of @hero"
      ],
      "answers": [
        "The real name of {{ hero }} is {{ _data[entities.hero.option].realName }}"
      ]
    },
    {
      "intent": "hero.city",
      "utterances": [
        "where @hero lives?",
        "what's the city of @hero?"
      ],
      "answers": [
        "{{ hero }} lives at {{ _data[entities.hero.option].city }}"
      ]
    }
  ],
  "entities": {
    "hero": {
      "options": {
        "spiderman": ["spiderman", "spider-man"],
        "ironman": ["ironman", "iron-man"],
        "thor": ["thor"]
      }
    }
  }
}
```

Modify _conf.json_ to use this corpus:
```json
{
  "settings": {
    "nlp": {
      "corpora": [
        "./corpus-ner.json"
      ]
    },
    "api-server": {
      "port": 3000,
      "serveBot": true
    }
  },
  "use": ["Basic", "LangEn", "ConsoleConnector", "ExpressApiServer", "DirectlineConnector"]
}
```