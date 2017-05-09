var Root = require('./components/Root')
var getInitialState = require('./store/getInitialState')
var reducer = require('./reducer')

var fetchData = require('./util/fetchData')
fetchData('master_tile')

/**
 * App loader.
 *
 * window.addEventListener('load', app(state))
 */

function app (initialState) {
  return function () {
    var currentState = initialState || getInitialState()

    var render = Function.prototype

    function dispatch (action) {
      if (typeof action === 'function') {
        return action(dispatch, currentState)
      }

      if (process.env.NODE_ENV !== 'production') {
        console.time(action.type)
      }

      currentState = reducer(currentState, action)
      render(currentState)

      if (process.env.NODE_ENV !== 'production') {
        console.timeEnd(action.type)
      }
    }

    var root = new Root(document.getElementById('root'), dispatch)

    render = root.render.bind(root)

    dispatch({ type: 'INIT' })
  }
}

module.exports = app
