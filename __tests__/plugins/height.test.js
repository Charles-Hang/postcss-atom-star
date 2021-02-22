import processPlugins from '../../src/utils/processPlugins';
import heightPlugin from '../../src/plugins/height';
import minHeightPlugin from '../../src/plugins/minHeight';
import maxHeightPlugin from '../../src/plugins/maxHeight';
import css from '../utils/css';

test('height工具类', () => {
    const config = {
        style: {
            height: {
                0: '0',
            },
            minHeight: {
                1: '1px',
            },
            maxHeight: {
                1: '1px',
            },
        },
    };
    const { utilities } = processPlugins([heightPlugin, minHeightPlugin, maxHeightPlugin], config);

    expect(css(utilities)).toMatchCss(`
        .h-0 {
            height: 0
        }
        .min-h-1 {
            min-height: 1px
        }
        .max-h-1 {
            max-height: 1px
        }
    `);
});
