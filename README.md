#deeputil

[![travis](https://img.shields.io/travis/mawni/deeputil/master.svg)](https://travis-ci.org/mawni/deeputil) [![npm](https://img.shields.io/npm/v/deeputil.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/deeputil)

`deeputil` is a tiny [node.js](https://nodejs.org) module that provides a few recursive functions for dealing with keys/values of deeply nested objects.

###install

`npm i deeputil`

###docs

*a dummy object for use in examples below*

```javascript
var testobj = {
  "rname": "gonzo",
  "rid": 274,
  "rdata": [
    {
      "username": "",
      "email": "",
      "msgs": []
    },
    {
      "username": "gonzo",
      "email": "gonzoemail",
      "msgs": [
        {
          "msgid": 19,
          "msg": "explore your mind",
          "sen": "anonym",
          "time": ""
        }
      ]
    }
  ],
  "complx": {
    "somearr": ["wolf", "octopus", "epsilon"],
    "langs": {
      "js": {
        "jsobj": {
          "djsobj": {
            "ddjsobj": {
              "dddjsobj": "alright"
            }
          }
        },
        "fun": "for sure"
      },
      "shell": {
        "shellobj": {
          "dshellobj": "nice"
        }
      },
      "go": {
        "gobj": {
          "dgobj": ["pretty", "cool"]
        }
      }
    }
  }
}
```

**deeputil.keys(obj)**

 * `obj` `{Object}`
 * `@return` `{Array<String>}`

returns an array of all the keys of the given object no matter what!

```javascript
const du = require('deeputil')

console.log(du.keys(testobj))
/* will return
	["rname","rid","rdata","username","email","msgs","msgid",
   "msg","sen","time","complx","somearr","langs","js","jsobj",
   "djsobj","ddjsobj","dddjsobj","fun","shell","shellobj",
   "dshellobj","go","gobj","dgobj"]
*/
```

**deeputil.vals(obj)**

 * `obj` `{Object}`
 * `@return` `{Array<Object>}`

returns an array of all the key/value pairs of the given object.

```javascript
const du = require('deeputil')

console.log(du.vals(testobj))
```

**deeputil.find(obj, key)**

 * `obj` `{Object}` object to find items in
 * `key` `{String}` the key to find
 * `@return` `{Array<Object>}`

returns an array of results if any, otherwise returns an empty array. If more than one item with the same key found (like in an array), the result array contains all of them.

```javascript
const du = require('deeputil')

// find 'ddjsobj'
console.log('%j', du.find(testobj, 'djsobj'))
/* will return 
  [{"djsobj":{"ddjsobj":{"dddjsobj":"alright"}}}]
*/
```

```javascript
const du = require('deeputil')

// find 'dgobj'
console.log(du.find(testobj, 'dgobj'))
/* will return 
  [ { dgobj: [ 'pretty', 'cool' ] } ]
*/
```

```javascript
const du = require('deeputil')

// find 'username'
console.log(du.find(testobj, 'username'))
/* will return 
  [ { username: '' }, { username: 'gonzo' } ]
*/
```
