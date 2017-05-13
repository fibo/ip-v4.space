const classA = require('./classA')
const classB = require('./classB')
const isValidClassA = require('./isValidClassA')
const isValidClassB = require('./isValidClassB')
const isValidClassC = require('./isValidClassC')

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
