const subnetDataURL = require('./util/subnetDataURL')

exports.boardDraw = () => {
  return {
    type: 'BOARD_DRAW'
  }
}

exports.boardResize = (size) => {
  return {
    type: 'BOARD_RESIZE',
    size: size
  }
}

exports.fetchDataIfNeeded = (subnet) => (dispatch, state) => {
  if (shouldFetchData(subnet, state)) {
    return dispatch(fetchDataRequest(subnet))
  }
}

const fetchDataRequest = (query) => (dispatch) => {
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
        const data = JSON.parse(req.responseText)

        dispatch({
          type: 'FETCH_DATA_SUCCESS',
          data: data,
          query: query
        })
      } else {
        dispatch({
          type: 'FETCH_DATA_FAILURE',
          query: query
        })
      }
    }
  }

  req.open('GET', URL, true)

  req.send(null)

  dispatch({
    type: 'FETCH_DATA_REQUEST',
    query: query
  })
}

const shouldFetchData = (query, state) => {
  return subnetDataURL(query) !== state.dataURL
}

exports.zoomIn = (cell) => {
  return {
    type: 'ZOOM_IN',
    cell: cell
  }
}

exports.zoomOut = () => (dispatch, state) => {
  dispatch({ type: 'ZOOM_OUT' })
}
