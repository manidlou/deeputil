'use strict'
const stream = require('stream')

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

function Rstream (obj) {
  const Rstrm = new stream.Readable({
    objectMode: true,
    read: function () {
      vals(obj).forEach((i) => {
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
  })
  return Rstrm
}

function strm (obj) {
  return new Rstream(obj)
}

module.exports = {
  keys: keys,
  vals: vals,
  find: find,
  key: key,
  stream: strm
}
