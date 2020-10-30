import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    createUtilityPlugin('minHeight', [['min-h', ['min-height']]])(pluginConfig);
}
