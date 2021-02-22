import processPlugins from '../../src/utils/processPlugins';
import plugin from '../../src/plugins/overflow';
import css from '../utils/css';

test('overflow工具类', () => {
    const config = {
        style: {
            overflow: {
                visible: 'visible',
            },
        },
    };
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .overflow-visible {
            overflow: visible
        }
        .overflow-x-visible {
            overflow-x: visible
        }
        .overflow-y-visible {
            overflow-y: visible
        }
    `);
});
