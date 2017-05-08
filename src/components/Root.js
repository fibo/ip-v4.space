var Component = require('./Component')

var Board = require('./Board')
var Ipify = require('./Ipify')
var QueryString = require('./QueryString')

class Root extends Component {
  constructor (element, dispatch) {
    super(element, dispatch)

    var canvas = document.createElement('canvas')
    element.appendChild(canvas)
    this.component.Board = new Board(canvas, dispatch)

    this.component.Ipify = new Ipify(element, dispatch)

    this.component.QueryString = new QueryString(null, dispatch)
  }
}

module.exports = Root
