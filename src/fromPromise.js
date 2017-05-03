import ko from 'knockout';

export const states = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
};

export function fromPromise(promise, initialValue) {
    const observable = ko.observable(initialValue);
    const state = ko.observable(states.PENDING);

    // TODO: wrap in action maybe?
    promise.then(
        (value) => {
            observable(value);
            state('fulfilled');
        },
        (reason) => {
            observable(reason);
            state('rejected');
        }
    );

    return {
        get value() {
            return observable();
        },
        get state() {
            return state();
        },
        get promise() {
            return promise;
        }
    };
}

export default fromPromise;
