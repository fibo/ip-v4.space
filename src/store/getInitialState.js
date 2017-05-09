var logo = require('../util/logo')
var Board = require('../components/Board')

function getInitialState () {
  return {
    board: {
      cells: logo,
      size: Board.getSize()
    },
    myIpAddress: null,
    subnet: undefined
  }
}

module.exports = getInitialState
