import postcss from 'postcss';
import postcssNested from 'postcss-nested';
import postcssJs from 'postcss-js';

export default function parseObjectStyles(styles) {
    return postcss([
        postcssNested({
            bubble: ['screen'],
        }),
    ]).process(styles, {
        parser: postcssJs,
    }).root.nodes;
}
