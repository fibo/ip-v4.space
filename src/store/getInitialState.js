var logo = require('../util/logo')
var Board = require('../components/Board')
var QueryString = require('../components/QueryString')

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
