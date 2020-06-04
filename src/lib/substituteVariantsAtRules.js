import _ from 'lodash';
import postcss from 'postcss';
import selectorParser from 'postcss-selector-parser';
import generateVariantFunction from '../utils/generateVariantFunction';

function generatePseudoClassVariant(pseudoClass, selectorPrefix = pseudoClass) {
    return generateVariantFunction(({ modifySelectors, separator }) => {
        return modifySelectors(({ selector }) => {
            return selectorParser((selectors) => {
                selectors.walkClasses((sel) => {
                    sel.value = `${selectorPrefix}${separator}${sel.value}`;
                    sel.parent.insertAfter(sel, selectorParser.pseudo({ value: `:${pseudoClass}` }));
                });
            }).processSync(selector);
        });
    });
}

function ensureIncludesDefault(variants) {
    return variants.includes('default') ? variants : ['default', ...variants];
}

const defaultVariantGenerators = {
    default: generateVariantFunction(() => {}),
    hover: generatePseudoClassVariant('hover'),
    focus: generatePseudoClassVariant('focus'),
    active: generatePseudoClassVariant('active'),
    visited: generatePseudoClassVariant('visited'),
    disabled: generatePseudoClassVariant('disabled'),
    first: generatePseudoClassVariant('first-child', 'first'),
    last: generatePseudoClassVariant('last-child', 'last'),
    odd: generatePseudoClassVariant('nth-child(odd)', 'odd'),
    even: generatePseudoClassVariant('nth-child(even)', 'even'),
};

export default function (config, { variantGenerators: pluginVariantGenerators }) {
    return function processor(css) {
        const variantGenerators = {
            ...defaultVariantGenerators,
            ...pluginVariantGenerators,
        };

        css.walkAtRules('variants', (atRule) => {
            const variants = postcss.list.comma(atRule.params).filter((variant) => variant !== '');

            if (variants.includes('responsive')) {
                const responsiveParent = postcss.atRule({ name: 'responsive' });
                atRule.before(responsiveParent);
                responsiveParent.append(atRule);
            }

            _.forEach(_.without(ensureIncludesDefault(variants), 'responsive'), (variant) => {
                if (!variantGenerators[variant]) {
                    throw new Error(
                        `Your config mentions the "${variant}" variant, but "${variant}" doesn't appear to be a variant. Did you forget or misconfigure a plugin that supplies that variant?`,
                    );
                }
                variantGenerators[variant](atRule, config);
            });

            atRule.remove();
        });
    };
}
