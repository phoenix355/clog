---
tags: 
  - vuepress
  - 个人博客
date: 2020-07-17
author: 帅哥俊呀
location: 广州
---
# vuepress 搭建个人博客
> [VuePress](https://www.vuepress.cn/) 是一款使用 `Vue` 驱动的静态网站生成器，是 `Vue` 的作者 `尤雨溪` 为了方便文档的编写而开发的。VuePress采用的是[Markdown](https://zh.mweb.im/markdown-syntax-guide-full-version-zh.html)语法，这是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。
## 1、全局安装

``` js
# 安装
yarn global add vuepress # 或者：npm install -g vuepress

# 新建目录
mkdir 目录名

```
接着对 `package.json` 进行初始化配置 **(在根目录下进行操作)**
``` js
# 初始化package.json
yarn init -y 或 npm/cnpm init -y
在package.json里面加上:
"scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  }

```
## 2、基本目录结构
按照以下目录结构初始化自己的项目结构

``` js
.
├── docs
│   ├── .vuepress
│   │   ├── public
│   │   └── config.js
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
```
其中`docs/.vuepress/public`是项目的静态资源目录，可以存放自己博客的logo或其他静态资源。 `.vuepress/config.js`是 `VuePress` 网站必要的配置文件。`.md` 文件即是使用`Markdown` 语法编写的文件，通过 `vuepress` 可以将文件的内容渲染成静态的页面。我们在 `docs` 目录下的 `README.md` 随便输入 “#test”，执行 `yarn run dev` 或 `npm run dev` 即可看到：
<a data-fancybox title="test" href="http://static.shengyc.com/1593442242176.png">![test](http://static.shengyc.com/1593442242176.png)</a>

## 3、页面路由
这里我们将 `docs` 目录作为项目的入口，下面所有的“文件的相对路径”都是相对于 `docs` 目录的。页面的路由结构也是从 `docs`目录 往下去寻找 `.md` 文件的相对路径，并以此来构成页面的路由。例如 `docs` 目录下的 `README.md` 就是博客的根路径所在的页面。我们由此得出默认页面路由地址如下：
文件的相对路径 | 页面路径地址
--------- | -------------
`/README.md	` | `/`
`/guide/README.md` | `/guide/`
`/config.md` | `/config.html`
##  4、基本配置
`vuepress` 的配置文件是 `.vuepress/config.js` 它导出的是一个JavaScript对象：

``` js
module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around'
}
```
### 导航栏配置 ([详细配置说明](https://www.vuepress.cn/theme/default-theme-config.html#%E9%A6%96%E9%A1%B5ÏÏ))
你可以通过 `themeConfig.logo` 增加导航栏 Logo ，Logo 可以被放置在公共文件目录：

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    logo: '/assets/img/logo.png',
  }
}
```
或者可以通过 themeConfig.nav 增加一些导航栏链接:


``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ]
  }
}
```
### 侧边栏
想要使 侧边栏（Sidebar）生效，需要配置 `themeConfig.sidebar`，基本的配置，需要一个包含了多个链接的数组：

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: 'Group 1',   // 必要的
        path: '/foo/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/'
        ]
      },
      {
        title: 'Group 2',
        children: [ /* ... */ ]
      }
    ]
  }
}
```
## 5、部署
首先在 `package.json`配置如下的npm scripts:
``` js
{
  "scripts": {
    "docs:build": "vuepress build docs"
  }
}
```
这里只列举部署到在GitHub Pages上的操作步骤，更加其他更加详细的部署方式，请参考[部署](https://www.vuepress.cn/guide/deploy.html)
### 部署到GitHub Pages
1. 在 docs/.vuepress/config.js 中设置正确的 base。如果你打算发布到 `https://<USERNAME>.github.io/`，则可以省略这一步，因为 base 默认即是 "/"。如果你打算发布到 `https://<USERNAME or GROUP>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 base 设置为 `/<REPO>/`。
2. 在你的项目的根目录下，创建一个如下的 deploy.sh 文件：
   ``` js
    #!/usr/bin/env sh
    # 确保脚本抛出遇到的错误
    set -e
    
    # 生成静态文件
    npm run docs:build
    
    # 进入生成的文件夹
    cd docs/.vuepress/dist
    
    # 如果是发布到自定义域名
    # echo 'www.example.com' > CNAME
    
    git init
    git add -A
    git commit -m 'deploy'
    
    # 如果发布到 https://<USERNAME>.github.io
    # git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
    
    # 如果发布到 https://<USERNAME>.github.io/<REPO>
    # git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
    cd -
   ```
   3.在 `package.json` 配置加入如下的npm scripts 可以更快捷的部署：
   ``` js
   {
      "scripts": {
        "deploy": "bash deploy.sh",
      }
    }
   ```
   部署成功即可看到
   ![](http://static.shengyc.com/1594952587435.png)

