var staticProps = require('static-props')

var Component = require('./Component')

function getSize () {
  return Math.min(window.innerHeight, window.innerWidth)
}

class Board extends Component {
  constructor (canvas, dispatch) {
    super(canvas, dispatch)

    var size = this.size = getSize()

    canvas.height = size
    canvas.width = size

    var context = canvas.getContext('2d')

    var selectedCell = null

    function getSelectedCell () {
      return selectedCell
    }

    function getUnit () {
      var border = 1
      return (this.size - 2 * border) / 16
    }

    // Attributes.

    staticProps(this)({
      canvas: canvas,
      context: context,
      selectedCell: getSelectedCell,
      unit: getUnit
    })

    // Events.

    window.addEventListener('resize', function () {
      dispatch({
        type: 'BOARD_RESIZE',
        size: getSize()
      })
    })

    var cursormove = 'touchmove' in document ? 'touchmove' : 'mousemove'

    canvas.addEventListener(cursormove, function (event) {
      var rect = canvas.getBoundingClientRect()

      var x = event.clientX - rect.left
      var y = event.clientY - rect.top

      var size = getSize()

      var i = Math.floor(16 * x / size)
      var j = Math.floor(16 * y / size)

      if (selectedCell === null) selectedCell = { t: 0 }

      if ((i === selectedCell.i) && (j === selectedCell.j)) {
        selectedCell.t = selectedCell.t + 1
      } else {
        selectedCell.i = i
        selectedCell.j = j
      }

      // Redraw only if selectedCell changed, and cursor position is
      // inside it for few time.
      if (selectedCell.t > 10) dispatch({ type: 'BOARD_DRAW' })
    })

    var cursorleave = 'touchleave' in document ? 'touchleave' : 'mouseleave'

    canvas.addEventListener(cursorleave, function (event) {
      selectedCell = null
      dispatch({ type: 'BOARD_DRAW' })
    })
  }

  drawCells (state) {
    var cells = state.board.cells
    var context = this.context
    var selectedCell = this.selectedCell
    var unit = this.unit

    var color = 'rgb(200, 100, 100)'
    var highlightedColor = 'rgb(200, 0, 0)'

    context.shadowBlur = 10

    for (var i = 0; i < 16; i++) {
      for (var j = 0; j < 16; j++) {
        var isSelectedCell = selectedCell && (selectedCell.i === i) && (selectedCell.j === j)

        if (isSelectedCell) {
          context.fillStyle = highlightedColor
          context.shadowColor = highlightedColor
        } else {
          context.fillStyle = color
          context.shadowColor = color
        }

        var index = j * 16 + i

        if (cells[index] === 1) {
          context.fillRect(i * unit, j * unit, unit, unit)
        } else {
          if (isSelectedCell) {
            context.strokeStyle = highlightedColor
            context.lineWidth = 2

            // Draw a square.
            context.beginPath()
            context.moveTo(i * unit + 1, j * unit + 1)
            context.lineTo((i + 1) * unit - 1, j * unit + 1)
            context.lineTo((i + 1) * unit - 1, (j + 1) * unit - 1)
            context.lineTo(i * unit + 1, (j + 1) * unit - 1)
            context.lineTo(i * unit + 1, j * unit + 1)
            context.stroke()
          }
        }
      }
    }
  }

  drawGrid () {
    var context = this.context
    var size = this.size
    var unit = this.unit

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

  render (state) {
    var boardSize = state.board.size

    var canvas = this.canvas
    var size = this.size

    this.context.clearRect(0, 0, size, size)

    // Resize canvas if necessary.

    if (size !== boardSize) {
      canvas.height = boardSize
      canvas.width = boardSize

      this.size = boardSize
    }

    this.drawGrid()
    this.drawCells(state)
  }
}

Board.getSize = getSize

module.exports = Board
