import processPlugins from '../../src/utils/processPlugins';
import plugin from '../../src/plugins/resize';
import css from '../utils/css';

test('resize工具类', () => {
    const config = {
        style: {
            resize: {
                none: 'none',
            },
        },
    };
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .resize-none {
            resize: none
        }
    `);
});
