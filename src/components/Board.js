var Component = require('./Component')

function getSize () {
  return Math.min(window.innerHeight, window.innerWidth)
}

class Board extends Component {
  constructor (canvas, dispatch) {
    super(canvas, dispatch)

    this.canvas = canvas

    var size = getSize()
    this.size = size
    console.log(size)

    canvas.height = size
    canvas.width = size

    this.context = canvas.getContext('2d')

    window.addEventListener('resize', function () {
      dispatch({
        type: 'BOARD_RESIZE',
        size: getSize()
      })
    })
  }

  drawGrid () {
    var context = this.context
    var size = this.size
    var unit = this.getUnit()

    context.lineWidth = 1
    context.strokeStyle = '#aeaeae'

    for (var i = 0; i <= size; i += unit) {
      context.beginPath()
      context.moveTo(i, 0)
      context.lineTo(i, size)
      context.stroke()

      context.beginPath()
      context.moveTo(0, i)
      context.lineTo(size, i)
      context.stroke()
    }
  }

  getUnit () {
    var border = 1
    var size = this.size
    return (size - 2 * border) / 16
  }

  render (state) {
    var boardSize = state.board.size

    var canvas = this.canvas
    var size = this.size

    // Resize canvas if necessary.

    if (size !== boardSize) {
      canvas.height = boardSize
      canvas.width = boardSize

      this.size = boardSize
    }

    this.drawGrid()
  }
}

Board.getSize = getSize

module.exports = Board
