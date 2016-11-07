'use strict'

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

module.exports = {
  keys: keys,
  vals: vals,
  find: find
}
