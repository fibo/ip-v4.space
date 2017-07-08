var Component = require('./Component')

var Board = require('./Board')
var Ipify = require('./Ipify')
var QueryString = require('./QueryString')
var ZoomOutButton = require('./ZoomOutButton')

var createElementNS = require('../util/createElementNS')

class Root extends Component {
  constructor (element, dispatch) {
    super(element, dispatch)

    this.component.Ipify = new Ipify(element, dispatch)

    this.component.QueryString = new QueryString(null, dispatch)

    var canvas = createElementNS('svg')
    element.appendChild(canvas)
    this.component.Board = new Board(canvas, dispatch)

    var zoomOut = createElementNS('svg')
    element.appendChild(zoomOut)
    this.component.ZoomOutButton = new ZoomOutButton(zoomOut, dispatch)
  }
}

module.exports = Root
