var Component = require('./Component')

var Board = require('./Board')

var createElementNS = require('../util/createElementNS')

var disabledColor = 'silver'
var enabledColor = '#454545'

class ZoomOutButton extends Component {
  constructor (element, dispatch) {
    super(element, dispatch)

    element.setAttribute('viewBox', '0 0 2048 2048')

    var size = Board.getUnit().toString()

    element.setAttribute('height', size)
    element.setAttribute('width', size)

    var path = createElementNS('path')
    path.setAttribute('d', 'M1540 1023q0-27-18-45l-362-362-91-91q-18-18-45-18t-45 18l-91 91-362 362q-18 18-18 45t18 45l91 91q18 18 45 18t45-18l189-189v502q0 26 19 45t45 19h128q26 0 45-19t19-45v-502l189 189q19 19 45 19t45-19l91-91q18-18 18-45zm252 1q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z')
    element.appendChild(path)

    // Start disabled.
    element.setAttribute('fill', disabledColor)
    this.disabled = true

    element.addEventListener('click', (event) => {
      if (this.disabled) return

      dispatch({ type: 'ZOOM_OUT' })
    })
  }

  disable () {
    var element = this.element
    element.setAttribute('fill', disabledColor)
    this.disabled = true
  }

  enable () {
    var element = this.element
    element.setAttribute('fill', enabledColor)
    this.disabled = false
  }

  render (state) {
    var previouslyDisabled = this.disabled
    var subnet = state.subnet
    var level = 0

    if (subnet) {
      level = subnet.split('.').length
    }

    // Disable button when the whole viewport is visualized.
    var currentlyDisabled = (level === 0)

    // Nothing to do if internal state did not changed.
    if (previouslyDisabled === currentlyDisabled) return

    if (currentlyDisabled) {
      this.disable()
    } else {
      this.enable()
    }
  }
}

module.exports = ZoomOutButton
