import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    createUtilityPlugin('maxHeight', [['max-h', ['max-height']]])(pluginConfig);
}
