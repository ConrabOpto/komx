import ko from 'knockout';

export default function reaction(expr, sideEffect) {
    const computed = ko.pureComputed(expr);
    computed.subscribe(val => sideEffect(val));
    return computed;
};
