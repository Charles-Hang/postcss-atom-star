import postcss from 'postcss';

export default function css(nodes) {
    return postcss.root({ nodes }).toString();
}
