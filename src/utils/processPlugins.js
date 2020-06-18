import _ from 'lodash';
import Node from 'postcss/lib/node';
import escapeClassName from './escapeClassName';
import parseObjectStyles from './parseObjectStyles';

function parseStyles(styles) {
    if (!Array.isArray(styles)) {
        return parseStyles([styles]);
    }

    return _.flatMap(styles, (style) => (style instanceof Node ? style : parseObjectStyles(style)));
}

export default function (plugins, config) {
    const parsedUtilities = [];

    const getConfigValue = (path, defaultValue) => _.get(config, path, defaultValue);

    plugins.forEach((plugin) => {
        plugin({
            config: getConfigValue,
            style: (path, defaultValue) => getConfigValue(`style.${path}`, defaultValue),
            escape: escapeClassName,
            addUtilities: (utilities) => {
                const rules = parseStyles(utilities);

                if (!rules.length) {
                    return;
                }

                parsedUtilities.push(rules);
            },
        });
    });

    const utilities = _.flatMap(parsedUtilities);

    return {
        utilities,
    };
}
