import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    createUtilityPlugin('lineHeight', [['leading', ['line-height']]])(pluginConfig);
}
