# PostCSS Tiger Ria

一个postcss插件，获得原子化的css开发体验，能极大缩减最终css文件的大小。借鉴于[tailwindcss]

[tailwindcss]: https://tailwindcss.com/

<!-- TOC -->

- [PostCSS Tiger Ria](#postcss-tiger-ria)
    - [安装](#安装)
    - [vscode补全提示插件](#vscode补全提示插件)
    - [文档](#文档)
        - [基本使用](#基本使用)
            - [工具类](#工具类)
            - [@apply](#apply)
            - [@screen](#screen)
            - [变体](#变体)
        - [配置](#配置)
            - [purge](#purge)
            - [separator](#separator)
            - [theme](#theme)
                - [theme.screens](#themescreens)
            - [style](#style)
            - [variants](#variants)
            - [plugins](#plugins)
                - [自定义工具类](#自定义工具类)
                - [自定义变体](#自定义变体)
        - [原理](#原理)

<!-- /TOC -->

## 安装

```
npm i -D postcss-tiger-ria
```
依赖于[postcss]，将本插件加入postcss插件列表即可
```diff
// example postcss.config.js
module.exports = {
    plugins: [
+   require('postcss-tiger-ria'),
        require('autoprefixer')
    ]
}
```

[postcss]: https://github.com/postcss/postcss#usage

## vscode补全提示插件

vscode下提供了补全提示插件[ria css autocomplete vscode]

[ria css autocomplete vscode]: https://marketplace.visualstudio.com/items?itemName=tiger-hswx.ria-css-autocomplete-vscode

## 文档

### 基本使用

#### 工具类

本postcss插件的核心功能便是通过配置文件，按原子化的思想生成工具类以供开发使用，例如
```jsx
{/* react组件中 */}
<div className="p-24 rounded">
    <h3 className="font-16 text-black">title</h3>
    <p className="text-gray">this is a message.</p>
</div>
```
其中，p-24 -> padding: 24px， rounded -> border-radius: 4px，font-16 -> font-size: 16px，text-black -> text-color: #333，text-gray -> text-color: #888e98，开发时顺着思路将这些基础的工具类写出即可，可通过配置文件修改及添加新的工具类，配置相关的说明后面会具体再说

开启这一功能需要在你的样式文件中写入`@riacss utilities;`，便会在这个位置插入你所需的工具类：
```css
/* 你的样式文件 */
/* 生成的工具类会插入到这个位置 */
@riacss utilities;
```

#### @apply

也可在你的样式文件中使用工具类：
```css
.btn {
    @apply font-bold py-8 px-16 rounded;
    /* custom css */
}
.btn-blue {
    @apply bg-blue text-white;
    /* custom css */
}

/* 或者 */
.btn {
    @apply font-bold;
    @apply py-8;
    @apply px-16;
    @apply rounded;
    /* custom css */
}
.btn-blue {
    @apply bg-blue;
    @apply text-white;
    /* custom css */
}
```
不支持!important的功能

#### @screen

提供了一种便捷的响应式媒体查询使用方式：
```css
@screen md {
    .btn {
        @apply font-bold py-8 px-16 rounded;
        /* custom css */
    }
    /* custom css */
}

/* 相当于 */

@media (min-width: 640px) {
    .btn {
        @apply font-bold py-8 px-16 rounded;
        /* custom css */
    }
    /* custom css */
}
```
md为配置文件中theme.screens中的项，(min-width: 640px)为md的配置，配置相关的说明后面会具体再说

#### 变体

单纯的工具类无法满足伪类及响应式的需求场景，故产生了变体这一形式：
```jsx
{/* react组件中 */}

{/* 响应式变体 */}
{/*  默认宽16，中等屏幕宽32，大屏宽48 */}
<img className="w-16 md:w-32 lg:w-48" src="...">

{/* 伪类变体*/}
{/* 默认透明背景蓝色字体，hover时蓝色背景白色字体 */}
<button className="bg-transparent text-blue hover:bg-blue hover:text-white">
    hover me
</button>
```
变体形如：{变体前缀}{分隔符}{工具类名}，有个例外，响应式变体还有这种使用方式：{响应式变体前缀}{分隔符}{其他变体前缀}{分隔符}{工具类名}，如md:hover:text-blue既中等屏hover时字体为蓝色

需注意使用@apply时不能引用变体：
```css
.btn {
    /* 不能引入变体 */
    @apply hover:text-blue;
}
```

默认情况下生成的响应式变体会插入到css文件的末尾，如果想指定生成的位置可以这样：
```css
/* 你的样式文件 */
/* 响应式变体生成的位置*/
@riacss screens;
```
还可以配置添加自己个性化的变体，配置相关的说明后面会具体再说

### 配置

默认情况下，会在你的项目根目录寻找名为riacss.config.js的配置文件，也可以自定义配置文件路径
```js
// postcss.config.js
module.exports = {
    plugins: [
        require('postcss-tiger-ria')('./riacss-config.js'),
    ],
}
```
```js
// 举例你的配置文件
module.exports = {
    purge: [],
    separator: ':',
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
        },
        extend: {
        colors: {
            font: {
            cyan: '#9cdbff',
            },
        },
        screens: {
            xxl: '1400px',
        },
        },
    },
    style: {
        display: {
        hidden: 'none',
        block: 'block',
        'inline-block': 'inline-block',
        inline: 'inline',
        flex: 'flex',
        'inline-flex': 'inline-flex',
        },
        zIndex: (theme) => theme('size.zIndex'),
    },
    variants: {
        color: ['responsive', 'hover'],
    },
    plugins: [],
}
```

#### purge

purge用于配置如何移除本插件生成但是无用的css，用了 [PurgeCSS] 这个工具，purge默认为空数组

[PurgeCSS]: https://purgecss.com/

当purge为数组时表示purgecss的content配置，当为对象时：
```js
purge: {
    // purgecss功能是否开启，默认情况下只在生产环境开启
    enabled: true,
    // purgecss的content配置
    content: ['./src/**/*.tsx', './src/**/*.ts'],
    // purgecss的其他配置
    options: {
        // 如白名单
        whitelist: ['text-blue', 'p-24'],
    }
},
```
为保证能正确移除无用css，应避免用拼接的方式使用工具类：
```jsx
{/* 错误 */}
<div className={`text-${error ? 'red' : 'green'}`}></div>
{/* 正确 */}
<div className={error ? 'text-read' : 'text-green'}></div>
```
#### separator

separator是生成变体时用的分隔符，默认配置为`:`

#### theme

theme是生成工具类用到的定制主题，theme的属性的定义会直接覆盖默认配置，如果只是想拓展而不是覆盖则使用extend来配置即可，如上面的例子，theme中除了screens的结构不可变外（用于响应式变体的生成），其他的可随意配置

默认配置为：
```js
theme: {
    screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
    },
    colors: {
        font: {
            // 主题色
            blue: '#4c84ff',
            // 对应设计规范主文字色值
            black: '#324580',
            // 对应设计规范二级文字色值
            gray: '#9da6c3',
            // 对应设计规范三级文字色值
            'gray-light': '#c4cadb',
            green: '#41d9a6',
            red: '#ff8080',
            purple: '#9e63f0',
            yellow: '#ffba1a',
        },
        background: {
            transparent: 'transparent',
            // 对应设计规范背景色值
            'gray-light': '#f8fafc',
            gray: '#f3f6fb',
            blue: '#e9f0ff',
            green: '#e8faf4',
            red: '#ffefef',
            purple: '#f4f0fd',
            yellow: '#fff6e4',
        },
        border: {
            gray: '#f5f7f9',
            blue: '#4c84ff',
            red: '#ff8080',
        },
    },
    spacing: {
        marginPadding: {
            0: '0',
            4: '4px',
            6: '6px',
            8: '8px',
            10: '10px',
            12: '12px',
            16: '16px',
            20: '20px',
            24: '24px',
            40: '40px',
        },
        content: {
            auto: 'auto',
            full: '100%',
            14: '14px',
            18: '18px',
            20: '20px',
            24: '24px',
            32: '32px',
            64: '64px',
        },
    },
    size: {
        font: {
            12: '12px',
            13: '13px',
            14: '14px',
            16: '16px',
            18: '18px',
            20: '20px',
            24: '24px',
        },
        leading: {
            normal: '1.5',
            24: '24px',
            32: '32px',
            64: '64px',
        },
        zIndex: {
            0: '0',
            1: '1',
            2: '2',
            100: '100',
            200: '200',
            500: '500',
            1000: '1000',
        },
    },
},
```
##### theme.screens

screens配置的属性名就是生成响应式变体的前缀及@screen便捷媒体查询的参数。属性值则有一下几种配法：
```js
// riacss.config.js
module.exports = {
    theme: {
        screens: {
            'sm': '640px',
            // => @media (min-width: 640px) { ... }

            'md': {'min': '768px', 'max': '1023px'},
            // => @media (min-width: 768px) and (max-width: 1023px) { ... }

            'lg': {'max': '1024px'},
            // => @media (max-width: 1024px) { ... }

            'xl': [
                {'min': '1200px', 'max': '1400px'},
                {'min': '1500px'}
            ],
            // => @media (min-width: 1200px) and (max-width: 1400px), (min-width: 1500px) { ... }

            'portrait': {'raw': '(orientation: portrait)'},
            // => @media (orientation: portrait) { ... }
        }
    }
}
```

#### style

style是生成工具类的具体定义，style对象里的键名不可更改，只可配置属性值。style里的属性值既可以是对象也可以是个方法，方法的参数就是用于获取theme配置的方法，如上面的例子。所以可以看出theme是服务于style的，工具类的生成上按一定的规则，key拼在类名中，key为`default`时表示不拼接，若就想拼default则使用`-default`代替，value拼在属性中，下面是默认的配置说明
```js
// 默认的style配置
style: {
    // .${key} { display: ${value}}
    display: {
        hidden: 'none',
        block: 'block',
        'inline-block': 'inline-block',
        inline: 'inline',
        flex: 'flex',
        'inline-flex': 'inline-flex',
    },
    // .overflow-${key} { overflow: ${value}}
    // .overflow-x-${key} { overflow-x: ${value}}
    // .overflow-y-${key} { overflow-y: ${value}}
    overflow: {
        auto: 'auto',
        hidden: 'hidden',
        visible: 'visible',
        scroll: 'scroll',
    },
    // .${key} { position: ${value}}
    position: {
        static: 'static',
        relative: 'relative',
        absolute: 'absolute',
        fixed: 'fixed',
    },
    /**
     * .top-${key} { top: ${value}}
     * .right-${key} { right: ${value}}
     * .bottom-${key} { bottom: ${value}}
     * .left-${key} { left: ${value}}
     */
    positionSpacing: {
        0: '0',
    },
    // .${key} { visibility: ${value}}
    visibility: {
        visible: 'visible',
        invisible: 'hidden',
    },
    // .z-${key} { z-index: ${value}}
    zIndex: (theme) => theme('size.zIndex'),
    // .flex-${key} { flex: ${value}}
    flex: {
        1: '1 1 0%',
        auto: '1 1 auto',
        initial: '0 1 auto',
        none: 'none',
    },
    // .flex-${key} { flex-direction: ${value}}
    flexDirection: {
        row: 'row',
        'row-reverse': 'row-reverse',
        col: 'column',
        'col-reverse': 'column-reverse',
    },
    // .flex-${key} { flex-wrap: ${value}}
    flexWrap: {
        wrap: 'wrap',
        'wrap-reverse': 'wrap-reverse',
        'no-wrap': 'nowrap',
    },
    // .flex-shrink-${key} { flex-shrink: ${value}}
    flexShrink: {
        0: '0',
        default: '1',
    },
    // .flex-grow-${key} { flex-grow: ${value}}
    flexGrow: {
        0: '0',
        default: '1',
    },
    // .items-${key} { align-items: ${value}}
    alignItems: {
        start: 'flex-start',
        end: 'flex-end',
        center: 'center',
        baseline: 'baseline',
        stretch: 'stretch',
    },
    // .content-${key} { align-content: ${value}}
    alignContent: {
        start: 'flex-start',
        end: 'flex-end',
        center: 'center',
        between: 'space-between',
        around: 'space-around',
    },
    // .justify-${key} { justify-content: ${value}}
    justifyContent: {
        start: 'flex-start',
        end: 'flex-end',
        center: 'center',
        between: 'space-between',
        around: 'space-around',
    },
    // .self-${key} { align-self: ${value}}
    alignSelf: {
        auto: 'auto',
        start: 'flex-start',
        end: 'flex-end',
        center: 'center',
        stretch: 'stretch',
        baseline: 'baseline',
    },
    // .order-${key} { order: ${value}}
    order: {
        first: '-9999',
        last: '9999',
    },
    /**
     * .m-${key} { margin: ${value}}
     * .mx-${key} { margin-left: ${value}; margin-right: ${value}}
     * .my-${key} { margin-top: ${value}; margin-bottom: ${value}}
     * .mt-${key} { margin-top: ${value}}
     * .mr-${key} { margin-right: ${value}}
     * .mb-${key} { margin-bottom: ${value}}
     * .ml-${key} { margin-left: ${value}}
     */
    margin: (theme) => ({
        auto: 'auto',
        ...theme('spacing.marginPadding'),
    }),
    /**
     * .p-${key} { padding: ${value}}
     * .px-${key} { padding-left: ${value}; padding-right: ${value}}
     * .py-${key} { padding-top: ${value}; padding-bottom: ${value}}
     * .pt-${key} { padding-top: ${value}}
     * .pr-${key} { padding-right: ${value}}
     * .pb-${key} { padding-bottom: ${value}}
     * .pl-${key} { padding-left: ${value}}
     */
    padding: (theme) => theme('spacing.marginPadding'),
    // .w-${key} { width: ${value}}
    width: (theme) => theme('spacing.content'),
    // .h-${key} { height: ${value}}
    height: (theme) => theme('spacing.content'),
    // .font-${key} { font-size: ${value}}
    fontSize: (theme) => theme('size.font'),
    // .font-${key} { font-weight: ${value}}
    fontWeight: {
        normal: '400',
        bold: '600',
    },
    // .leading-${key} { line-height: ${value}}
    lineHeight: (theme) => theme('size.leading'),
    // .text-${key} { text-align: ${value}}
    textAlign: {
        left: 'left',
        center: 'center',
        right: 'right',
        baseline: 'baseline',
    },
    // .align-${key} { vertical-align: ${value}}
    verticalAlign: {
        top: 'top',
        middle: 'middle',
        bottom: 'bottom',
    },
    // .whitespace-${key} { white-space: ${value}}
    whitespace: {
        normal: 'normal',
        'no-wrap': 'nowrap',
        pre: 'pre',
        'pre-line': 'pre-line',
        'pre-wrap': 'pre-wrap',
    },
    // .${key} { overflow-wrap: ${value}}
    overflowWrap: {
        'break-words': 'break-word',
    },
    // .${key} { word-break: ${value}}
    wordBreak: {
        'break-all': 'break-all',
    },
    // .text-${key} { color: ${value}}
    color: (theme) => theme('colors.font'),
    // .bg-${key} { background-attachment: ${value}}
    backgroundAttachment: {
        fixed: 'fixed',
        scroll: 'scroll',
    },
    // .bg-${key} { background-position: ${value}}
    backgroundPosition: {
        left: 'left',
        center: 'center',
        right: 'right',
        top: 'top',
        bottom: 'bottom',
    },
    // .bg-${key} { background-repeat: ${value}}
    backgroundRepeat: {
        'no-repeat': 'no-repeat',
    },
    // .bg-${key} { background-size: ${value}}
    backgroundSize: {
        auto: 'auto',
        cover: 'cover',
        contain: 'contain',
        full: '100% 100%',
        'full-auto': '100%',
    },
    // .bg-${key} { background-color: ${value}}
    backgroundColor: (theme) => theme('colors.background'),
    /**
     * .border-${key} { border-width: ${value}}
     * .border-t-${key} { border: 0, border-top-width: ${value}}
     * .border-r-${key} { border: 0, border-right-width: ${value}}
     * .border-b-${key} { border: 0, border-bottom-width: ${value}}
     * .border-l-${key} { border: 0, border-left-width: ${value}}
     */
    borderWidth: {
        default: '1px',
        0: '0',
    },
    // .border-${key} { border-color: ${value}}
    borderColor: (theme) => theme('colors.border'),
    // .border-${key} { border-style: ${value}}
    borderStyle: {
        solid: 'solid',
        dashed: 'dashed',
        dotted: 'dotted',
    },
    // .rounded-${key} { border-radius: ${value}}
    borderRadius: {
        default: '4px',
        none: '0',
        full: '9999px',
    },
    // .cursor-${key} { cursor: ${value}}
    cursor: {
        auto: 'auto',
        default: 'default',
        pointer: 'pointer',
        move: 'move',
        'not-allow': 'not-allowed',
    },
    // .outline-${key} { outline: ${value}}
    outline: {
        none: '0',
    },
    // .resize-${key} { resize: ${value}}
    resize: {
        default: 'both',
        none: 'none',
    },
}
```
除了上面的类还有一个:
```css
.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```

#### variants

variants则是生成变体的配置，当variants设为一个对象时，属性应与style配置中的属性保持一致，属性值为需要开启变体的数组如`['responsive', 'hover']`表示开启hover变体与响应式变体，支持的变体目前有：responsive，hover，focus，active，visited，disabled，first（first-child），last（last-child），odd（nth-child（odd）），even（nth-child（even））。伪类变体在配置数组中的顺序就是实际插入到css文件中的顺序。

可以为所有的工具类设置一样的变体：
```js
// riacss.config.js
module.exports  = {
    variants: ['responsive', 'hover', 'first', 'odd', 'event']
}
```
指定工具类不启用变体：
```js
// riacss.config.js
module.exports  = {
    variants: {
        // 配置空数组即可关闭overflow相关工具类的变体功能
        overflow: []
    }
}
```
还可以通过特殊的default变体控制原始工具类相对于变体的生成位置，默认原始工具类会在所有变体之前：
```js
// riacss.config.js
module.exports = {
    variants: {
        backgroundColor: ['hover', 'default', 'focus'],
    },
}
```
```css
/* 生成的 CSS */

.hover\:bg-black:hover { background-color: #000 }
.hover\:bg-white:hover { background-color: #fff }
/* ... */

.bg-black { background-color: #000 }
.bg-white { background-color: #fff }
/* ... */

.focus\:bg-black:focus { background-color: #000 }
.focus\:bg-white:focus { background-color: #fff }
/* ... */
```
默认配置为：
```js
variants: {
    display: ['responsive'],
    overflow: ['responsive'],
    position: ['responsive'],
    positionSpacing: ['responsive'],
    visibility: ['responsive'],
    zIndex: ['responsive'],
    flex: ['responsive'],
    flexDirection: ['responsive'],
    flexWrap: ['responsive'],
    flexShrink: ['responsive'],
    flexGrow: ['responsive'],
    alignItems: ['responsive'],
    alignContent: ['responsive'],
    justifyContent: ['responsive'],
    alignSelf: ['responsive'],
    order: ['responsive'],
    margin: ['responsive'],
    padding: ['responsive'],
    width: ['responsive'],
    height: ['responsive'],
    fontSize: ['responsive'],
    fontWeight: ['responsive'],
    lineHeight: ['responsive'],
    textAlign: ['responsive'],
    verticalAlign: ['responsive'],
    whitespace: ['responsive'],
    overflowWrap: ['responsive'],
    wordBreak: ['responsive'],
    color: ['responsive', 'hover'],
    backgroundAttachment: ['responsive'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    backgroundColor: ['responsive', 'hover'],
    borderWidth: ['responsive', 'hover'],
    borderColor: ['responsive', 'hover'],
    borderStyle: ['responsive'],
    borderRadius: ['responsive'],
    cursor: ['responsive'],
    outline: ['responsive'],
    resize: ['responsive'],
},
```
#### plugins

plugins是用于自定义工具类与变体的插件，默认为空数组
```js
// riacss.config.js
module.exports = {
    plugins: [
        function({ addUtilities, addVariant, escape, config, style, variants }) {
            // 自定义插件内容
        },
    ]
}
```
`addUtilities()`用于添加自定义工具类

`addVariant()`用于添加自定义变体

`escape()`用于转义要在类名中使用的字符串

`config()`用于获取配置文件的信息如config('theme.screens')

`style()`用于获取配置文件里style的信息如style('display')

`variants()`用于获取配置文件里variants的信息如variants('position')，获取变体的配置应始终用variants方法，不能用config方法

##### 自定义工具类

```js
// riacss.config.js
module.exports = {
    plugins: [
        function({ addUtilities }) {
            const newUtilities = {
                '.rotate-0': {
                transform: 'rotate(0deg)',
                },
                '.rotate-90': {
                transform: 'rotate(90deg)',
                },
                '.rotate-180': {
                transform: 'rotate(180deg)',
                },
                '.rotate-270': {
                transform: 'rotate(270deg)',
                },
            }

            addUtilities(newUtilities, ['responsive', 'hover'])
        }
    ]
}
```
addUtilities第一个参数是你自定义的工具类的样式对象，遵循CSS-in-JS的语法，也支持类似Sass的嵌套用法。也可以是样式对象的数组

addUtilities第二个参数是变体的配置

##### 自定义变体

以disabled伪类变体为例：
```js
// riacss.config.js
module.exports = {
    plugins: [
        function({ addVariant, escape }) {
            addVariant('disabled', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.${escape(`disabled${separator}${className}`)}:disabled`
                })
            })
        }
    ]
}
```
addVariant第一个参数是变体的名字，可用于variants配置中

addVariant第二个参数是变体的生成方法，modifySelectors用于将工具类名变为变体形式，separator是配置中的分隔符

### 原理

现在以textAlign工具类及['responsive', 'hover']的变体配置为例阐述本插件的执行过程：
```css
/* 原始css文件 */

.description {
    @apply text-left;
}
@screen lg {
    .description {
        @apply text-right;
    }
}
@riacss utilities
```
第一步：找到@riacss utilities atRule并替换为包含工具类的@variants resposive, hover atRule
```css
.description {
    @apply text-left;
}
@screen lg {
    .description {
        @apply text-right;
    }
}
@variants responsive, hover {
    .text-left {
        text-align: left
    }

    .text-center {
        text-align: center
    }

    .text-right {
        text-align: right
    }

    .text-baseline {
        text-align: baseline
    }
}
```
第二步: 将@variants resposive, hover atRule转换为包含工具类和hover变体的@responsive atRule
```css
.description {
    @apply text-left;
}
@screen lg {
    .description {
        @apply text-right;
    }
}
@responsive {
    .text-left {
        text-align: left
    }
    .text-center {
        text-align: center
    }
    .text-right {
        text-align: right
    }
    .text-baseline {
        text-align: baseline
    }
    .hover\:text-left:hover {
        text-align: left
    }
    .hover\:text-center:hover {
        text-align: center
    }
    .hover\:text-right:hover {
        text-align: right
    }
    .hover\:text-baseline:hover {
        text-align: baseline
    }
}
```
第三步: 将@responsive atRule转换为工具类、hover变体以及响应式变体（即相应的媒体查询样式）
```css
.description {
    @apply text-left;
}
@screen lg {
    .description {
        @apply text-right;
    }
}
.text-left {
    text-align: left
}
.text-center {
    text-align: center
}
.text-right {
    text-align: right
}
.text-baseline {
    text-align: baseline
}
.hover\:text-left:hover {
    text-align: left
}
.hover\:text-center:hover {
    text-align: center
}
.hover\:text-right:hover {
    text-align: right
}
.hover\:text-baseline:hover {
    text-align: baseline
}
@media (min-width: 640px) {
    .sm\:text-left {
        text-align: left
    }
    .sm\:text-center {
        text-align: center
    }
    .sm\:text-right {
        text-align: right
    }
    .sm\:text-baseline {
        text-align: baseline
    }
    .sm\:hover\:text-left:hover {
        text-align: left
    }
    .sm\:hover\:text-center:hover {
        text-align: center
    }
    .sm\:hover\:text-right:hover {
        text-align: right
    }
    .sm\:hover\:text-baseline:hover {
        text-align: baseline
    }
}
@media (min-width: 768px) {
    .md\:text-left {
        text-align: left
    }
    .md\:text-center {
        text-align: center
    }
    .md\:text-right {
        text-align: right
    }
    .md\:text-baseline {
        text-align: baseline
    }
    .md\:hover\:text-left:hover {
        text-align: left
    }
    .md\:hover\:text-center:hover {
        text-align: center
    }
    .md\:hover\:text-right:hover {
        text-align: right
    }
    .md\:hover\:text-baseline:hover {
        text-align: baseline
    }
}
@media (min-width: 1024px) {
    .lg\:text-left {
        text-align: left
    }
    .lg\:text-center {
        text-align: center
    }
    .lg\:text-right {
        text-align: right
    }
    .lg\:text-baseline {
        text-align: baseline
    }
    .lg\:hover\:text-left:hover {
        text-align: left
    }
    .lg\:hover\:text-center:hover {
        text-align: center
    }
    .lg\:hover\:text-right:hover {
        text-align: right
    }
    .lg\:hover\:text-baseline:hover {
        text-align: baseline
    }
}
@media (min-width: 1280px) {
    .xl\:text-left {
        text-align: left
    }
    .xl\:text-center {
        text-align: center
    }
    .xl\:text-right {
        text-align: right
    }
    .xl\:text-baseline {
        text-align: baseline
    }
    .xl\:hover\:text-left:hover {
        text-align: left
    }
    .xl\:hover\:text-center:hover {
        text-align: center
    }
    .xl\:hover\:text-right:hover {
        text-align: right
    }
    .xl\:hover\:text-baseline:hover {
        text-align: baseline
    }
}
```
第四步：将@screen lg atRule转换为对应的@media atRule
```css
.description {
    @apply text-left;
}
@media (min-width: 1024px) {
    .description {
        @apply text-right;
    }
}
.text-left {
    text-align: left
}
.text-center {
    text-align: center
}
.text-right {
    text-align: right
}
.text-baseline {
    text-align: baseline
}
.hover\:text-left:hover {
    text-align: left
}
.hover\:text-center:hover {
    text-align: center
}
.hover\:text-right:hover {
    text-align: right
}
.hover\:text-baseline:hover {
    text-align: baseline
}
@media (min-width: 640px) {
    .sm\:text-left {
        text-align: left
    }
    .sm\:text-center {
        text-align: center
    }
    .sm\:text-right {
        text-align: right
    }
    .sm\:text-baseline {
        text-align: baseline
    }
    .sm\:hover\:text-left:hover {
        text-align: left
    }
    .sm\:hover\:text-center:hover {
        text-align: center
    }
    .sm\:hover\:text-right:hover {
        text-align: right
    }
    .sm\:hover\:text-baseline:hover {
        text-align: baseline
    }
}
@media (min-width: 768px) {
    .md\:text-left {
        text-align: left
    }
    .md\:text-center {
        text-align: center
    }
    .md\:text-right {
        text-align: right
    }
    .md\:text-baseline {
        text-align: baseline
    }
    .md\:hover\:text-left:hover {
        text-align: left
    }
    .md\:hover\:text-center:hover {
        text-align: center
    }
    .md\:hover\:text-right:hover {
        text-align: right
    }
    .md\:hover\:text-baseline:hover {
        text-align: baseline
    }
}
@media (min-width: 1024px) {
    .lg\:text-left {
        text-align: left
    }
    .lg\:text-center {
        text-align: center
    }
    .lg\:text-right {
        text-align: right
    }
    .lg\:text-baseline {
        text-align: baseline
    }
    .lg\:hover\:text-left:hover {
        text-align: left
    }
    .lg\:hover\:text-center:hover {
        text-align: center
    }
    .lg\:hover\:text-right:hover {
        text-align: right
    }
    .lg\:hover\:text-baseline:hover {
        text-align: baseline
    }
}
@media (min-width: 1280px) {
    .xl\:text-left {
        text-align: left
    }
    .xl\:text-center {
        text-align: center
    }
    .xl\:text-right {
        text-align: right
    }
    .xl\:text-baseline {
        text-align: baseline
    }
    .xl\:hover\:text-left:hover {
        text-align: left
    }
    .xl\:hover\:text-center:hover {
        text-align: center
    }
    .xl\:hover\:text-right:hover {
        text-align: right
    }
    .xl\:hover\:text-baseline:hover {
        text-align: baseline
    }
}
```
第五步：将@apply atRule转换为对应的declaration
```css
.description {
    text-align: left;
}
@media (min-width: 1024px) {
    .description {
        text-align: right;
    }
}
.text-left {
    text-align: left
}
.text-center {
    text-align: center
}
.text-right {
    text-align: right
}
.text-baseline {
    text-align: baseline
}
.hover\:text-left:hover {
    text-align: left
}
.hover\:text-center:hover {
    text-align: center
}
.hover\:text-right:hover {
    text-align: right
}
.hover\:text-baseline:hover {
    text-align: baseline
}
@media (min-width: 640px) {
    .sm\:text-left {
        text-align: left
    }
    .sm\:text-center {
        text-align: center
    }
    .sm\:text-right {
        text-align: right
    }
    .sm\:text-baseline {
        text-align: baseline
    }
    .sm\:hover\:text-left:hover {
        text-align: left
    }
    .sm\:hover\:text-center:hover {
        text-align: center
    }
    .sm\:hover\:text-right:hover {
        text-align: right
    }
    .sm\:hover\:text-baseline:hover {
        text-align: baseline
    }
}
@media (min-width: 768px) {
    .md\:text-left {
        text-align: left
    }
    .md\:text-center {
        text-align: center
    }
    .md\:text-right {
        text-align: right
    }
    .md\:text-baseline {
        text-align: baseline
    }
    .md\:hover\:text-left:hover {
        text-align: left
    }
    .md\:hover\:text-center:hover {
        text-align: center
    }
    .md\:hover\:text-right:hover {
        text-align: right
    }
    .md\:hover\:text-baseline:hover {
        text-align: baseline
    }
}
@media (min-width: 1024px) {
    .lg\:text-left {
        text-align: left
    }
    .lg\:text-center {
        text-align: center
    }
    .lg\:text-right {
        text-align: right
    }
    .lg\:text-baseline {
        text-align: baseline
    }
    .lg\:hover\:text-left:hover {
        text-align: left
    }
    .lg\:hover\:text-center:hover {
        text-align: center
    }
    .lg\:hover\:text-right:hover {
        text-align: right
    }
    .lg\:hover\:text-baseline:hover {
        text-align: baseline
    }
}
@media (min-width: 1280px) {
    .xl\:text-left {
        text-align: left
    }
    .xl\:text-center {
        text-align: center
    }
    .xl\:text-right {
        text-align: right
    }
    .xl\:text-baseline {
        text-align: baseline
    }
    .xl\:hover\:text-left:hover {
        text-align: left
    }
    .xl\:hover\:text-center:hover {
        text-align: center
    }
    .xl\:hover\:text-right:hover {
        text-align: right
    }
    .xl\:hover\:text-baseline:hover {
        text-align: baseline
    }
}
```
若配置并开启了purge并且项目中只使用了text-left和md:text-center则最后一步去除没有用到的css，最终css样式为：
```css
.description {
    text-align: left;
}
@media (min-width: 1024px) {
    .description {
        text-align: right;
    }
}
.text-left {
    text-align: left;
}
@media (min-width: 768px) {
    .md\:text-center {
        text-align: center;
    }
}
```