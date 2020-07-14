import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    const { addUtilities } = pluginConfig;

    addUtilities({
        '.truncate': {
            overflow: 'hidden',
            'text-overflow': 'ellipsis',
            'white-space': 'nowrap',
        },
    }, []);
    // word-wrap是ie兼容
    createUtilityPlugin('overflowWrap', [['', ['overflow-wrap', 'word-wrap']]])(pluginConfig);
    createUtilityPlugin('wordBreak', [['', ['word-break']]])(pluginConfig);
}
