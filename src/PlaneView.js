// TODO first goal is to make canvas
// responsive and resizable
function PlaneView () {
  this.id = 'plane-view'
  this.canvas = null
  this.context = null
  this.fillStyle = 'rgb(200,0,0)'
  this.size = 256
  this.unit = this.size / 16
}

function drawCells (cells) {
  var context = this.context
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

function init () {
  var id = this.id
  var size = this.size

  var canvas = this.canvas = document.getElementById(id)
  canvas.height = size
  canvas.width = size

  var context = this.context = canvas.getContext('2d')
  context.fillStyle = this.fillStyle
}

PlaneView.prototype.init = init

module.exports = PlaneView
