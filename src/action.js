var subnetDataURL = require('./util/subnetDataURL')

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
  var dataURL = subnetDataURL(subnet)

  var shouldFetchData = subnetDataURL(subnet) !== state.dataURL

  if (shouldFetchData) {
    return dispatch(fetchDataRequest({ subnet, dataURL }))
  }
}

var fetchDataRequest = ({ subnet, dataURL }) => (dispatch) => {
  if (!dispatch) dispatch = Function.prototype

  var req = new window.XMLHttpRequest()

  req.onreadystatechange = function (res) {
    if (req.readyState === 4) {
      if (req.status === 200) {
        var data = JSON.parse(req.responseText)

        dispatch({
          type: 'FETCH_DATA_SUCCESS',
          data,
          subnet,
          dataURL
        })
      } else {
        dispatch({
          type: 'FETCH_DATA_FAILURE',
          data,
          subnet,
          dataURL
        })
      }
    }
  }

  req.open('GET', dataURL, true)

  req.send(null)

  dispatch({
    type: 'FETCH_DATA_REQUEST',
    subnet,
    dataURL
  })
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
