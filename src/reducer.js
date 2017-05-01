function reducer (currenState, action) {
  var state = Object.assign(currenState)

  switch (action.type) {
    case 'BOARD_RESIZE':
      state.board.size = action.size
      break

    case 'GET_MY_IP_ADDRESS_SUCCESS':
      state.myIpAddress = action.myIpAddress
      break
  }

  return state
}

module.exports = reducer
