import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    createUtilityPlugin('padding', [
        ['p', ['padding']],
        ['px', ['padding-left', 'padding-right']],
        ['py', ['padding-top', 'padding-bottom']],
        ['pt', ['padding-top']],
        ['pr', ['padding-right']],
        ['pb', ['padding-bottom']],
        ['pl', ['padding-left']],
    ])(pluginConfig);
}
