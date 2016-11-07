'use strict';
const assert = require('assert')
const du = require('../')

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

const allkeys = ["rname","rid","rdata","username","email","msgs","msgid","msg","sen","time","complx","somearr","langs","js","jsobj","djsobj","ddjsobj","dddjsobj","fun","shell","shellobj","dshellobj","go","gobj","dgobj"]
const allvals = [{"rname":"gonzo"},{"rid":274},{"rdata":[{"username":"","email":"","msgs":[]},{"username":"gonzo","email":"gonzoemail","msgs":[{"msgid":19,"msg":"explore your mind","sen":"anonym","time":""}]}]},{"username":""},{"email":""},{"msgs":[]},{"username":"gonzo"},{"email":"gonzoemail"},{"msgs":[{"msgid":19,"msg":"explore your mind","sen":"anonym","time":""}]},{"msgid":19},{"msg":"explore your mind"},{"sen":"anonym"},{"time":""},{"complx":{"somearr":["wolf","octopus","epsilon"],"langs":{"js":{"jsobj":{"djsobj":{"ddjsobj":{"dddjsobj":"alright"}}},"fun":"for sure"},"shell":{"shellobj":{"dshellobj":"nice"}},"go":{"gobj":{"dgobj":["pretty","cool"]}}}}},{"somearr":["wolf","octopus","epsilon"]},{"langs":{"js":{"jsobj":{"djsobj":{"ddjsobj":{"dddjsobj":"alright"}}},"fun":"for sure"},"shell":{"shellobj":{"dshellobj":"nice"}},"go":{"gobj":{"dgobj":["pretty","cool"]}}}},{"js":{"jsobj":{"djsobj":{"ddjsobj":{"dddjsobj":"alright"}}},"fun":"for sure"}},{"jsobj":{"djsobj":{"ddjsobj":{"dddjsobj":"alright"}}}},{"djsobj":{"ddjsobj":{"dddjsobj":"alright"}}},{"ddjsobj":{"dddjsobj":"alright"}},{"dddjsobj":"alright"},{"fun":"for sure"},{"shell":{"shellobj":{"dshellobj":"nice"}}},{"shellobj":{"dshellobj":"nice"}},{"dshellobj":"nice"},{"go":{"gobj":{"dgobj":["pretty","cool"]}}},{"gobj":{"dgobj":["pretty","cool"]}},{"dgobj":["pretty","cool"]}]

describe(`+ keys()`, () => {
  it('should return an array of all the keys', (done) => {
    assert.deepStrictEqual(du.keys(testobj), allkeys)
    done()
  })
})

describe(`+ vals()`, () => {
  it('should return an array of all the key/val pairs', (done) => {
    assert.deepStrictEqual(du.vals(testobj), allvals)
    done()
  })
})

describe(`+ find() based on the given key`, () => {
  it('should return an array of results if the given key exists in the given obj', (done) => {
    const gores = [{"go":{"gobj":{"dgobj":["pretty","cool"]}}}]
    assert.deepStrictEqual(du.find(testobj, 'go'), gores)
    done()
  })
  it('should return an empty array if the given key not exist in the given obj', (done) => {
    assert.deepStrictEqual(du.find(testobj, 'goz'), [])
    done()
  })
})

describe(`+ find() if invalid key parameter is passed`, () => {
  it('should throw an error if the key parameter is not of type string', (done) => {
    assert.throws(() => {du.find(testobj, {key: 'go'})}, TypeError)
    done()
  })
})
