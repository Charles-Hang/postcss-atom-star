import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    createUtilityPlugin('flex', [['flex', ['flex']]])(pluginConfig);
    createUtilityPlugin('flexDirection', [['flex', ['flex-direction']]])(pluginConfig);
    createUtilityPlugin('flexDirection', [['flex', ['flex-direction']]])(pluginConfig);
    createUtilityPlugin('flexWrap', [['flex', ['flex-wrap']]])(pluginConfig);
    createUtilityPlugin('flexShrink', [['flex-shrink', ['flex-shrink']]])(pluginConfig);
    createUtilityPlugin('flexGrow', [['flex-grow', ['flex-grow']]])(pluginConfig);
    createUtilityPlugin('alignItems', [['items', ['align-items']]])(pluginConfig);
    createUtilityPlugin('alignContent', [['content', ['align-content']]])(pluginConfig);
    createUtilityPlugin('justifyContent', [['justify', ['justify-content']]])(pluginConfig);
    createUtilityPlugin('alignSelf', [['self', ['align-self']]])(pluginConfig);
    createUtilityPlugin('order', [['order', ['order']]])(pluginConfig);
}
