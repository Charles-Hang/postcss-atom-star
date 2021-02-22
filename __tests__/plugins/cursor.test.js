import processPlugins from '../../src/utils/processPlugins';
import plugin from '../../src/plugins/cursor';
import css from '../utils/css';

test('cursor工具类', () => {
    const config = {
        style: {
            cursor: {
                pointer: 'pointer',
            },
        },
    };
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .cursor-pointer {
            cursor: pointer
        }
    `);
});
