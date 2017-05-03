import ko from 'knockout';
import when from '../src/when';
import { action, computed, observable } from '../src/decorators';

const api = {
    init() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(['katrina, erik, janne']);
            }, 100);
        });
    }
};

class Store {
    @observable test = 1;
    @observable names = ['lisa'];

    @computed get fn() {
        return 2 + this.test;
    }

    @computed get namesJoined() {
        return this.names.join(' ');
    }

    value() {
        return 3;
    }

    constructor(data = {}) {
        Object.assign(this, data);
    }

    async asyncUpdate() {
        this.names = await api.init();
    }

    async asyncReturn() {
        const names = await api.init();
        return names;
    }
}

class Component {
    @computed get namesJoinedWithDash() {
        return this.store.namesJoined.split(', ').join(' - ');
    }

    constructor({ store }) {
        this.store = store;
    }
}

describe('decorators', () => {
    let store;

    beforeEach(() => {
        store = new Store();
    });

    test('should handle computed fields', () => {
        expect(store.fn).toBe(3);
        store.test = 2;
        expect(store.test).toBe(2);
        expect(store.fn).toBe(4);
    });

    test('should handle simple assignments sync', () => {
        store.test = 3;
        expect(store.test).toBe(3);
        expect(store.fn).toBe(5);
    });

    test('should handle observable arrays', () => {
        expect(store.names[0]).toBe('lisa');
        store.names = ['lisa', 'eric'];
        store.names.push('john');
        expect(store.namesJoined).toBe('lisa eric john');
    });

    test('should handle async load', done => {
        const component = new Component({ store });
        store.names = [];
        store.asyncUpdate();
        when(() => store.names.length, () => {
            expect(component.namesJoinedWithDash).toBe('katrina - erik - janne');
            done();
        });
    });

    test('should work with normal computeds', done => {
        store.names = [];
        store.asyncUpdate();

        ko.computed(() => {
            const names = store.names;
            if (names.length) {
                expect(store.namesJoined).toBe('katrina, erik, janne');
                done();
            }
        });
    });
});
