module.exports = TaskQueue

var Store = require('hoodie-client-store')
var getApi = require('./lib/get-api')

var internals = TaskQueue.internals = {
  Store: Store.defaults
}

function TaskQueue (id, options) {
  if (!(this instanceof TaskQueue)) return new TaskQueue(id, options)
  if (typeof id !== 'string') throw new Error('Must be a valid string.')

  if (!options || (!options.remote && !options.remoteBaseUrl)) {
    throw new Error('options.remote or options.remoteBaseUrl is required')
  }

  if (options.remoteBaseUrl) {
    options.remoteBaseUrl = options.remoteBaseUrl.replace(/\/$/, '')
    if (!options.remote) {
      options.remote = id
    }
    if (!/^https?:\/\//.test(options.remote)) {
      options.remote = (options.remoteBaseUrl + '/' + options.remote)
    }
  }

  var CustomStore = internals.Store(options)
  var store = new CustomStore(id)
  var state = {
    id: id,
    store: store
  }

  store.connect()
  store.on('error', function (error) {
    console.error(error)
  })

  return getApi.bind(null, state)
}
