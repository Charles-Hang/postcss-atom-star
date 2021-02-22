import processPlugins from '../../src/utils/processPlugins';
import plugin from '../../src/plugins/visibility';
import css from '../utils/css';

test('visibility工具类', () => {
    const config = {
        style: {
            visibility: {
                invisible: 'hidden',
            },
        },
    };
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .invisible {
            visibility: hidden
        }
    `);
});
