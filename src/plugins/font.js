import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    createUtilityPlugin('fontSize', [['font', ['font-size']]])(pluginConfig);
    createUtilityPlugin('fontWeight', [['font', ['font-weight']]])(pluginConfig);
}
