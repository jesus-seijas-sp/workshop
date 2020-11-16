# Directline Connector

## Installation

Install _@nlpjs/express-api-server_ and _@nlpjs/directline-connector_

```shell
  npm i @nlpjs/express-api-server @nlpjs/directline-connector
```

## Usage

Add _ExpressApiServer_ and _DirectlineConnector_ to the plugins of _conf.json_
Also add _api-server_ settings to serve in port 3000.

```json
{
  "settings": {
    "nlp": {
      "corpora": [
        "../../data/corpus-smalltalk-en.json"
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

Now start and go to http