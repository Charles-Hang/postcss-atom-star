import processPlugins from '../../src/utils/processPlugins';
import plugin from '../../src/plugins/wordBreak';
import css from '../utils/css';

test('wordBreak工具类', () => {
    const config = {
        style: {
            overflowWrap: {
                'break-words': 'break-word',
            },
            wordBreak: {
                'break-all': 'break-all',
            },
        },
    };
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .truncate {
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
        }
        .break-words {
            overflow-wrap: break-word
            word-wrap: break-word
        }
        .break-all {
            word-break: break-all
        }
    `);
});
