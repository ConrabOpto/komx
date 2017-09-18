import ko from 'knockout';
import when from '../src/when';
import { observable } from '../src/decorators';

class Store {
    @observable test = 1;
    @observable names = ['lisa'];
}

class ListWithList {
    @observable points = [];
}

class StoreWithList {
    @observable lists = [];
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

    test('should handle lists within lists', () => {
        const storeWithList = new StoreWithList();
        const listWithList = new ListWithList();
        const listWithList2 = new ListWithList();
        listWithList.points.push({ x: 4 });
        storeWithList.lists.push(listWithList);
        listWithList2.points.push({ x: 5 });
        storeWithList.lists.push(listWithList2);
        expect(storeWithList.lists[0].points.length).toBe(1);
    });
});

