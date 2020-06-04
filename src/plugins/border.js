import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    const { addUtilities, variants } = pluginConfig;

    addUtilities({
        '.border-t': {
            border: 0,
            'border-top-width': '1px',
        },
        '.border-r': {
            border: 0,
            'border-right-width': '1px',
        },
        '.border-b': {
            border: 0,
            'border-bottom-width': '1px',
        },
        '.border-l': {
            border: 0,
            'border-left-width': '1px',
        },
    }, variants('borderWidth'));
    createUtilityPlugin('borderWidth', [['border', ['border-width']]])(pluginConfig);
    createUtilityPlugin('borderColor', [['border', ['border-color']]])(pluginConfig);
    createUtilityPlugin('borderStyle', [['border', ['border-style']]])(pluginConfig);
    createUtilityPlugin('borderRadius', [['rounded', ['border-radius']]])(pluginConfig);
}
