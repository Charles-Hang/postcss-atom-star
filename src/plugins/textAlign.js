import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    createUtilityPlugin('textAlign', [['text', ['text-align']]])(pluginConfig);
}
