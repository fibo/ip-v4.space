var isValidClassA = require('./util/isValidClassA')
var isValidClassB = require('./util/isValidClassB')

function reducer (currenState, action) {
  var state = Object.assign(currenState)

  switch (action.type) {
    case 'BOARD_RESIZE':
      state.board.size = action.size
      break

    case 'ENTER_CELL':
      var cell = action.cell
      var cellNum = cell[1] * 16 + cell[0]

      var subnet = state.subnet

      if (subnet) {
        if ((isValidClassA(subnet)) || (isValidClassB(subnet))) {
          subnet += '.' + cellNum.toString()
        }
      } else {
        subnet = cellNum.toString()
      }

      state.subnet = subnet

      break

    case 'FOCUS_ON_SUBNET':
      state.subnet = action.ubnet
      break

    case 'GET_MY_IP_ADDRESS_SUCCESS':
      state.myIpAddress = action.myIpAddress
      break
  }

  return state
}

module.exports = reducer
