import processPlugins from '../../src/utils/processPlugins';
import plugin from '../../src/plugins/textAlign';
import css from '../utils/css';

test('textAlign工具类', () => {
    const config = {
        style: {
            textAlign: {
                left: 'left',
            },
        },
    };
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .text-left {
            text-align: left
        }
    `);
});
