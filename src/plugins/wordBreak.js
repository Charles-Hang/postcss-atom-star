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
    createUtilityPlugin('overflowWrap', [['', ['overflow-wrap']]])(pluginConfig);
    createUtilityPlugin('wordBreak', [['', ['word-break']]])(pluginConfig);
}
