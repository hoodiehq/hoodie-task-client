# hoodie-client-task-queue

> client api for asynchronous task queue, using PouchDB for sync

[![Build Status](https://travis-ci.org/hoodiehq/hoodie-client-task-queue.svg?branch=master)](https://travis-ci.org/hoodiehq/hoodie-client-task-queue)
[![Coverage Status](https://coveralls.io/repos/hoodiehq/hoodie-client-task-queue/badge.svg?branch=master)](https://coveralls.io/r/hoodiehq/hoodie-client-task-queue?branch=master)
[![Dependency Status](https://david-dm.org/hoodiehq/hoodie-client-task-queue.svg)](https://david-dm.org/hoodiehq/hoodie-client-task-queue)
[![devDependency Status](https://david-dm.org/hoodiehq/hoodie-client-task-queue/dev-status.svg)](https://david-dm.org/hoodiehq/hoodie-client-task-queue#info=devDependencies)

## Example

```js
taskQueue('email').start({
  to: 'john@example.com',
  subject: 'Ohaj there',
  body: 'Hey John,\n\nhow are things?\n\n– Jane'
}).then(function (task) {
  alert('Email "' + task.subject + '" sent')
}).catch(function (error) {
  alert(error)
})
```

## API

```js
var taskQueue = new TaskQueue(userId)

mailQueue = taskQueue('mail')
taskQueue.on(eventName, handler)
taskQueue.one(eventName, handler)

mailQueue.start(attributes/*, options */)
mailQueue.abort(id/*, options */)
mailQueue.restart(id/*, options */)
mailQueue.on(eventName, handler)
mailQueue.one(eventName, handler)
```

Events, same for `mailQueue.on / one` and `taskQueue.on / one`

```js
mailQueue.on('start', handleNewTask)
mailQueue.on('success', handleNewTaskSuccess)
mailQueue.on('error', handleNewTaskError)
```

## Testing

Local setup

```
git clone git@github.com:hoodiehq/hoodie-client-task-queue.git
cd hoodie-client-task-queue
npm install
```

Run all tests and code style checks

```
npm test
```

Run all tests on file change

```
npm run test:watch
```

Run specific tests only

```
node tests/specs # run unit tests
node tests/specs/get-api # run .getApi() unit tests
node tests/integration/walktrough # run walktrough integration test
# PROTIP™ Pipe output through a [pretty reporter](https://www.npmjs.com/package/tape#pretty-reporters)
```

## License

[Apache-2.0](https://github.com/hoodiehq/hoodie/blob/master/LICENSE)
