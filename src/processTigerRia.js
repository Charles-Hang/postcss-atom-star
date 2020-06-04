import postcss from 'postcss';
import _ from 'lodash';
import processPlugins from './utils/processPlugins';
import plugins from './plugins';
import substituteRiacssAtRules from './lib/substituteRiacssAtRules';
import substituteVariantsAtRules from './lib/substituteVariantsAtRules';
import substituteResponsiveAtRules from './lib/substituteResponsiveAtRules';
import substituteScreenAtRules from './lib/substituteScreenAtRules';
import substituteClassApplyAtRules from './lib/substituteClassApplyAtRules';
import purgeUnusedStyles from './lib/purgeUnusedStyles';


export default function (getConfig) {
    return function processor(css) {
        const config = getConfig();
        const processedPlugins = processPlugins([...plugins, ...config.plugins], config);

        return postcss([
            substituteRiacssAtRules(processedPlugins.utilities),
            substituteVariantsAtRules(config, processedPlugins),
            substituteResponsiveAtRules(config),
            substituteScreenAtRules(config),
            substituteClassApplyAtRules(processedPlugins.utilities),
            purgeUnusedStyles(config),
        ]).process(css, { from: _.get(css, 'source.input.file') });
    };
}
