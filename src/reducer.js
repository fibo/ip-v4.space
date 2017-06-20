var isValidClassA = require('./util/isValidClassA')
var isValidClassB = require('./util/isValidClassB')
var isValidClassC = require('./util/isValidClassC')

function reducer (currenState, action) {
  var state = Object.assign({}, currenState)

  switch (action.type) {
    case 'BOARD_RESIZE':
      state.board.size = action.size

      return state

    case 'FETCH_DATA_FAILURE':
      return state

    case 'FETCH_DATA_REQUEST':
      state.dataURL = action.dataURL

      return state

    case 'FETCH_DATA_SUCCESS':
      state.subnet = action.subnet
      state.data = action.data

      if (isValidClassB(state.subnet)) {
        // TODO fix netvision scanner, one class C subnet is missing.
        if (state.data[0].subnet !== state.subnet + '.0') {
          state.data.unshift({
            subnet: state.subnet + '.0',
            ping: 0
          })
        }
      }

      return state

    case 'GET_MY_IP_ADDRESS_SUCCESS':
      state.myIpAddress = action.myIpAddress

      return state

    case 'ZOOM_IN':
      var cell = action.cell
      var cellNum = cell[1] * 16 + cell[0]

      if (state.subnet) {
        if ((isValidClassA(state.subnet)) || (isValidClassB(state.subnet))) {
          state.subnet += '.' + cellNum.toString()
        }
      } else {
        state.subnet = cellNum.toString()
      }

      return state

    case 'ZOOM_OUT':
      if (isValidClassA(state.subnet)) {
        delete state.subnet
      }

      if ((isValidClassB(state.subnet)) || (isValidClassC(state.subnet))) {
        state.subnet = state.subnet.split('.').splice(0, state.subnet.split('.').length - 1).join('.')
      }

      return state

    default:
      return currenState
  }
}

module.exports = reducer
