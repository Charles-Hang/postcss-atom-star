import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    createUtilityPlugin('resize', [['resize', ['resize']]])(pluginConfig);
}
