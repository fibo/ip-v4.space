function JSONDataURL (subnet) {
  var a = subnet.split('.')[0]

  return '/data/' + a + '/' + subnet + '.json'
}

module.exports = JSONDataURL
