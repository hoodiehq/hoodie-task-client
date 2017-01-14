module.exports = Task

var EventEmitter = require('events').EventEmitter
var StoreClient = require('@hoodie/store-client')
var start = require('./lib/start.js')
var off = require('./lib/off.js')
var on = require('./lib/on.js')
var one = require('./lib/one.js')

function Task (id, options) {
  if (!(this instanceof Task)) return new Task(id, options)
  if (typeof id !== 'string') throw new Error('Must be a valid string.')

  if (!options || !options.remoteBaseUrl) {
    throw new Error('options.remoteBaseUrl is required')
  }

  options.remoteBaseUrl = options.remoteBaseUrl.replace(/\/$/, '')
  options.remote = (options.remoteBaseUrl + '/queue/' + encodeURIComponent(id))

  delete options.remoteBaseUrl

  var taskStore = new StoreClient(id, options)

  taskStore.on('error', function (error) {
    console.error(error)
  })

  taskStore.connect()

  var state = {
    taskStore: taskStore,
    emitter: new EventEmitter()
  }

  return function (type) {
    return {
      start: start.bind(null, state, type),
      off: off.bind(null, state),
      on: on.bind(null, state),
      one: one.bind(null, state)
    }
  }
}
