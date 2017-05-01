var logo = require('../util/logo')
var Board = require('../components/Board')

function getInitialState () {
  return {
    myIpAddress: null,
    board: {
      cells: logo,
      size: Board.getSize()
    }
  }
}

module.exports = getInitialState
