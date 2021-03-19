import _ from 'lodash';
import postcss from 'postcss';

function updateSource(nodes, source) {
    return _.tap(Array.isArray(nodes) ? postcss.root({ nodes }) : nodes, (tree) => {
        tree.walk((node) => { node.source = source; });
    });
}

export default function (utilities) {
    return function processor(css) {
        css.walkAtRules('atomstarcss', (atRule) => {
            if (atRule.params === 'utilities') {
                atRule.before(updateSource(utilities, atRule.source));
                atRule.remove();
            }
        });
    };
}
