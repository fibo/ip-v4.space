var between0And255 = require('./between0And255')

function isValidClassA (subnet) {
  if (!subnet) return false

  var n = subnet.split('.')

  return (n.length === 1) && between0And255(n[0])
}

module.exports = isValidClassA

