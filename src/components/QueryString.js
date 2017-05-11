var Component = require('./Component')

var action = require('../action')

var isValidClassA = require('../util/isValidClassA')
var isValidClassB = require('../util/isValidClassB')
var isValidClassC = require('../util/isValidClassC')

var parentClassB = require('../util/parentClassB')

function buildQueryString (queryObject) {
  var queryString = '?'

  Object.keys(queryObject).forEach(function (key, index) {
    var value = queryObject[key]

    if (typeof value !== 'undefined') {
      if (index > 0) queryString += '&'
      queryString += key + '=' + value
    }
  })

  if (queryString === '?') return null
  else return queryString
}

function getQueryObject () {
  var queryObject = {}
  var queryString = window.location.search

  if (queryString === '') return queryObject

  var keyValues = window.location.search.substr(1).split('&')

  keyValues.forEach(function (keyValue) {
    var kv = keyValue.split('=')
    queryObject[kv[0]] = kv[1]
  })

  return queryObject
}

var hasHistory = (window.history && (typeof window.history.pushState === 'function'))

function save (queryObject) {
  var nextURL = window.location.origin
  var queryString = buildQueryString(queryObject)
  if (queryString) nextURL += '/' + queryString

  if (hasHistory) {
    window.history.replaceState(null, null, nextURL)
  } else {
    window.location.href = nextURL
  }
}

class QueryString extends Component {
  render (state, dispatch) {
    var queryObject = getQueryObject()
    var nothingChanged = true
    var subnet = state.subnet

    if (subnet !== queryObject.subnet) {
      queryObject.subnet = subnet
      nothingChanged = false
    }

    if (nothingChanged) return

    save(queryObject)

    if (subnet) {
      if (isValidClassA(subnet) || isValidClassB(subnet)) {
        dispatch(action.fetchDataRequest(subnet))
      } else {
        if (isValidClassC(subnet)) {
          dispatch(action.fetchDataRequest(parentClassB(subnet)))
        }
      }
    } else {
      dispatch(action.fetchDataRequest('master_tile'))
    }
  }
}

module.exports = QueryString
