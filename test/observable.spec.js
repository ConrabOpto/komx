import ko from 'knockout';
import when from '../src/when';
import { observable } from '../src/decorators';

class Store {
    @observable test = 1;
    @observable names = ['lisa'];
}


describe('decorators', () => {
    let store;

    beforeEach(() => {
        store = new Store();
    });

    test('should handle simple assignments sync', () => {
        store.test = 3;
        expect(store.test).toBe(3);
    });

    test('should handle observable arrays', () => {
        expect(store.names[0]).toBe('lisa');
        store.names = ['lisa', 'eric'];
        store.names.push('john');
        expect(store.names[2]).toBe('john');
    });
});

