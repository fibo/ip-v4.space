var between0And255 = require('./between0And255')

function isValidClassC (subnet) {
  if (!subnet) return false

  var n = subnet.split('.')

  return (n.length === 3) && between0And255(n[0]) && between0And255(n[1]) && between0And255(n[2])
}

module.exports = isValidClassC
