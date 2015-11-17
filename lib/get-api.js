module.exports = getAPI

var EventEmitter = require('events').EventEmitter

function getAPI (state, type) {
  var emitter = new EventEmitter()
  var scopedStore = state.store(type)

  return {
    start: function (attributes, options) {
      return scopedStore.add({
        attributes: attributes
      })

      .then(function (task) {
        emitter.emit('start', task)
        return new Promise(function (resolve, reject) {
          scopedStore.on('change', handleStoreChange)

          function handleStoreChange (eventName, changedTask, options) {
            if (task.id !== changedTask.id) {
              return
            }

            if (eventName === 'remove') {
              emitter.emit('success', changedTask)
              return resolve(changedTask.attributes)
            }

            if (changedTask.error) {
              // EventEmitter throws an Error if an "error" event
              // is emitted without a listener.
              try {
                emitter.emit('error', changedTask.error, changedTask)
              } catch (error) {}

              return reject(new Error(changedTask.error))
            }

            console.error('unhandled task change', task)
          }
        })
      })
    },
    on: emitter.on.bind(emitter),
    one: emitter.once.bind(emitter)
  }
}
