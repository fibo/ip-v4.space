var isValidClassA = require('./util/isValidClassA')
var isValidClassB = require('./util/isValidClassB')
var isValidClassC = require('./util/isValidClassC')

var emptyTile = () => { return Array(256).fill(-1) }

function reducer (currenState, action) {
  var state = Object.assign(currenState)

  var data = action.data
  var query = action.query

  var subnet = state.subnet

  switch (action.type) {
    case 'BOARD_RESIZE':
      state.board.size = action.size
      break

    case 'CLICK_CELL':
      var cell = action.cell
      var cellNum = cell[1] * 16 + cell[0]

      if (subnet) {
        if ((isValidClassA(subnet)) || (isValidClassB(subnet))) {
          subnet += '.' + cellNum.toString()
        }
      } else {
        subnet = cellNum.toString()
      }

      state.subnet = subnet

      break

    case 'FETCH_DATA_FAILURE':
      state.board.cells = emptyTile()

      break

    case 'FETCH_DATA_SUCCESS':
      if ((query === 'master_tile') || isValidClassA(query)) {
        state.board.cells = data.ping.map((val) => { return val === 0 ? 0 : 1 })
      } else {
        state.board.cells = data.ping
      }

      break

    case 'GET_MY_IP_ADDRESS_SUCCESS':
      state.myIpAddress = action.myIpAddress

      break

    case 'ZOOM_OUT':
      if (isValidClassA(subnet)) {
        delete state.subnet
      }

      if ((isValidClassB(subnet)) || (isValidClassC(subnet))) {
        state.subnet = subnet.split('.').splice(0, subnet.split('.').length - 1).join('.')
      }

      break

  }

  return state
}

module.exports = reducer
