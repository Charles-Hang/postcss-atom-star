import processPlugins from '../../src/utils/processPlugins';
import plugin from '../../src/plugins/zIndex';
import css from '../utils/css';

test('zIndex工具类', () => {
    const config = {
        style: {
            zIndex: {
                1: '1',
            },
        },
    };
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .z-1 {
            z-index: 1
        }
    `);
});
