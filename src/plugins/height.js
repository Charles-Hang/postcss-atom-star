import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    createUtilityPlugin('height', [['h', ['height']]])(pluginConfig);
}
