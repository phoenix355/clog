/*
 * @Description: 
 * @Autor: 帅哥俊呀
 * @Date: 2020-06-28 22:05:31
 * @LastEditors: 帅哥俊呀
 * @LastEditTime: 2020-07-17 10:36:01
 */ 
module.exports = {
    base: '/clog/',
    title: '钟先生的个人博客',
    description: 'Just playing around',
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],
        [
            'script',
            {
                src:
                    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js',
            },
        ],
        [
            'script',
            {
                src:
                    'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.js',
            },
        ],
        [
            'link',
            {
                rel: 'stylesheet',
                type: 'text/css',
                href:
                    'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.css',
            },
        ],
    ],
    markdown: {
        lineNumbers: true,
    },
    theme: '@vuepress/theme-blog',
    themeConfig: {
        nav: [
            // 导航栏配置
            { text: '首页', link: '/' },
            { text: '文章', link: '/guide/' },
        ],
        globalPagination: {
            prevText: '上一頁', 
            nextText: '下一頁',
            lengthPerPage: '2',
            layout: 'Pagination',
        },
    },
}
