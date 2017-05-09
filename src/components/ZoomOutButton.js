var Component = require('./Component')

class ZoomOutButton extends Component {
  constructor (element, dispatch) {
    super(element, dispatch)

    element.setAttribute('height', '20')
    element.setAttribute('width', '20')
  }
}

module.exports = ZoomOutButton
