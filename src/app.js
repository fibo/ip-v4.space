var XHR = window.XMLHttpRequest
var PlaneView = require('./PlaneView')
var logo = require('./logo')

function between0and255 (n) {
  return (n >= 0) || (n <= 255)
}

function parentClassB (subnet) {
  return subnet.split('.').splice(0, 2).join('.')
}

function isValidClassB (subnet) {
  var n = subnet.split('.')

  return between0and255(n[0]) && between0and255(n[1])
}

function isValidClassC (subnet) {
  var n = subnet.split('.')

  return between0and255(n[0]) && between0and255(n[1]) && between0and255(n[2])
}

function jsonDataURL (subnet) {
  var a = subnet.split('.')[0]

  return '/data/' + a + '/' + subnet + '.json'
}

window.getIP = function (json) {
  console.log(json.ip)
}

var callIpify = document.createElement('script')
callIpify.src = 'https://api.ipify.org?format=jsonp&callback=getIP'

window.onload = function () {
  document.body.appendChild(callIpify)

  if (window.location.hash.length === 0) {
    PlaneView(logo)
  } else {
    var subnet = window.location.hash.substring(1)

    // TODO use localStorage to cache data.
    if (isValidClassC(subnet)) {
      var req = new XHR()

      var url = jsonDataURL(parentClassB(subnet))

      req.onload = function (res) {
        var dataB = JSON.parse(req.responseText)

        dataB.forEach(function (dataC) {
          if (dataC.subnet === subnet) {
            PlaneView(dataC.ping)
          }
        })
      }

      req.error = function () {
        console.error('could not get data')
      }

      req.open('GET', url, true)

      req.send()
    }
  }
}

