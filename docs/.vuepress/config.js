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
                    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js'
            }
        ],
        [
            'script',
            {
                src:
                    'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.js'
            }
        ],
        [
            'link',
            {
                rel: 'stylesheet',
                type: 'text/css',
                href:
                    'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.css'
            }
        ]
    ],
    markdown: {
        lineNumbers: true
    },
    theme: '@vuepress/theme-blog',
    themeConfig: {
        dateFormat: 'YYYY-MM-DD',
        nav: [
            // 导航栏配置
            { text: '首页', link: '/' }
        ],
        footer: {
            contact: [
                {
                    type: 'github',
                    link: 'https://github.com/phoenix355'
                }
            ],
            copyright: [
                {
                  text: 'Privacy Policy',
                  link: 'https://policies.google.com/privacy?hl=en-US',
                },
                {
                  text: 'MIT Licensed | Copyright © 2020-present 版权归帅哥俊所有',
                  link: '',
                },
              ],
        }
    }
}
