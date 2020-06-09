import _ from 'lodash';
import createUtilityPlugin from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    const {
        addUtilities,
        variants,
        escape,
        style,
    } = pluginConfig;
    const genderator = (value, key) => ({
        [`.${key === 'default' ? 'border' : escape(`border-${key}`)}`]: { 'border-width': `${value}` },
        [`.${key === 'default' ? 'border-t' : escape(`border-t-${key}`)}`]: {
            border: 0,
            'border-top-width': `${value}`,
        },
        [`.${key === 'default' ? 'border-r' : escape(`border-r-${key}`)}`]: {
            border: 0,
            'border-right-width': `${value}`,
        },
        [`.${key === 'default' ? 'border-b' : escape(`border-b-${key}`)}`]: {
            border: 0,
            'border-bottom-width': `${value}`,
        },
        [`.${key === 'default' ? 'border-l' : escape(`border-l-${key}`)}`]: {
            border: 0,
            'border-left-width': `${value}`,
        },
    });
    const utilities = _.flatMap(style('borderWidth'), genderator);

    addUtilities(utilities, variants('borderWidth'));
    createUtilityPlugin('borderWidth', [['border', ['border-width']]])(pluginConfig);
    createUtilityPlugin('borderColor', [['border', ['border-color']]])(pluginConfig);
    createUtilityPlugin('borderStyle', [['border', ['border-style']]])(pluginConfig);
    createUtilityPlugin('borderRadius', [['rounded', ['border-radius']]])(pluginConfig);
}
