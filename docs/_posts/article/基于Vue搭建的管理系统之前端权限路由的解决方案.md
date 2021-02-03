---
tags: 
  - Vue
  - 路由权限
date: 2021-02-03
author: 帅哥俊呀
location: 广州·天河软件园
---
# 基于Vue搭建的管理系统之前端权限路由的解决方案
> `Vue` 作为当下最为流行的前端框架之一，越来越多的中小型企业选择 `Vue`去搭建他们的管理系统，那么在此类管理系统中，我们应该如何设计前端的权限路由呢？

## 思路
基于在公司的实践方案，这里提出一种解决办法。在路由请求页面之前，`vue-router` 暴露出了一个钩子函数  `router.beforeEach` 我们可以在这个钩子函数去处理我们的权限路由的逻辑，这样我们在路由进入到页面之前就可以获取到该用户所拥有的权限页面。这里用到一个 `vue-router` 一个很重要的API，`router.addRoutes` 它允许我们动态的添加路由表。
## 路由表使用权限code关联
关于如何过滤出用户拥有的权限路由，当初想到了一个很简单的关联方法。一般我们的路由表长这样子：
``` js
const testRoutes = {
    path: '/test',
    name: 'Test',
    component: Test,
    children: [
        {
            path: 'test-child',
            name: 'TestChild',
            component: TestChild
        }
    ]
}
```
如果我们该页面需要权限控制，我们可以在 `meta` 加上 `code`的属性，如下：
``` js
const testRoutes = {
    path: '/test',
    name: 'Test',
    component: Test,
    meta: {
        code:'test'
    },
    children: [
        {
            path: 'test-child',
            name: 'TestChild',
            component: TestChild,
            meta: {
                code: 'test_child
            }
        }
    ]
}
```
## 过滤逻辑
这里我们根据接口返回该用户的权限 `code` 集合去过滤我们关联的 `code` 路由，假设我们的页面路由如上的 `testRoutes`，接口返回的 `code` 集合为 `code_list`：
``` js
function getPermissionPaths(code_list, testRoutes) {
    let _menuPaths = testRoutes.filter(menuItem => {
        if (menuItem.code) {
            return code_list.includes(menuItem.code)
        } else {
            // 如果不存在menuItem.code 说明无需权限也可以展示
            return true
        }
    })

    _menuPaths.forEach(menuItem => {
        if (menuItem.children && menuItem.children.length) {
            menuItem.children = getPermissionPaths(code_list, menuItem.children)
        }
    })
    return Promise.resolve(_menuPaths)
}
```
## 路由守卫进行拦截认证
最后，我们在路由守卫里面把处理好的权限路由动态的添加进 `vue-router`：
``` js
const resetRoute = () => {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // 新路由实例matcer，赋值给旧路由实例的matcher，（相当于replaceRouter）
}
router.beforeEach(async (to, from, next) => {
    ...
    ...
    ...
    let dynamicRoutes = await getPermissionPaths(code_list, testRoutes)    
    resetRoute()
    router.addRoutes(dynamicRoutes)
})
```
## 总结
以上方法逻辑仅仅是简单的归纳，具体逻辑需要根据实际的业务场景去调整。