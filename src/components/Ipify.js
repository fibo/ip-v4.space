var Component = require('./Component')

class Ipify extends Component {
  constructor (element, dispatch) {
    super(element, dispatch)

    function getMyIpAddress (json) {
      dispatch({
        type: 'GET_MY_IP_ADDRESS_SUCCESS',
        myIpAddress: json.ip
      })
    }

    window.getMyIpAddress = getMyIpAddress

    var src = 'https://api.ipify.org?format=jsonp&callback=' + getMyIpAddress.name

    this.src = src

    this.scriptCreated = false
  }

  createScript () {
    var element = this.element
    var src = this.src

    var script = document.createElement('script')
    script.src = src
    element.appendChild(script)

    this.scriptCreated = true
  }

  render (state) {
    if (this.scriptCreated) return

    if (!state.myIpAddress) this.createScript()
  }
}

module.exports = Ipify
