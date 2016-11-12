'use strict';
const assert = require('assert')
const du = require('../')

var testobj = {
  "rname": "gonzo",
  "rid": 274,
  "rdata": [
    {
      "username": "waldo",
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
const allvals = [{"rname":"gonzo"},{"rid":274},{"rdata":[{"username":"waldo","email":"","msgs":[]},{"username":"gonzo","email":"gonzoemail","msgs":[{"msgid":19,"msg":"explore your mind","sen":"anonym","time":""}]}]},{"username":"waldo"},{"email":""},{"msgs":[]},{"username":"gonzo"},{"email":"gonzoemail"},{"msgs":[{"msgid":19,"msg":"explore your mind","sen":"anonym","time":""}]},{"msgid":19},{"msg":"explore your mind"},{"sen":"anonym"},{"time":""},{"complx":{"somearr":["wolf","octopus","epsilon"],"langs":{"js":{"jsobj":{"djsobj":{"ddjsobj":{"dddjsobj":"alright"}}},"fun":"for sure"},"shell":{"shellobj":{"dshellobj":"nice"}},"go":{"gobj":{"dgobj":["pretty","cool"]}}}}},{"somearr":["wolf","octopus","epsilon"]},{"langs":{"js":{"jsobj":{"djsobj":{"ddjsobj":{"dddjsobj":"alright"}}},"fun":"for sure"},"shell":{"shellobj":{"dshellobj":"nice"}},"go":{"gobj":{"dgobj":["pretty","cool"]}}}},{"js":{"jsobj":{"djsobj":{"ddjsobj":{"dddjsobj":"alright"}}},"fun":"for sure"}},{"jsobj":{"djsobj":{"ddjsobj":{"dddjsobj":"alright"}}}},{"djsobj":{"ddjsobj":{"dddjsobj":"alright"}}},{"ddjsobj":{"dddjsobj":"alright"}},{"dddjsobj":"alright"},{"fun":"for sure"},{"shell":{"shellobj":{"dshellobj":"nice"}}},{"shellobj":{"dshellobj":"nice"}},{"dshellobj":"nice"},{"go":{"gobj":{"dgobj":["pretty","cool"]}}},{"gobj":{"dgobj":["pretty","cool"]}},{"dgobj":["pretty","cool"]}]

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
  it('should return the value if only one found', (done) => {
    const go_res = {"gobj":{"dgobj":["pretty","cool"]}}
    //const gores = { gobj: { dgobj: [ 'pretty', 'cool' ] } }
    assert.deepStrictEqual(du.find(testobj, 'go'), go_res)
    done()
  })
  it('should return an array of values if more than one found', (done) => {
    const username_res = ["waldo","gonzo"]
    //const gores = { gobj: { dgobj: [ 'pretty', 'cool' ] } }
    assert.deepStrictEqual(du.find(testobj, 'username'), username_res)
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

describe(`+ key()`, () => {
  it('should return the property name of the given object', (done) => {
    var o = {name: 'foo'}
    var o1 = {colors: ['gray', 'blue']}
    assert.strictEqual(du.key(o), 'name')
    assert.strictEqual(du.key(o1), 'colors')
    done()
  })
})

describe(`+ stream()`, () => {
  it('should stream all key/val pairs', (done) => {
    var itemFromObj_shell = {
      "shellobj": {
        "dshellobj": "nice"
      }
    }
    var itemFromObj_dgobj = ["pretty", "cool"]

    du.stream(testobj).on('error', (err) => {
      assert.ifError(err)
    }).on('data', (dat) => {
      assert.equal(typeof dat, 'object')
      if (dat.key === 'shell')
        assert.deepStrictEqual(dat.val, itemFromObj_shell)
      if (dat.key === 'dgobj') {
        assert.deepStrictEqual(dat.val, itemFromObj_dgobj)
      }
    })  
    done()
  })
})
