import processPlugins from '../../src/utils/processPlugins';
import plugin from '../../src/plugins/padding';
import css from '../utils/css';

test('padding工具类', () => {
    const config = {
        style: {
            padding: {
                4: '4px',
            },
        },
    };
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .p-4 {
            padding: 4px
        }
        .px-4 {
            padding-left: 4px
            padding-right: 4px
        }
        .py-4 {
            padding-top: 4px
            padding-bottom: 4px
        }
        .pt-4 {
            padding-top: 4px
        }
        .pr-4 {
            padding-right: 4px
        }
        .pb-4 {
            padding-bottom: 4px
        }
        .pl-4 {
            padding-left: 4px
        }
    `);
});
