/* eslint-disable no-throw-literal */
import when from '../src/when';
import { observable } from '../src/decorators';

class Test {
    @observable names = [];

    constructor(data) {
        Object.assign(this, data);
    }
}

describe('when', () => {
    test('resolves when it already has value', (done) => {
        const t = new Test({ names: ['alice', 'mike', 'jonathan'] });

        when(
            () => t.names.length,
            () => {
                expect(t.names[0]).toBe('alice');
                done();
            }
        );
    });

    test('resolves when it gets a value async', (done) => {
        const t = new Test();

        process.nextTick(() => {
            t.names = ['alice', 'mike'];
        });

        when(
            () => t.names.length,
            () => {
                expect(t.names[0]).toBe('alice');
                done();
            }
        );
    });
});
