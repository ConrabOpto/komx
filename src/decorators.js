/* eslint-disable prefer-spread, prefer-rest-params */
import ko from 'knockout';
import { isNil, isUndefined } from './utils';

const isDefined = val => !isUndefined(val);
const defProp = Object.defineProperty.bind(Object);

function addToRawObservables(target, key, obs) {
    if (!target.$rawObservables) {
        defProp(target, '$rawObservables', { enumerable: false, value: {} });
    }
    target.$rawObservables[key] = obs;
}

function namedActionDecorator(name) {
    return function (target, key, descriptor) {
        return descriptor;
    };
}

export function action(arg1, arg2) {
    if (arguments.length === 1 && typeof arg1 === 'string') {
        return namedActionDecorator(arg1);
    }

    return namedActionDecorator(arg2).apply(null, arguments);
}

function getInitValue(init) {
    if (typeof init !== 'function') {
        return undefined;
    }

    return init();
}

export function observable(prototype, key, desc) {
    const initValue = getInitValue(desc.initializer);

    if (Array.isArray(initValue)) {
        return observableArray(prototype, key, initValue);
    }

    const newDescriptor = {
        get() {
            const obs = ko.observable(initValue);
            addToRawObservables(this, key, obs);
            defProp(this, key, {
                configurable: true,
                enumerable: true,
                get: obs,
                set: obs
            });
            return obs();
        },
        set(value) {
            value = isDefined(initValue) && isNil(value) ? initValue : value;
            const obs = ko.observable();
            addToRawObservables(this, key, obs);
            defProp(this, key, {
                configurable: true,
                enumerable: true,
                get: obs,
                set: obs
            });
            obs(value);
        },
        enumerable: true,
        configurable: true
    };

    return newDescriptor;
}

export function computed(prototype, key, desc) {
    const get = desc.get || desc.value;
    const newDescriptor = {
        get() {
            const computed = ko.pureComputed(get, this);
            addToRawObservables(this, key, computed);
            defProp(this, key, { get: computed, configurable: true });
            return computed();
        },
        enumerable: true,
        configurable: true
    };
    return newDescriptor;
}


function defObservableArray(instance, key, initValue) {
    const obsArray = ko.observableArray(initValue);
    const update = (arr) => {
        if (Array.isArray(arr) && !Object.getOwnPropertyDescriptor(arr, 'push')) {
            ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'].forEach(fn => {
                // sadly we can't just use ko.observableArray.fn's functions, as it doesn't call
                // Array.prototype[f].apply but on the object, resulting in infinite recursion.
                Object.defineProperty(arr, fn, {
                    value() {
                        obsArray.valueWillMutate();
                        const result = Array.prototype[fn].apply(obsArray.peek(), arguments);
                        obsArray.valueHasMutated();
                        return result;
                    }
                });
            });
            ['remove', 'replace', 'removeAll'].forEach(fn => {
                Object.defineProperty(arr, fn, {
                    configurable: true,
                    value: ko.observableArray.fn[fn].bind(obsArray)
                });
            });
        }
    };
    obsArray.subscribe(update);
    update(initValue);

    addToRawObservables(instance, key, obsArray);

    defProp(instance, key, {
        configurable: true,
        enumerable: true,
        get: obsArray,
        set(array) {
            obsArray(array);
        }
    });
}

function observableArray(prototype, key, initValue) {
    const newDescriptor = {
        get() {
            defObservableArray(this, key, initValue);
            return this[key];
        },
        set(value) {
            defObservableArray(this, key, initValue);
            this[key] = value;
        },
        enumerable: true,
        configurable: true
    };

    return newDescriptor;
}
