import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    createUtilityPlugin('color', [['text', ['color']]])(pluginConfig);
}
