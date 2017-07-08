var staticProps = require('static-props')

// var action = require('../action')

var Component = require('./Component')

var classA = require('../util/classA')
var classB = require('../util/classB')

var createElementNS = require('../util/createElementNS')

var border = 1

function getSize () {
  return Math.min(window.innerHeight, window.innerWidth)
}

function getUnit () {
  return (getSize() - 2 * border) / 16
}

class Board extends Component {
  constructor (canvas, dispatch) {
    super(canvas, dispatch)

    var size = this.size = getSize()

    canvas.setAttributeNS(null, 'width', size)
    canvas.setAttributeNS(null, 'height', size)

    // TODO Remove this, just to see something
    var rect = createElementNS('rect')
    rect.setAttributeNS(null, 'width', 100)
    rect.setAttributeNS(null, 'height', 100)
    rect.setAttributeNS(null, 'fill', '#f06')
    canvas.appendChild(rect)

    /*
    var context = canvas.getContext('2d')
    // context.translate(0.5, 0.5)

    var selectedCell = null

    function getSelectedCell () {
      return selectedCell
    }

    // Attributes.

    staticProps(this)({
      border: border,
      canvas: canvas,
      context: context,
      selectedCell: getSelectedCell,
      unit: getUnit
    })

    // Events.

    window.addEventListener('resize', () => {
      var size = getSize()

      dispatch(action.boardResize(size))
    })

    this.clickDisabled = false

    canvas.addEventListener('click', (event) => {
      if (this.clickDisabled) return

      var rect = canvas.getBoundingClientRect()

      var x = event.clientX - rect.left
      var y = event.clientY - rect.top

      var size = getSize()

      var i = Math.floor(16 * x / size)
      var j = Math.floor(16 * y / size)

      dispatch(action.zoomIn([i, j]))
    })

    var cursormove = 'touchmove' in document ? 'touchmove' : 'mousemove'

    canvas.addEventListener(cursormove, (event) => {
      var rect = canvas.getBoundingClientRect()

      var x = event.clientX - rect.left
      var y = event.clientY - rect.top

      var size = getSize()

      var i = Math.floor(16 * x / size)
      var j = Math.floor(16 * y / size)

      if (selectedCell === null) selectedCell = {}

      if ((i !== selectedCell.i) || (j !== selectedCell.j)) {
        selectedCell.i = i
        selectedCell.j = j
        dispatch(action.boardDraw())
      }
    })

    var cursorleave = 'touchleave' in document ? 'touchleave' : 'mouseleave'

    canvas.addEventListener(cursorleave, (event) => {
      selectedCell = null
      dispatch(action.boardDraw())
    })
  */
  }

  drawCells (state) {
    var border = this.border
    var context = this.context
    var selectedCell = this.selectedCell
    var unit = this.unit

    var subUnit = (unit - border) / 16
    subUnit = Math.round(100 * subUnit) / 100 // Round to 2 decimals.

    var data = state.data
    var myIpAddress = state.myIpAddress
    var subnet = state.subnet
    var level = 0

    var indexB

    if (subnet) {
      level = subnet.split('.').length
    }

    if (level === 3) {
      indexB = parseInt(subnet.split('.')[2])
    }

    // Disable click when maximum zoom level is reached.
    this.clickDisabled = (level === 3)

    var color = 'rgb(200, 100, 100)'
    var highlightedColor = 'rgb(200, 0, 0)'
    var myCellColor = 'rgb(0, 200, 0)'

    var myCellNum

    // myIpAddress = 10.20.30.40 |
    //                           | => myCellNum = 20
    // level = 1                 |
    //
    // but it should be displayed only if subnet is the same.
    if (myIpAddress) {
      switch (level) {
        case 0:
          myCellNum = parseInt(classA(myIpAddress))
          break

        case 1:
          if (classA(myIpAddress) === subnet) {
            myCellNum = parseInt(myIpAddress.split('.')[1])
          }
          break

        case 2:
          if (classB(myIpAddress) === subnet) {
            myCellNum = parseInt(myIpAddress.split('.')[2])
          }
          break
      }
    }

    for (var i = 0; i < 16; i++) {
      for (var j = 0; j < 16; j++) {
        context.fillStyle = color
        context.shadowColor = color
        context.strokeStyle = color
        context.shadowBlur = 0

        var isSelectedCell = selectedCell && (selectedCell.i === i) && (selectedCell.j === j)
        var index = j * 16 + i
        var isMyCell = myCellNum === index

        if (isSelectedCell) {
          context.fillStyle = highlightedColor
          context.shadowColor = highlightedColor
          context.strokeStyle = highlightedColor
        }

        if (isMyCell) {
          context.fillStyle = myCellColor
          context.shadowColor = myCellColor
          context.strokeStyle = myCellColor
        }

        if (level === 3) {
          if (data[indexB] && data[indexB].ping && data[indexB].ping[index] === 1) {
            context.fillRect(border + i * unit, border + j * unit, unit - border, unit - border)
          }
        } else {
          for (var a = 0; a < 16; a++) {
            for (var b = 0; b < 16; b++) {
              var subIndex = b * 16 + a

              if (data[index] && data[index].ping && data[index].ping[subIndex] === 1) {
                context.lineWidth = 1
                context.shadowBlur = 0
                context.fillRect(border + i * unit + a * subUnit, border + j * unit + b * subUnit, subUnit, subUnit)
              }
            }
          }
        }

        if (isSelectedCell || isMyCell) {
          context.lineWidth = 2
          context.shadowBlur = 10

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

  drawGrid () {
    var border = this.border
    var context = this.context
    var size = this.size
    var unit = this.unit

    context.lineWidth = 1
    context.shadowBlur = 0
    context.strokeStyle = '#aeaeae'

    for (var i = border; i <= size; i += unit) {
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

staticProps(Board)({
  getSize: () => getSize,
  getUnit: () => getUnit
})

module.exports = Board
