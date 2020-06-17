import _ from 'lodash';
import buildMediaQuery from '../utils/buildMediaQuery';

export default function ({ theme }) {
    return function processor(css) {
        css.walkAtRules('screen', (atRule) => {
            const screen = atRule.params;

            if (!_.has(theme.screens, screen)) {
                throw atRule.error(`No \`${screen}\` screen found.`);
            }

            atRule.name = 'media';
            atRule.params = buildMediaQuery(theme.screens[screen]);
        });
    };
}