// Type definitions for PromiEvent
// Project: promievent
// Definitions by: Nick Addison

import {EventEmitter} from 'events';

export as namespace PromiEvent;

export = PromiEvent;

declare class PromiEvent<T> extends EventEmitter implements PromiseLike<T>
{
    constructor(executor: (resolve: PromiEvent.Resolve<T>, reject: PromiEvent.Reject) => void);

    public then <TResult1, TResult2> (
		onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
		onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
	): Promise<TResult1 | TResult2>;

	public catch <TResult> (
		onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
	): Promise<T | TResult>;

	public finally(onfinally?: (() => void) | null | undefined): Promise<T>;

	static resolve<T>(value: T): PromiEvent<T>;
	static reject<T>(reason: any): PromiEvent<T>;
}

declare namespace PromiEvent
{
    export type Resolve<T> = (value?: T | PromiseLike<T>) => void
    export type Reject = (reason?: any) => void
}
