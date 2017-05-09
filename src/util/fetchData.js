var subnetDataURL = require('./subnetDataURL')

var action = require('../action')

function fetchData (query, dispatch) {
  if (!dispatch) dispatch = Function.prototype

  var URL
  var req = new window.XMLHttpRequest()

  if (query === 'master_tile') {
    URL = '/data/master_tile.json'
  } else {
    URL = subnetDataURL(query)
  }

  req.onreadystatechange = function (res) {
    if (req.readyState === 4) {
      if (req.status === 200) {
        var data = JSON.parse(req.responseText)
        dispatch(action.fetchDataSuccess(query, data))
      } else {
        dispatch(action.fetchDataFailure(query))
      }
    }
  }

  req.open('GET', URL, true)

  req.send(null)
}

module.exports = fetchData
