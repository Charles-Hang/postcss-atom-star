import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    createUtilityPlugin('visibility', [['', ['visibility']]])(pluginConfig);
}
