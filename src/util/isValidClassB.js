var between0And255 = require('./between0And255')

function isValidClassB (subnet) {
  if (!subnet) return false

  var n = subnet.split('.')

  return (n.length === 2) && between0And255(n[0]) && between0And255(n[1])
}

module.exports = isValidClassB
