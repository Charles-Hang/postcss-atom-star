import processPlugins from '../../src/utils/processPlugins';
import plugin from '../../src/plugins/whitespace';
import css from '../utils/css';

test('whitespace工具类', () => {
    const config = {
        style: {
            whitespace: {
                'no-wrap': 'nowrap',
            },
        },
    };
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .whitespace-no-wrap {
            white-space: nowrap
        }
    `);
});
