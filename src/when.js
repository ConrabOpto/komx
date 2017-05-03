import ko from 'knockout';

export default function when(obsOrFn, fn) {
    let computed;

    const result = obsOrFn();
    if (typeof result !== 'function' && result) {
        fn(result);
        return;
    }

    if (ko.isObservable(obsOrFn)) {
        obsOrFn.subscribe(whenSubscribe);
    }
    else {
        computed = ko.pureComputed(obsOrFn);
        computed.subscribe(whenSubscribe);
    }

    function whenSubscribe(newVal) {
        if (newVal) {
            fn(newVal);
            this.dispose();
        }
        if (computed) computed.dispose();
    }
}
