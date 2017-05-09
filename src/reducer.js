var isValidClassA = require('./util/isValidClassA')
var isValidClassB = require('./util/isValidClassB')
var isValidClassC = require('./util/isValidClassC')

function reducer (currenState, action) {
  var state = Object.assign(currenState)

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

    case 'FOCUS_ON_SUBNET':
      state.subnet = action.subnet
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
