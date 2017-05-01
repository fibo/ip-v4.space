var Component = require('./Component')

var Board = require('./Board')
var Ipify = require('./Ipify')

class Root extends Component {
  constructor (element, dispatch) {
    super(element, dispatch)

    var canvas = document.createElement('canvas')
    element.appendChild(canvas)
    this.component.Board = new Board(canvas, dispatch)

    this.component.Ipify = new Ipify(element, dispatch)
  }
}

module.exports = Root
