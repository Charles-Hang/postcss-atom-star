import _ from 'lodash';
import postcss from 'postcss';
import purgecss from '@fullhuman/postcss-purgecss';
import chalk from 'chalk';

function log(...msgs) {
    console.log('  ', ...msgs);
}

function removeRiacssComments(css) {
    css.walkComments((comment) => {
        switch (comment.text.trim()) {
        case 'riacss start utilities':
        case 'riacss start screens':
        case 'riacss end utilities':
        case 'riacss end screens':
            comment.remove();
            break;
        default:
            break;
        }
    });
}

export default function purgeUnusedUtilities(config) {
    const purgeEnabled = _.get(
        config,
        'purge.enabled',
        config.purge !== false && config.purge !== undefined && process.env.NODE_ENV === 'production',
    );

    if (!purgeEnabled) {
        return removeRiacssComments;
    }

    // Skip if `purge: []` since that's part of the default config
    if (Array.isArray(config.purge) && config.purge.length === 0) {
        log();
        log(
            chalk.yellow(
                'Riacss is not purging unused styles because no template paths have been provided.',
            ),
        );
        log(
            chalk.white(
                ' If you have manually configured PurgeCSS outside of Riacss or are deliberately not\n      removing unused styles, set `purge: false` in your Riacss config file to silence\n      this warning.',
            ),
        );
        return removeRiacssComments;
    }

    return postcss([
        function processor(css) {
            css.prepend(postcss.comment({ text: 'purgecss start ignore' }));
            css.append(postcss.comment({ text: 'purgecss end ignore' }));

            css.walkComments((comment) => {
                switch (comment.text.trim()) {
                case 'riacss start utilities':
                case 'riacss start screens':
                    comment.text = 'purgecss end ignore';
                    break;
                case 'riacss end utilities':
                case 'riacss end screens':
                    comment.text = 'purgecss start ignore';
                    break;
                default:
                    break;
                }
            });
        },
        purgecss({
            content: Array.isArray(config.purge) ? config.purge : config.purge.content,
            defaultExtractor: (content) => {
                // Capture as liberally as possible, including things like `h-(screen-1.5)`
                const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];

                // Capture classes within other delimiters like .block(class="w-1/2") in Pug
                const innerMatches = content.match(/[^<>"'`\s.(){}[\]#=%]*[^<>"'`\s.(){}[\]#=%:]/g) || [];

                return broadMatches.concat(innerMatches);
            },
            ...config.purge.options,
        }),
    ]);
}
