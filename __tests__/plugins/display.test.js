import processPlugins from '../../src/utils/processPlugins';
import plugin from '../../src/plugins/display';
import css from '../utils/css';

test('display工具类', () => {
    const config = {
        style: {
            display: {
                hidden: 'none',
            },
        },
    };
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .hidden {
            display: none
        }
    `);
});
