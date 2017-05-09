var classA = require('./classA')

function subnetDataURL (subnet) {
  return '/data/' + classA(subnet) + '/' + subnet + '.json'
}

module.exports = subnetDataURL
