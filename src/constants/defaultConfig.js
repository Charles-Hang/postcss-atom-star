const defaultConfig = {
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
                white: '#fff',
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
                white: '#fff',
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
    style: {
        display: {
            hidden: 'none',
            block: 'block',
            'inline-block': 'inline-block',
            inline: 'inline',
            flex: 'flex',
            'inline-flex': 'inline-flex',
        },
        overflow: {
            auto: 'auto',
            hidden: 'hidden',
            visible: 'visible',
            scroll: 'scroll',
        },
        position: {
            static: 'static',
            relative: 'relative',
            absolute: 'absolute',
            fixed: 'fixed',
        },
        positionSpacing: {
            0: '0',
        },
        visibility: {
            visible: 'visible',
            invisible: 'hidden',
        },
        zIndex: (theme) => theme('size.zIndex'),
        flex: {
            1: '1 1 0%',
            auto: '1 1 auto',
            initial: '0 1 auto',
            none: 'none',
        },
        flexDirection: {
            row: 'row',
            'row-reverse': 'row-reverse',
            col: 'column',
            'col-reverse': 'column-reverse',
        },
        flexWrap: {
            wrap: 'wrap',
            'wrap-reverse': 'wrap-reverse',
            'no-wrap': 'nowrap',
        },
        flexShrink: {
            0: '0',
            default: '1',
        },
        flexGrow: {
            0: '0',
            default: '1',
        },
        alignItems: {
            start: 'flex-start',
            end: 'flex-end',
            center: 'center',
            baseline: 'baseline',
            stretch: 'stretch',
        },
        alignContent: {
            start: 'flex-start',
            end: 'flex-end',
            center: 'center',
            between: 'space-between',
            around: 'space-around',
        },
        justifyContent: {
            start: 'flex-start',
            end: 'flex-end',
            center: 'center',
            between: 'space-between',
            around: 'space-around',
        },
        alignSelf: {
            auto: 'auto',
            start: 'flex-start',
            end: 'flex-end',
            center: 'center',
            stretch: 'stretch',
            baseline: 'baseline',
        },
        order: {
            first: '-9999',
            last: '9999',
        },
        margin: (theme) => ({
            auto: 'auto',
            ...theme('spacing.marginPadding'),
        }),
        padding: (theme) => theme('spacing.marginPadding'),
        width: (theme) => theme('spacing.content'),
        height: (theme) => theme('spacing.content'),
        fontSize: (theme) => theme('size.font'),
        fontWeight: {
            normal: '400',
            bold: '600',
        },
        lineHeight: (theme) => theme('size.leading'),
        textAlign: {
            left: 'left',
            center: 'center',
            right: 'right',
            baseline: 'baseline',
        },
        verticalAlign: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom',
        },
        whitespace: {
            normal: 'normal',
            'no-wrap': 'nowrap',
            pre: 'pre',
            'pre-line': 'pre-line',
            'pre-wrap': 'pre-wrap',
        },
        overflowWrap: {
            'break-words': 'break-word',
        },
        wordBreak: {
            'break-all': 'break-all',
        },
        color: (theme) => theme('colors.font'),
        backgroundAttachment: {
            fixed: 'fixed',
            scroll: 'scroll',
        },
        backgroundPosition: {
            left: 'left',
            center: 'center',
            right: 'right',
            top: 'top',
            bottom: 'bottom',
        },
        backgroundRepeat: {
            'no-repeat': 'no-repeat',
        },
        backgroundSize: {
            auto: 'auto',
            cover: 'cover',
            contain: 'contain',
            full: '100% 100%',
            'full-auto': '100%',
        },
        backgroundColor: (theme) => theme('colors.background'),
        borderWidth: {
            default: '1px',
            0: '0',
        },
        borderColor: (theme) => theme('colors.border'),
        borderStyle: {
            solid: 'solid',
            dashed: 'dashed',
            dotted: 'dotted',
        },
        borderRadius: {
            default: '4px',
            none: '0',
            full: '9999px',
        },
        cursor: {
            auto: 'auto',
            '-default': 'default',
            pointer: 'pointer',
            move: 'move',
            'not-allow': 'not-allowed',
        },
        outline: {
            none: '0',
        },
        resize: {
            default: 'both',
            none: 'none',
        },
    },
    plugins: [],
};

export default defaultConfig;
