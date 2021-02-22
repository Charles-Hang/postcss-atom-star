import processPlugins from '../../src/utils/processPlugins';
import plugin from '../../src/plugins/background';
import css from '../utils/css';

test('background工具类', () => {
    const config = {
        style: {
            backgroundAttachment: {
                fixed: 'fixed',
            },
            backgroundPosition: {
                left: 'left',
            },
            backgroundRepeat: {
                'no-repeat': 'no-repeat',
            },
            backgroundSize: {
                auto: 'auto',
            },
            backgroundColor: {
                blue: 'blue',
            },
        },
    };
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .bg-fixed {
            background-attachment: fixed
        }
        .bg-left {
            background-position: left
        }
        .bg-no-repeat {
            background-repeat: no-repeat
        }
        .bg-auto {
            background-size: auto
        }
        .bg-blue {
            background-color: blue
        }
    `);
});
