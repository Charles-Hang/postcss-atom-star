import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    createUtilityPlugin('backgroundAttachment', [['bg', ['background-attachment']]])(pluginConfig);
    createUtilityPlugin('backgroundPosition', [['bg', ['background-position']]])(pluginConfig);
    createUtilityPlugin('backgroundRepeat', [['bg', ['background-repeat']]])(pluginConfig);
    createUtilityPlugin('backgroundSize', [['bg', ['background-size']]])(pluginConfig);
    createUtilityPlugin('backgroundColor', [['bg', ['background-color']]])(pluginConfig);
}
