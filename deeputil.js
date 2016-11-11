'use strict'
const Readable = require('stream').Readable

function keys (obj, res) {
  res = res || []
  Object.keys(obj).forEach((k) => {
    if (typeof obj[k] === 'object') {
      if (!(/^\d+$/.test(k)) && res.indexOf(k) === -1) res.push(k)
      res = keys(obj[k], res)
    } else {
      if (!(/^\d+$/.test(k)) && res.indexOf(k) === -1) res.push(k)
    }
  })
  return res
}

function vals (obj, res) {
  res = res || []
  Object.keys(obj).forEach((k) => {
    if (typeof obj[k] === 'object') {
      if (!(/^\d+$/.test(k))) res.push({[k]: obj[k]})
      res = vals(obj[k], res)
    } else {
      if (!(/^\d+$/.test(k))) res.push({[k]: obj[k]})
    }
  })
  return res
}

function find (obj, key, res) {
  res = res || []
  if (typeof key !== 'string') throw new TypeError(`'key' parameter must be of type string.`)
  Object.keys(obj).forEach((k) => {
    if (typeof obj[k] === 'object') {
      if (!(/^\d+$/.test(k)) && (k === key)) res.push({[k]: obj[k]})
      res = find(obj[k], key, res)
    } else {
      if (!(/^\d+$/.test(k)) && (k === key)) res.push({[k]: obj[k]})
    }
  })
  return res
}

function key (obj) {
  return Object.keys(obj)[0]
}

class Rstream extends Readable {
  constructor (opt) {
    super(opt)
    if (typeof opt.obj !== 'object') throw new TypeError(`'obj' parameter must be of type object.`)
    this.objectMode = true
    this._obj = opt.obj
  }
  _read () {
    vals(this._obj).forEach((i) => {
      if (i === null) {
        process.nextTick(() => this.emit('error', new Error('null object')))
        return
      } else {
        var dat = {key: key(i), val: i[key(i)]}
        this.push(dat)
      }
    })
    this.push(null)
  }
}

function createRstream (obj) {
  return new Rstream({obj: obj})
}

module.exports = {
  keys: keys,
  vals: vals,
  find: find,
  key: key,
  stream: createRstream
}
