import processPlugins from '../../src/utils/processPlugins';
import plugin from '../../src/plugins/margin';
import css from '../utils/css';

test('margin工具类', () => {
    const config = {
        style: {
            margin: {
                4: '4px',
            },
        },
    };
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .m-4 {
            margin: 4px
        }
        .mx-4 {
            margin-left: 4px
            margin-right: 4px
        }
        .my-4 {
            margin-top: 4px
            margin-bottom: 4px
        }
        .mt-4 {
            margin-top: 4px
        }
        .mr-4 {
            margin-right: 4px
        }
        .mb-4 {
            margin-bottom: 4px
        }
        .ml-4 {
            margin-left: 4px
        }
    `);
});
