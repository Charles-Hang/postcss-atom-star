import processPlugins from '../../src/utils/processPlugins';
import plugin from '../../src/plugins/outline';
import css from '../utils/css';

test('outline工具类', () => {
    const config = {
        style: {
            outline: {
                none: '0',
            },
        },
    };
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .outline-none {
            outline: 0
        }
    `);
});
