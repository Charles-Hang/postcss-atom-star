import identity from 'lodash/identity';
import fromPairs from 'lodash/fromPairs';
import toPairs from 'lodash/toPairs';
import castArray from 'lodash/castArray';

export function className(classPrefix, key, defaultPrefix) {
    if (key === 'default') {
        return classPrefix || defaultPrefix;
    }

    if (key === '-default') {
        return `${classPrefix}-default`;
    }

    if (!classPrefix) {
        return key;
    }

    return `${classPrefix}-${key}`;
}

export default function createUtilityPlugin(styleKey, utilityVariations) {
    return function utilityPlugin({
        escape, addUtilities, variants, style,
    }) {
        const utilities = utilityVariations.map(
            ([classPrefix, properties, transformValue = identity]) => fromPairs(
                toPairs(style(styleKey)).map(([key, value]) => [
                    `.${escape(className(classPrefix, key, styleKey))}`,
                    fromPairs(
                        castArray(properties).map((property) => [property, transformValue(value)]),
                    ),
                ]),
            ),
        );

        return addUtilities(utilities, variants(styleKey));
    };
}
