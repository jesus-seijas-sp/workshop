# Bots Dialogs

## Add dialog redirection in corpus

```
intent claim.open
  utterances
  - I want to open a claim
  - I want to open an issue
  answers
  - /openclaim
```

## Modify script.dlg
```
# Script for a simple turn conversation
import corpus-ner.dlg
dialog main
  nlp
dialog openclaim
  [!userName] run askName
  say Hello {{ userName }}. Tell me what happened
  ask reason
  say Thank you {{ userName }}! we are processing your claim!
dialog askName
  say Tell me your name
  ask userName
```
