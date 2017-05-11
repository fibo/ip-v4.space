var logo = require('../util/logo')
var Board = require('../components/Board')

function getInitialState () {
  return {
    board: {
      cells: logo,
      size: Board.getSize()
    },
    myIpAddress: null,
    subnet: undefined,
    dataURL: null
  }
}

module.exports = getInitialState
