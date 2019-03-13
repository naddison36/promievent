
import {EventEmitter} from 'events'

// Promise function types
declare type Resolve<T> = (value?: T | PromiseLike<T>) => void
declare type Reject = (reason?: any) => void

/**
 * Creates a promise that also emits events
 * This has been based off Web3 1.0 PromiEvent https://web3js.readthedocs.io/en/1.0/callbacks-promises-events.html
 * The JS implementation of the Web3 1.0 PromiEvent https://github.com/ethereum/web3.js/blob/1.0/packages/web3-core-promievent/src/index.js
 * The usage of the Web3 1.0 PromiEvent https://github.com/ethereum/web3.js/tree/1.0/packages/web3-core-promievent
 *
 * The following is a TypeScript implementation of the Web3 1.0 PromiEvent
 * The implementation also got inspiration from https://github.com/Microsoft/TypeScript/issues/15202#issuecomment-318900991
 */
export default class PromiEvent<T> extends EventEmitter implements Promise<T>
{
	private readonly promise: Promise<T>
	readonly [Symbol.toStringTag]: 'Promise'

	// Have the same constructor as a Promise
	constructor(executor: (resolve: Resolve<T>, reject: Reject) => void)
	{
		// call the EventEmitter constructor
		super()

		this.promise = new Promise<T>(executor)
	}

	// the same signature as Promise.then
	public then <TResult1 = T, TResult2 = never> (
		onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
		onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
	): Promise<TResult1 | TResult2>
	{
		return this.promise.then(onfulfilled, onrejected)
	}

	// the same signature as Promise.catch
	public catch <TResult = never> (
		onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
	): Promise<T | TResult>
	{
		return this.promise.catch(onRejected)
	}

	// the same signature as Promise.finally
	public finally(onfinally?: (() => void) | null | undefined): Promise<T> {
		return this.promise.finally(onfinally)
	}

	// used if you want to create a PromiEvent for a known value
	static resolve<T>(value: T): PromiEvent<T>
	{
		return new PromiEvent<T>((resolve)=>
		{
			resolve(value)
		})
	}

	// used if you want to create a PromiEvent for a known failure
	static reject<T>(reason: any): PromiEvent<T>
	{
		return new PromiEvent<T>((_resolve, reject)=>
		{
			reject(reason)
		})
	}
}
