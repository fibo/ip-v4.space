var fetchData = require('./util/fetchData')

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

exports.clickCell = (cell) => {
  return {
    type: 'CLICK_CELL',
    cell: cell
  }
}

exports.fetchDataFailure = (query) => {
  return {
    type: 'FETCH_DATA_FAILURE',
    query: query
  }
}

exports.fetchDataRequest = (query) => (dispatch) => {
  fetchData(query, dispatch)

  return {
    type: 'FETCH_DATA_REQUEST',
    query: query
  }
}

exports.fetchDataSuccess = (query, data) => {
  return {
    type: 'FETCH_DATA_SUCCESS',
    data: data,
    query: query
  }
}

exports.zoomOut = () => (dispatch, state) => {
  dispatch({ type: 'ZOOM_OUT' })
}
