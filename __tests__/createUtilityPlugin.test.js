import processPlugins from '../src/utils/processPlugins';
import createUtilityPlugin from '../src/utils/createUtilityPlugin';
import css from './utils/css';

test('带前缀的工具类插件', () => {
    const config = {
        style: {
            styleKey: {
                default: 'none-key-value',
                '-default': 'default-key-value',
                'test-key': 'test-value',
            },
        },
    };
    const plugin = createUtilityPlugin('styleKey', [
        ['prefix1', ['property-1', 'property-2']],
        ['prefix2', ['property-2-1', 'property-2-2']],
    ]);
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .prefix1 {
            property-1: none-key-value
            property-2: none-key-value
        }
        .prefix1-default {
            property-1: default-key-value
            property-2: default-key-value
        }
        .prefix1-test-key {
            property-1: test-value
            property-2: test-value
        }
        .prefix2 {
            property-2-1: none-key-value
            property-2-2: none-key-value
        }
        .prefix2-default {
            property-2-1: default-key-value
            property-2-2: default-key-value
        }
        .prefix2-test-key {
            property-2-1: test-value
            property-2-2: test-value
        }
    `);
});

test('不带前缀的工具类插件', () => {
    const config = {
        style: {
            styleKey: {
                default: 'none-key-value',
                '-default': 'default-key-value',
                'test-key': 'test-value',
            },
        },
    };
    const plugin = createUtilityPlugin('styleKey', [['', ['property-1', 'property-2']]]);
    const { utilities } = processPlugins([plugin], config);

    expect(css(utilities)).toMatchCss(`
        .styleKey {
            property-1: none-key-value
            property-2: none-key-value
        }
        .styleKey-default {
            property-1: default-key-value
            property-2: default-key-value
        }
        .test-key {
            property-1: test-value
            property-2: test-value
        }
    `);
});
