import processPlugins from '../../src/utils/processPlugins';
import plugin from '../../src/plugins/color';
import css from '../utils/css';

test('color工具类', () => {
    const config = {
        style: {
            color: {
                blue: 'blue',
            },
        },
    };
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .text-blue {
            color: blue
        }
    `);
});
