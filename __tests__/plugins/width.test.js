import processPlugins from '../../src/utils/processPlugins';
import widthPlugin from '../../src/plugins/width';
import minWidthPlugin from '../../src/plugins/minWidth';
import maxWidthPlugin from '../../src/plugins/maxWidth';
import css from '../utils/css';

test('width工具类', () => {
    const config = {
        style: {
            width: {
                0: '0',
            },
            minWidth: {
                1: '1px',
            },
            maxWidth: {
                1: '1px',
            },
        },
    };
    const { utilities } = processPlugins([widthPlugin, minWidthPlugin, maxWidthPlugin], config);

    expect(css(utilities)).toMatchCss(`
        .w-0 {
            width: 0
        }
        .min-w-1 {
            min-width: 1px
        }
        .max-w-1 {
            max-width: 1px
        }
    `);
});
