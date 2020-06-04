import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    createUtilityPlugin('margin', [
        ['m', ['margin']],
        ['mx', ['margin-left', 'margin-right']],
        ['my', ['margin-top', 'margin-bottom']],
        ['mt', ['margin-top']],
        ['mr', ['margin-right']],
        ['mb', ['margin-bottom']],
        ['ml', ['margin-left']],
    ])(pluginConfig);
}
