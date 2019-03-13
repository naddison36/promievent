"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
/**
 * Creates a promise that also emits events
 * This has been based off Web3 1.0 PromiEvent https://web3js.readthedocs.io/en/1.0/callbacks-promises-events.html
 * The JS implementation of the Web3 1.0 PromiEvent https://github.com/ethereum/web3.js/blob/1.0/packages/web3-core-promievent/src/index.js
 * The usage of the Web3 1.0 PromiEvent https://github.com/ethereum/web3.js/tree/1.0/packages/web3-core-promievent
 *
 * The following is a TypeScript implementation of the Web3 1.0 PromiEvent
 * The implementation also got inspiration from https://github.com/Microsoft/TypeScript/issues/15202#issuecomment-318900991
 */
class PromiEvent extends events_1.EventEmitter {
    // Have the same constructor as a Promise
    constructor(executor) {
        // call the EventEmitter constructor
        super();
        this.promise = new Promise(executor);
    }
    // the same signature as Promise.then
    then(onfulfilled, onrejected) {
        return this.promise.then(onfulfilled, onrejected);
    }
    // the same signature as Promise.catch
    catch(onRejected) {
        return this.promise.catch(onRejected);
    }
    // the same signature as Promise.finally
    finally(onfinally) {
        return this.promise.finally(onfinally);
    }
    // used if you want to create a PromiEvent for a known value
    static resolve(value) {
        return new PromiEvent((resolve) => {
            resolve(value);
        });
    }
    // used if you want to create a PromiEvent for a known failure
    static reject(reason) {
        return new PromiEvent((_resolve, reject) => {
            reject(reason);
        });
    }
}
exports.default = PromiEvent;
//# sourceMappingURL=PromiEvent.js.map