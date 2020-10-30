import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    createUtilityPlugin('minWidth', [['min-w', ['min-width']]])(pluginConfig);
}
