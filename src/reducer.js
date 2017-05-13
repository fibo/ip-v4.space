var isValidClassA = require('./util/isValidClassA')
var isValidClassB = require('./util/isValidClassB')
var isValidClassC = require('./util/isValidClassC')

var subnetDataURL = require('./util/subnetDataURL')

var emptyTile = () => { return Array(256).fill(-1) }

function reducer (currenState, action) {
  var state = Object.assign({}, currenState)

  const data = action.data
  const query = action.query

  var subnet = state.subnet

  switch (action.type) {
    case 'BOARD_RESIZE':
      state.board.size = action.size

      return state

    case 'CLICK_CELL':
      const cell = action.cell
      const cellNum = cell[1] * 16 + cell[0]

      if (subnet) {
        if ((isValidClassA(subnet)) || (isValidClassB(subnet))) {
          subnet += '.' + cellNum.toString()
        }
      } else {
        subnet = cellNum.toString()
      }

      state.subnet = subnet

      return state

    case 'FETCH_DATA_FAILURE':
      state.board.cells = emptyTile()

      return state

    case 'FETCH_DATA_REQUEST':

      state.dataURL = subnetDataURL(action.query)

      return state

    case 'FETCH_DATA_SUCCESS':
      if ((query === 'master_tile') || isValidClassA(query)) {
        state.board.cells = data.ping.map((val) => { return val === 0 ? 0 : 1 })
      } else {
        state.board.cells = data.ping
      }

      return state

    case 'GET_MY_IP_ADDRESS_SUCCESS':
      state.myIpAddress = action.myIpAddress

      return state

    case 'ZOOM_OUT':
      if (isValidClassA(subnet)) {
        delete state.subnet
      }

      if ((isValidClassB(subnet)) || (isValidClassC(subnet))) {
        state.subnet = subnet.split('.').splice(0, subnet.split('.').length - 1).join('.')
      }

      return state

    default:
      return currenState
  }
}

module.exports = reducer
