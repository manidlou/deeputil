#deeputil

[![travis](https://img.shields.io/travis/mawni/deeputil/master.svg)](https://travis-ci.org/mawni/deeputil) [![npm](https://img.shields.io/npm/v/deeputil.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/deeputil)

<a href="https://github.com/feross/standard"><img src="https://cdn.rawgit.com/feross/standard/master/sticker.svg" alt="Standard JavaScript" width="100"></a>

`deeputil` is a tiny [node.js](https://nodejs.org) module that provides a few recursive functions for dealing with keys/values of deeply nested objects.

###Install

`npm i deeputil`

###Docs

**deeputil.key(obj)**

 * `obj` `{Object}`
 * `@return` `{String}` the property name of `obj`

```javascript
const du = require('deeputil')

var someobj = {username: 'foo'}
console.log(du.key(someobj))
// will return 'username'
```

**deeputil.keys(obj)**

 * `obj` `{Object}`
 * `@return` `{Array<String>}`

returns an array of all the keys of `obj` no matter how deeply nested!

```javascript
const du = require('deeputil')

var someobj = {
  ...  
}

console.dir(du.keys(someobj))
```

**deeputil.vals(obj)**

 * `obj` `{Object}`
 * `@return` `{Array<Object>}`

returns an array of all the key/value pairs of `obj`.

```javascript
const du = require('deeputil')

var someobj = {
  ...  
}

console.dir(du.vals(someobj))
```

**deeputil.stream(obj)**

 * `obj` `{Object}`
 * `@return` {[stream.Readable](https://nodejs.org/api/stream.html#stream_class_stream_readable)} a readable stream

  * `data` `{Object}` `{key:'', val: }`

streams all key/value pairs of `obj`

```javascript
const du = require('deeputil')

var someobj = {
  ...  
}

du.stream(someobj).on('error', (err) => {
  console.error(err)
}).on('data', (dat) => {
  console.log('key:', dat.key)  
  console.log('value:', dat.val)  
}).on('end', () => {
  console.log('finished successfully.')  
})
```

**deeputil.find(obj, key)**

 * `obj` `{Object}` object to find items in
 * `key` `{String}` the key to find
 * `@return` `{Object | Array<Object>}`

  * if only one item found, returns an object
  * if more than one item with the same key found (like in an array), returns an array of objects

```javascript
const du = require('deeputil')

var someobj = {
  data: [{username:'plugh', id: 17}, {username: 'thud', id: 92}],
  baz: {
    qux: {
      garply: 'waldo',
      quux: ['corge', 'grault']  
    }
  }
}

console.log(du.find(someobj, 'quux'))
// result -> { quux: [ 'corge', 'grault' ] }

console.log(du.find(someobj, 'username'))
// result -> [ { username: 'plugh' }, { username: 'thud' } ]
```

