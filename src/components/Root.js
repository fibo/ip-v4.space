var Component = require('./Component')

var Board = require('./Board')
var Ipify = require('./Ipify')
var QueryString = require('./QueryString')
var ZoomOutButton = require('./ZoomOutButton')

class Root extends Component {
  constructor (element, dispatch) {
    super(element, dispatch)

    var canvas = document.createElement('canvas')
    element.appendChild(canvas)
    this.component.Board = new Board(canvas, dispatch)

    this.component.Ipify = new Ipify(element, dispatch)

    this.component.QueryString = new QueryString(null, dispatch)

    this.component.ZoomOutButton = new ZoomOutButton(document.getElementById('zoom-out'), dispatch)
  }
}

module.exports = Root
