var Store = require('pouchdb-hoodie-store')
var MockStore = Store.defaults({
  remoteBaseUrl: '/api/user/',
  db: require('memdown')
})

module.exports = MockStore
