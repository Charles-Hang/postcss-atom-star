import postcss from 'postcss';
import _ from 'lodash';
import processPlugins from './utils/processPlugins';
import plugins from './plugins';
import substituteRiacssAtRules from './lib/substituteRiacssAtRules';
import substituteScreenAtRules from './lib/substituteScreenAtRules';
import substituteClassApplyAtRules from './lib/substituteClassApplyAtRules';
import evaluateRiacssFunctions from './lib/evaluateRiacssFunctions';


export default function (getConfig) {
    return function processor(css) {
        const config = getConfig();
        const processedPlugins = processPlugins([...plugins, ...config.plugins], config);

        return postcss([
            substituteRiacssAtRules(processedPlugins.utilities),
            evaluateRiacssFunctions(config),
            substituteScreenAtRules(config),
            substituteClassApplyAtRules(processedPlugins.utilities),
        ]).process(css, { from: _.get(css, 'source.input.file') });
    };
}
