var between0And255 = require('./between0And255')

function isValidClassB (subnet) {
  var n = subnet.split('.')

  return between0And255(n[0]) && between0And255(n[1])
}

module.exports = isValidClassB
