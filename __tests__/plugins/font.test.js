import processPlugins from '../../src/utils/processPlugins';
import plugin from '../../src/plugins/font';
import css from '../utils/css';

test('font工具类', () => {
    const config = {
        style: {
            fontSize: {
                12: '12px',
            },
            fontWeight: {
                normal: '400',
            },
        },
    };
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .font-12 {
            font-size: 12px
        }
        .font-normal {
            font-weight: 400
        }
    `);
});
