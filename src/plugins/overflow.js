import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    createUtilityPlugin('overflow', [
        ['overflow', ['overflow']],
        ['overflow-x', ['overflow-x']],
        ['overflow-y', ['overflow-y']],
    ])(pluginConfig);
}
