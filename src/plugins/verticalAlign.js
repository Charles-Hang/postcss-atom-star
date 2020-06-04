import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    createUtilityPlugin('verticalAlign', [['align', ['vertical-align']]])(pluginConfig);
}
