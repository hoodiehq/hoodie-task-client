module.exports = start

function start (state, type, attributes) {
  // TODO: scope the taskStore by type

  return state.taskStore.add({
    attributes: attributes
  })
  .then(function (taskDoc) {
    state.emitter.emit('start', taskDoc)

    return new Promise(function (resolve, reject) {
      state.taskStore.on('change', function (eventName, changedTaskDoc) {
        if (taskDoc.id === changedTaskDoc.id) {
          if (eventName === 'remove' && changedTaskDoc.progress) {
            var lastProgress = changedTaskDoc.progress[changedTaskDoc.progress.length - 1]
            var disposition = lastProgress.name

            // Prevent any EventEmitter thrown Error from affecting the Promise
            process.nextTick(function () {
              state.emitter.emit(disposition, lastProgress.error || null, changedTaskDoc)
            })

            // Resolve or reject
            if (disposition === 'success') return resolve(changedTaskDoc)
            if (disposition === 'error') return reject(new Error(lastProgress.error))
          } else {
            if (!changedTaskDoc.progress) return console.error('unhandled task change', changedTaskDoc)

            state.emitter.emit('progress', changedTaskDoc.progress, changedTaskDoc)
          }
        }
      })
    })
  })
}
