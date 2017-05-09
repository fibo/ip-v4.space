function classB (subnet) {
  return subnet.split('.').splice(0, 2).join('.')
}

module.exports = classB
