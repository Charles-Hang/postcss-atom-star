// import postcss from 'postcss';
// import _ from 'lodash';

export default function (getConfig) {
    return function processor() {
        console.log(getConfig());
        // const config = getConfig();
        // const processedPlugins = processPlugins([
        //     ...corePlugins(config),
        //     ...config.plugins],
        //     config
        // );

        // return postcss([
        // ]).process(css, { from: _.get(css, 'source.input.file') });
        // return css;
    };
}
