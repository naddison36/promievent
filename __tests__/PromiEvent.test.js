"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PromiEvent_1 = require("../PromiEvent");
describe("PromiEvent", () => {
    test("setTimeout resolve", async () => {
        expect.assertions(2);
        const promiEvent = new PromiEvent_1.default((resolve, reject) => {
            setTimeout(() => {
                promiEvent.emit('done', 'Done!');
                resolve('Hello!');
            }, 100);
        });
        promiEvent.on('done', (param) => {
            expect(param).toEqual('Done!');
        });
        const result = await promiEvent;
        expect(result).toEqual('Hello!');
    }, 2000);
    test("setTimeout reject", async () => {
        expect.assertions(2);
        const promiEvent = new PromiEvent_1.default((resolve, reject) => {
            setTimeout(() => {
                promiEvent.emit('done', 'Done!');
                reject('Reject!');
            }, 100);
        });
        promiEvent.on('done', (param) => {
            expect(param).toEqual('Done!');
        });
        try {
            const result = await promiEvent;
        }
        catch (reason) {
            expect(reason).toEqual('Reject!');
        }
    }, 2000);
    describe("setInterval", () => {
        let promiEvent;
        beforeEach(() => {
            promiEvent = new PromiEvent_1.default((resolve, reject) => {
                let counter = 0;
                const timer = setInterval(() => {
                    counter++;
                    promiEvent.emit('interval', counter);
                    if (counter === 1) {
                        promiEvent.emit('first', counter);
                    }
                    if (counter === 10) {
                        promiEvent.emit('last', counter);
                        resolve(counter);
                        // stop the timer
                        clearInterval(timer);
                    }
                }, 100);
            });
        });
        test("interval", (done) => {
            expect.assertions(10);
            let eventCount = 0;
            promiEvent.on('interval', (count) => {
                eventCount++;
                expect(count).toEqual(eventCount);
                if (eventCount === 10) {
                    done();
                }
            });
        }, 5000);
        test("interval only once", (done) => {
            expect.assertions(1);
            promiEvent.once('interval', (count) => {
                expect(count).toEqual(1);
                done();
            });
        }, 2000);
        test("first", (done) => {
            expect.assertions(1);
            promiEvent.on('first', (count) => {
                expect(count).toEqual(1);
                done();
            });
        }, 2000);
        test("first2", (done) => {
            expect.assertions(1);
            promiEvent.on('first', (count) => {
                expect(count).toEqual(1);
                done();
            });
        }, 2000);
        test("last", (done) => {
            expect.assertions(1);
            promiEvent.on('last', (count) => {
                expect(count).toEqual(10);
                done();
            });
        }, 5000);
        test("resolve with then", async (done) => {
            expect.assertions(1);
            promiEvent.then((count) => {
                expect(count).toEqual(10);
                done();
            }).catch((err) => {
                console.log(`Something bad happened ${err.message}`);
            });
        });
        test("resolve with await", async () => {
            expect.assertions(1);
            try {
                expect(await promiEvent).toEqual(10);
            }
            catch (err) {
                console.log(`Something bad happened ${err.message}`);
            }
        });
    });
    describe("static functions", () => {
        test("resolve", async () => {
            const promiEvent = PromiEvent_1.default.resolve('Result');
            expect(promiEvent).toBeInstanceOf(PromiEvent_1.default);
            expect(await promiEvent).toEqual("Result");
        });
        test("reject", async () => {
            expect.assertions(3);
            const promiEvent = PromiEvent_1.default.reject(new Error('Failure'));
            expect(promiEvent).toBeInstanceOf(PromiEvent_1.default);
            try {
                await promiEvent;
            }
            catch (err) {
                expect(err).toBeInstanceOf(Error);
                expect(err.message).toEqual('Failure');
            }
        });
    });
});
//# sourceMappingURL=PromiEvent.test.js.map