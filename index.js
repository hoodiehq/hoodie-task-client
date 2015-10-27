module.exports = TaskQueue

var Store = require('pouchdb-hoodie-store')
var CustomStore = Store.defaults({
  remoteBaseUrl: '/api/user/'
})
var getApi = require('./lib/get-api')

var internals = TaskQueue.internals = {
  CustomStore: CustomStore
}

function TaskQueue (id) {
  var store = new internals.CustomStore(id)
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
