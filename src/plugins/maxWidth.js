import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    createUtilityPlugin('maxWidth', [['max-w', ['max-width']]])(pluginConfig);
}
