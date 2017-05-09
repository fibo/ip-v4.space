var Component = require('./Component')

var Board = require('./Board')

var disabledColor = 'silver'
var enabledColor = '#454545'

class ZoomOutButton extends Component {
  constructor (element, dispatch) {
    super(element, dispatch)

    var size = Board.getUnit().toString()

    element.setAttribute('height', size)
    element.setAttribute('width', size)

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
