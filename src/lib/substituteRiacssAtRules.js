import _ from 'lodash';
import postcss from 'postcss';

function updateSource(nodes, source) {
    return _.tap(Array.isArray(nodes) ? postcss.root({ nodes }) : nodes, (tree) => {
        tree.walk((node) => { node.source = source; });
    });
}

export default function (utilities) {
    return function processor(css) {
        let hasScreensAtRule = false;

        css.walkAtRules('riacss', (atRule) => {
            if (atRule.params === 'utilities') {
                atRule.before(postcss.comment({ text: 'riacss start utilities' }));
                atRule.before(updateSource(utilities, atRule.source));
                atRule.after(postcss.comment({ text: 'riacss end utilities' }));
                atRule.remove();
            }

            if (atRule.params === 'screens') {
                hasScreensAtRule = true;
                atRule.before(postcss.comment({ text: 'riacss start screens' }));
                atRule.after(postcss.comment({ text: 'riacss end screens' }));
            }
        });

        if (!hasScreensAtRule) {
            css.append([
                postcss.comment({ text: 'riacss start screens' }),
                postcss.atRule({ name: 'riacss', params: 'screens' }),
                postcss.comment({ text: 'riacss end screens' }),
            ]);
        }
    };
}
