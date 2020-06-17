import _ from 'lodash';
import createUtilityPlugin, { className } from '../utils/createUtilityPlugin';

export default function (pluginConfig) {
    const {
        addUtilities,
        variants,
        escape,
        style,
    } = pluginConfig;
    const genderator = (value, key) => ({
        [`.${escape(className('border', key, 'borderWidth'))}`]: { 'border-width': `${value}` },
        [`.${escape(className('border-t', key, 'borderWidth'))}`]: {
            border: 0,
            'border-top-width': `${value}`,
        },
        [`.${escape(className('border-r', key, 'borderWidth'))}`]: {
            border: 0,
            'border-right-width': `${value}`,
        },
        [`.${escape(className('border-b', key, 'borderWidth'))}`]: {
            border: 0,
            'border-bottom-width': `${value}`,
        },
        [`.${escape(className('border-l', key, 'borderWidth'))}`]: {
            border: 0,
            'border-left-width': `${value}`,
        },
    });
    const utilities = _.flatMap(style('borderWidth'), genderator);

    addUtilities(utilities, variants('borderWidth'));
    createUtilityPlugin('borderColor', [['border', ['border-color']]])(pluginConfig);
    createUtilityPlugin('borderStyle', [['border', ['border-style']]])(pluginConfig);
    createUtilityPlugin('borderRadius', [['rounded', ['border-radius']]])(pluginConfig);
}
