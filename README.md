# PromiEvent

A TypeScript implementation of a Promise that can also emit events.

[![npm version](https://badge.fury.io/js/promievent.svg)](https://badge.fury.io/js/promievent)
[![Known Vulnerabilities](https://snyk.io/test/github/naddison36/promievent/badge.svg)](https://snyk.io/test/github/naddison36/promievent)

A PromiEvent is a JavaScript [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that is also a Node.js [EventEmitter](https://nodejs.org/api/events.html). This allows a Promise to emit lifecycle events before a Promise is resolved or rejected.

## Installing

Using [node.js](https://nodejs.org/):
```
npm install --save promievent
```

## Node version support

Version 0.1.x supports `PromiEvent.finally()` so needs to run on Node.js 10 or higher as it uses native `Promise.prototype.finally`. See [Node.js ES2015 Support](https://node.green/#ES2018-features-Promise-prototype-finally) for more details.

Version 0.0.x works on Node.js 8.

## Usage

A PromiEvent can be used as a standard promise or an EventEmmiter, but it's best when used together. In the following example, the promise is resolved after 10 seconds but on each second a `interval` event is emitted. An event is also emitted on the first and last second.

```TypeScript
const promiEvent = new PromiEvent<number>((resolve, reject) =>
{
    let counter = 0

    const timer = setInterval(()=>
    {
        counter++
        
        promiEvent.emit('interval', counter)

        if (counter === 1) {
            promiEvent.emit('first', counter)
        }

        if (counter === 10) {
            promiEvent.emit('last', counter)
            resolve(counter)

            // stop the timer
            clearInterval(timer)
        }
    }, 100)
})
```

The following registers an `interval` event listener with the EventEmitter. This will print 10 lines.
```TypeScript
promiEvent.on('interval', (count: number)=>
{
    console.log(`interval number ${count}`)
})
```

The following register an `interval` event listener that is only fired once. This will only print one line.
```TypeScript
promiEvent.once('interval', (count: number)=>
{
    console.log(`interval number ${count}`)
})
```

The following will resolve the promise and print one line with a count of 10.
```TypeScript
promiEvent.then((count)=>
{
    console.log(`interval number ${count}`)
}).catch((err)=>
{
	console.log(`Something bad happened ${err.message}`)
	// error handling
})
```

Or you can resolve the promise using async/await assuming this code is in an async function.
```TypeScript
try {
	const count = await promiEvent
	console.log(`interval number ${count}`)
}
catch (err) {
	console.log(`Something bad happened ${err.message}`)
	// error handling
}
```

## Credits

The inspiration for a Promise that emits events has come from [Fabian Vogelsteller](https://github.com/frozeman)'s [Callbacks Promises Events](https://web3js.readthedocs.io/en/1.0/callbacks-promises-events.html) in the Ethereum [web3.js 1.x](https://github.com/ethereum/web3.js) project. The JavaScript implementation is in [web3-core-promievent](https://github.com/ethereum/web3.js/blob/1.0/packages/web3-core-promievent/src/index.js).

The TypeScript implementation also got influence from [Matthew Mueller](https://github.com/matthewmueller)'s [comments](https://github.com/Microsoft/TypeScript/issues/15202#issuecomment-318900991) on an issue in Microsoft's [TypeScript GitHub repo](https://github.com/Microsoft/TypeScript).

## License

The MIT Licence.

See [LICENSE](https://github.com/naddison36/promievent/blob/master/LICENSE).
