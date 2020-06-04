import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    createUtilityPlugin('zIndex', [['z', ['z-index']]])(pluginConfig);
}
