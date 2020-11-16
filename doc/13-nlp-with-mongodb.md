# NLP with MongoDB

## Installation

Install libraries _@nlpjs/database_ and _@nlpjs/mongodb-adapter_

```shell
  npm i @nlpjs/database @nlpjs/mongodb-adapter
```

## Add .env
Add a _.env_ file with the mongodb url

```
MONGO_URL=mongodb://localhost:27017/workshop
```

## Connect database in index.js

```javascript
  const database = dock.get('database');
  await database.connect();
```