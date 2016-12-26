var staticProps = require('static-props')

function PlaneView (cells) {
  var id = 'plane-view'

  function getSize () {
    return Math.min(window.innerHeight, window.innerWidth)
  }

  var canvas = document.getElementById(id)
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

  staticProps(this)({
    cells: cells,
    context: context,
    id: id,
    size: getSize,
    unit: getUnit
  })

  // Get a binded version of draw...
  var _draw = draw.bind(this)
  // ...use to draw on start up...
  _draw()

  window.addEventListener('resize', function () {
    setCanvasSize()
    // ...and to redraw on resize.
    _draw()
  })
}

function draw () {
  this.context.translate(0.5, 0.5)

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
  context.fillStyle = 'rgb(200,0,0)'

  var unit = this.unit

  for (var i = 0; i < 16; i++) {
    for (var j = 0; j < 16; j++) {
      var index = i * 16 + j
      if (cells[index] === 1) {
        context.fillRect(i * unit, j * unit, unit, unit)
      }
    }
  }
}

PlaneView.prototype.drawCells = drawCells

module.exports = PlaneView
