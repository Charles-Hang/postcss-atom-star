import processPlugins from '../../src/utils/processPlugins';
import plugin from '../../src/plugins/flex';
import css from '../utils/css';

test('flex工具类', () => {
    const config = {
        style: {
            flex: {
                1: '1 1 0%',
            },
            flexDirection: {
                row: 'row',
            },
            flexWrap: {
                'no-wrap': 'nowrap',
            },
            flexShrink: {
                0: '0',
            },
            flexGrow: {
                0: '0',
            },
            alignItems: {
                start: 'flex-start',
            },
            alignContent: {
                end: 'flex-end',
            },
            justifyContent: {
                between: 'space-between',
            },
            alignSelf: {
                center: 'center',
            },
            order: {
                1: '1',
            },
        },
    };
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .flex-1 {
            flex: 1 1 0%
        }
        .flex-row {
            flex-direction: row
        }
        .flex-no-wrap {
            flex-wrap: nowrap
        }
        .flex-shrink-0 {
            flex-shrink: 0
        }
        .flex-grow-0 {
            flex-grow: 0
        }
        .items-start {
            align-items: flex-start
        }
        .content-end {
            align-content: flex-end
        }
        .justify-between {
            justify-content: space-between
        }
        .self-center {
            align-self: center
        }
        .order-1 {
            order: 1
        }
    `);
});
