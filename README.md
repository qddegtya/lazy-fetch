[![NPM](https://nodei.co/npm/lazy-fetch.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/lazy-fetch/)

# lazy-fetch

  Define model for fetch api and call it later.

## Installation

```
$ npm install lazy-fetch
```

## Examples

```js
'use strict';
var LazyFetch = require('lazy-fetch');

module.exports = LazyFetch
    .factory({
      baseUrl: 'http://xxx.api.com/v1'
    })
    .headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
    .add('getTopicList', 'GET', '/topic')
    .add('searchTopic', 'GET', '/topic/search');
```

## Usage

```js
_fetchTopicList: function() {
    models.getTopicList({ limit: 98 })
      .then((r) => { return r.json(); })
      .then((res) => {
        this.state.topicList = res.data.data;
      });
  }
```

# License
  MIT
