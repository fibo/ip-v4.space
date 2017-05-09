var Component = require('./Component')

var action = require('../action')

var isValidClassA = require('../util/isValidClassA')
var isValidClassB = require('../util/isValidClassB')
var isValidClassC = require('../util/isValidClassC')

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

function fetchData (dispatch, subnet) {
  var query = subnet || 'master_tile'
  dispatch(action.fetchDataRequest(query))
}

class QueryString extends Component {
  constructor (element, dispatch) {
    super(element, dispatch)

    var queryObject = getQueryObject()
    var subnet = queryObject.subnet

    if (isValidClassA(subnet) || isValidClassB(subnet) || isValidClassC(subnet)) {
      dispatch(action.fetchDataRequest(subnet))
    } else {
      delete queryObject.subnet
      save(queryObject)
      dispatch(action.fetchDataRequest('master_tile'))
    }
  }

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

    fetchData(dispatch, subnet)
  }
}

module.exports = QueryString
