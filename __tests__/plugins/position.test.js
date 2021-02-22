import processPlugins from '../../src/utils/processPlugins';
import plugin from '../../src/plugins/position';
import css from '../utils/css';

test('position工具类', () => {
    const config = {
        style: {
            position: {
                static: 'static',
            },
            positionSpacing: {
                0: '0',
            },
        },
    };
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .static {
            position: static
        }
        .top-0 {
            top: 0
        }
        .right-0 {
            right: 0
        }
        .bottom-0 {
            bottom: 0
        }
        .left-0 {
            left: 0
        }
    `);
});
