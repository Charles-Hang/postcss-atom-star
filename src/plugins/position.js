import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    createUtilityPlugin('position', [['', ['position']]])(pluginConfig);
    createUtilityPlugin('positionSpacing', [
        ['top', ['top']],
        ['right', ['right']],
        ['bottom', ['bottom']],
        ['left', ['left']],
    ])(pluginConfig);
}
