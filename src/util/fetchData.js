var subnetDataURL = require('./subnetDataURL')

function fetchData (query) {
  var URL
  var req = new window.XMLHttpRequest()

  if (query === 'master_tile') {
    URL = '/data/master_tile.json'
  } else {
    URL = subnetDataURL(query)
  }

  req.onload = function (res) {
    var data = JSON.parse(req.responseText)

    console.log(data)
  }

  req.error = function () {
    console.error('could not get data')
  }

  req.open('GET', URL, true)

  req.send()
}

module.exports = fetchData
