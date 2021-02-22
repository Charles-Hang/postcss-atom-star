import processPlugins from '../../src/utils/processPlugins';
import plugin from '../../src/plugins/lineHeight';
import css from '../utils/css';

test('lineHeight工具类', () => {
    const config = {
        style: {
            lineHeight: {
                normal: '1.5',
            },
        },
    };
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .leading-normal {
            line-height: 1.5
        }
    `);
});
