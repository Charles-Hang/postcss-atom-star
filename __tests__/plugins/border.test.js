import processPlugins from '../../src/utils/processPlugins';
import plugin from '../../src/plugins/border';
import css from '../utils/css';

test('border工具类', () => {
    const config = {
        style: {
            borderWidth: {
                0: '0',
            },
            borderColor: {
                blue: 'blue',
            },
            borderStyle: {
                solid: 'solid',
            },
            borderRadius: {
                none: '0',
            },
        },
    };
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .border-0 {
            border-width: 0
        }
        .border-t-0 {
            border-top-width: 0
        }
        .border-r-0 {
            border-right-width: 0
        }
        .border-b-0 {
            border-bottom-width: 0
        }
        .border-l-0 {
            border-left-width: 0
        }
        .border-blue {
            border-color: blue
        }
        .border-solid {
            border-style: solid
        }
        .rounded-none {
            border-radius: 0
        }
    `);
});
