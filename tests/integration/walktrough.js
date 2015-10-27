var simple = require('simple-mock')
var test = require('tape')

var MockStore = require('../utils/mock-store')
var TaskQueue = require('../../index')

test('Walktrough', function (t) {
  simple.mock(TaskQueue.internals, 'CustomStore').callFn(function (id) {
    return new MockStore(id)
  })

  t.plan(1)

  var taskQueue = TaskQueue('test')
  var fooQueue = taskQueue('foo')

  t.is(typeof fooQueue.start, 'function', 'scoped taskQueue API has "start" method')
  simple.restore()
})
