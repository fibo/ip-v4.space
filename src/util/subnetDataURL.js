var classA = require('./classA')
var classB = require('./classB')
var isValidClassA = require('./isValidClassA')
var isValidClassB = require('./isValidClassB')
var isValidClassC = require('./isValidClassC')

function subnetDataURL (subnet) {
  if (subnet) {
    if (isValidClassA(subnet) || isValidClassB(subnet)) {
      return '/data/' + classA(subnet) + '/' + subnet + '.json'
    }

    if (isValidClassC(subnet)) {
      return '/data/' + classA(subnet) + '/' + classB(subnet) + '.json'
    }
  } else {
    return '/data/master_tile.json'
  }
}

module.exports = subnetDataURL
