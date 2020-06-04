import _ from 'lodash';
import Node from 'postcss/lib/node';
import escapeClassName from './escapeClassName';
import parseObjectStyles from './parseObjectStyles';
import wrapWithVariants from './wrapWithVariants';
import generateVariantFunction from './generateVariantFunction';

function parseStyles(styles) {
    if (!Array.isArray(styles)) {
        return parseStyles([styles]);
    }

    return _.flatMap(styles, (style) => (style instanceof Node ? style : parseObjectStyles(style)));
}

export default function (plugins, config) {
    const parsedUtilities = [];
    const variantGenerators = {};

    const getConfigValue = (path, defaultValue) => _.get(config, path, defaultValue);

    plugins.forEach((plugin) => {
        plugin({
            style: (path, defaultValue) => getConfigValue(`style.${path}`, defaultValue),
            variants: (path, defaultValue) => {
                if (Array.isArray(config.variants)) {
                    return config.variants;
                }

                return getConfigValue(`variants.${path}`, defaultValue);
            },
            escape: escapeClassName,
            addUtilities: (utilities, variants = []) => {
                const rules = parseStyles(utilities);

                if (!rules.length) {
                    return;
                }

                parsedUtilities.push(wrapWithVariants(rules, variants));
            },
            addVariant: (name, generator) => {
                variantGenerators[name] = generateVariantFunction(generator);
            },
        });
    });

    return {
        utilities: parsedUtilities,
        variantGenerators,
    };
}
