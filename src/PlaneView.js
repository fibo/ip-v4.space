var staticProps = require('static-props')

function PlaneView (cells) {
  function getSize () {
    return Math.min(window.innerHeight, window.innerWidth)
  }

  var canvas = document.createElement('canvas')
  document.body.appendChild(canvas)

  var context = canvas.getContext('2d')

  function getUnit () {
    var border = 1
    var size = getSize()
    return (size - 2 * border) / 16
  }

  function setCanvasSize () {
    var size = getSize()
    canvas.height = size
    canvas.width = size
  }

  setCanvasSize()

  var selectedCell = null

  function getSelectedCell () {
    return selectedCell
  }

  staticProps(this)({
    cells: cells,
    context: context,
    selectedCell: getSelectedCell,
    size: getSize,
    unit: getUnit
  })

  // Get a binded version of draw, draw on start up.
  var _draw = draw.bind(this)
  _draw()

  // Draw on resize.
  window.addEventListener('resize', function () {
    setCanvasSize()
    _draw()
  })

  var cursormove = 'touchmove' in document ? 'touchmove' : 'mousemove'

  canvas.addEventListener(cursormove, function (evt) {
    var rect = canvas.getBoundingClientRect()

    var x = evt.clientX - rect.left
    var y = evt.clientY - rect.top

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
    if (selectedCell.t > 10) _draw()
  })

  var cursorleave = 'touchleave' in document ? 'touchleave' : 'mouseleave'

  canvas.addEventListener(cursorleave, function (evt) {
    selectedCell = null
    _draw()
  })
}

function draw () {
  var size = this.size
  this.context.clearRect(0, 0, size, size)

  // Incredible, it works! But how?
  // Where do the following functions take the `this` context!?
  // De Mysteriis Dom JavaScript
  // https://www.youtube.com/watch?v=qcS0CVJ1KPg
  drawCells()
  drawGrid()
}

PlaneView.prototype.draw = draw

function drawGrid () {
  var context = this.context
  var size = this.size
  var unit = this.unit

  context.lineWidth = 1

  for (var i = 0; i <= size; i += unit) {
    context.strokeStyle = '#aeaeae'
    context.lineWidth = 1

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

PlaneView.prototype.drawGrid = drawGrid

function drawCells () {
  var cells = this.cells
  var context = this.context
  var selectedCell = this.selectedCell
  var unit = this.unit

  var color = 'rgb(200, 100, 100)'
  var highlighColor = 'rgb(200, 0, 0)'

  context.shadowBlur = 10

  for (var i = 0; i < 16; i++) {
    for (var j = 0; j < 16; j++) {
      var isSelectedCell = selectedCell && (selectedCell.i === i) && (selectedCell.j === j)

      if (isSelectedCell) {
        context.fillStyle = highlighColor
        context.shadowColor = highlighColor
      } else {
        context.fillStyle = color
        context.shadowColor = color
      }

      var index = j * 16 + i

      if (cells[index] === 1) {
        context.fillRect(i * unit, j * unit, unit, unit)
      } else {
        if (isSelectedCell) {
          context.strokeStyle = highlighColor
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

  // Remove shadow.
  context.shadowBlur = 0
  context.shadowColor = 'transparent'
}

PlaneView.prototype.drawCells = drawCells

module.exports = PlaneView
