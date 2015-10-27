var simple = require('simple-mock')
var test = require('tape')

var getApi = require('../../lib/get-api')

test('lib/get-api smoke', function (t) {
  var storeSpy = simple.spy(function () {})
  var state = {
    store: storeSpy
  }

  var api = getApi(state, 'foo')

  t.is(typeof api.start, 'function', 'api.start is a function')
  t.is(storeSpy.callCount, 1, 'store() called once')
  t.is(storeSpy.lastCall.arg, 'foo', 'store() called with passed type')

  t.end()
})
