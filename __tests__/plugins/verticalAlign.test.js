import processPlugins from '../../src/utils/processPlugins';
import plugin from '../../src/plugins/verticalAlign';
import css from '../utils/css';

test('verticalAlign工具类', () => {
    const config = {
        style: {
            verticalAlign: {
                middle: 'middle',
            },
        },
    };
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .align-middle {
            vertical-align: middle
        }
    `);
});
