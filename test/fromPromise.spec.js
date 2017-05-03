/* eslint-disable no-throw-literal */
import { states, fromPromise } from '../src/fromPromise';
import when from '../src/when';

describe('fromPromise', () => {
    test('resolves', done => {
        const p = new Promise((resolve) => {
            resolve(7);
        });

        const obs = fromPromise(p, 3);
        expect(obs.value).toBe(3);
        expect(obs.state).toBe('pending');
        expect(obs.promise).toBe(p);

        when(
            () => obs.state === 'fulfilled',
            () => {
                expect(obs.value).toBe(7);
                done();
            }
        );
    });

    test('resolves value', done => {
        const p = new Promise((resolve) => {
            resolve(7);
        });

        const obs = fromPromise(p, 3);
        expect(obs.value).toBe(3);
        expect(obs.state).toBe('pending');
        expect(obs.promise).toBe(p);

        when(
            () => obs.value === 7,
            () => {
                process.nextTick(() => {
                    expect(obs.state).toBe(states.FULFILLED);
                    done();
                });
            }
        );

        done();
    });

    test('rejects with reason value', done => {
        const p = new Promise((resolve, reject) => {
            reject(7);
        });

        const obs = fromPromise(p, 3);
        expect(obs.value).toBe(3);
        expect(obs.state).toBe('pending');
        expect(obs.promise).toBe(p);

        when(
            () => obs.state !== states.PENDING,
            () => {
                expect(obs.state).toBe(states.REJECTED);
                expect(obs.value).toBe(7);
                done();
            }
        );
    });


    test('rejects when throwing', done => {
        const p = new Promise(() => {
            throw 7;
        });

        const obs = fromPromise(p, 3);
        expect(obs.value).toBe(3);
        expect(obs.state).toBe('pending');
        expect(obs.promise).toBe(p);

        when(
            () => obs.state !== 'pending',
            () => {
                expect(obs.state).toBe('rejected');
                expect(obs.value).toBe(7);
                done();
            }
        );
    });
});
