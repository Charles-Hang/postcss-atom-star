import postcss from 'postcss';
import _ from 'lodash';
import processPlugins from './utils/processPlugins';
import plugins from './plugins';
import substituteAtomstarcssAtRules from './lib/substituteAtomstarcssAtRules';
import substituteScreenAtRules from './lib/substituteScreenAtRules';
import substituteClassApplyAtRules from './lib/substituteClassApplyAtRules';
import evaluateAtomstarcssFunctions from './lib/evaluateAtomstarcssFunctions';


export default function (getConfig) {
    return function processor(css) {
        const config = getConfig();
        const processedPlugins = processPlugins([...plugins, ...config.plugins], config);

        return postcss([
            substituteAtomstarcssAtRules(processedPlugins.utilities),
            evaluateAtomstarcssFunctions(config),
            substituteScreenAtRules(config),
            substituteClassApplyAtRules(processedPlugins.utilities),
        ]).process(css, { from: _.get(css, 'source.input.file') });
    };
}
