import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    createUtilityPlugin('width', [['w', ['width']]])(pluginConfig);
}
