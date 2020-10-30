import _ from 'lodash';
import buildMediaQuery from '../utils/buildMediaQuery';

export default function ({ screens }) {
    return function processor(css) {
        css.walkAtRules('screen', (atRule) => {
            const screen = atRule.params;

            if (!_.has(screens, screen)) {
                throw atRule.error(`No \`${screen}\` screen found.`);
            }

            atRule.name = 'media';
            atRule.params = buildMediaQuery(screens[screen]);
        });
    };
}
