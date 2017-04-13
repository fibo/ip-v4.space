var XHR = window.XMLHttpRequest
var PlaneView = require('./PlaneView')
var logo = require('./logo')

var JSONDataURL = require('./util/JSONDataURL')
var isValidClassC = require('./util/isValidClassC')
var parentClassB = require('./util/parentClassB')

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

      var url = JSONDataURL(parentClassB(subnet))

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
