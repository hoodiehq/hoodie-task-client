var simple = require('simple-mock')
var test = require('tape')

var MockStore = require('../utils/mock-store')
var TaskQueue = require('../../index')

var options = {
  remoteBaseUrl: '/api/users',
  remote: 'test'
}

test('Walktrough', function (t) {
  simple.mock(TaskQueue.internals, 'Store').callFn(function (options) {
    options.db = require('memdown')
    return MockStore(options)
  })

  t.plan(1)

  var taskQueue = TaskQueue('test', options)
  var fooQueue = taskQueue('foo')

  t.is(typeof fooQueue.start, 'function', 'scoped taskQueue API has "start" method')
  simple.restore()
})
