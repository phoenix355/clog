---
tags: 
  - let
  - var
date: 2020-07-28
author: 帅哥俊呀
location: 广州图书馆
---
# let和var之间的区别
## 作用域的不同
* `var` 定义的变量的作用域是离变量 **最近的那个方法内**

    ``` js
        forTestVar() {
            for(var i = 0;i < 2;i++) {
                console.log(i)
            }
            console.log('result：' + i)
        }
        forTestVar()
    ```
    输入的结果如下：
    ```
    0
    1
    result：2
    ```
    对于 `i` 来说 `forTestVar` 这个函数是它最近的作用域，所以我们可以在 `for` 的循环体外还可以访问到 `i` 的值。
* `let` 定义的变量的作用域是在离它最近的块级作用域里面，用上面的例子去阐释如下： 
    ``` js
        forTestLet() {
            for(let i = 0;i < 2;i++) {
                console.log(i)
            }
            console.log('result：' + i)
        }
        forTestLet()
    ```
    输入的结果如下：
    ```
    0
    1
    ReferenceError: i is not defined
    ```
    这是因为 使用 `let` 定义的 `i` 的作用域是在 `for` 这个循环里之内。
* 经典面试题
    ``` js
    function forTestDiffOnVarAndLet() {
            for(var i = 0;i < 2;i++) {
                setTimeout(() => {
                    console.log(i)
                }, 0)
            }
        }
        forTestDiffOnVarAndLet() // 2 2 输出两遍 "2"
    ```
    `setTimeout` 是宏任务事件，每次循环的时候被加入 `js` 的任务队列，`i` 每次循环加一是同步的。同步事件执行完，`js` 线程才会执行任务队列里的宏任务，由于 `var` 定义的变量在整个函数体内是生效的，`js` 在执行宏任务的时候 `i` 的值已经是 "2" 所以会连续输入两次 "2"。 使用 `let` 定义的变量将会输入以下结果：
 ``` js
function forTestDiffOnVarAndLet() {
        for(let i = 0;i < 2;i++) {
            setTimeout(() => {
                console.log(i)
            }, 0)
        }
    }
    forTestDiffOnVarAndLet() // 0 1
```
首先 `let` 定义的变量 `i` 生效的作用域是在 `setTimeOut` 这个定时器里面而不是在外层的 `for` 循环体，每次循环的时候 `i` 被 `let` 重新的定义，循环体里面 `i` 即为每次定义的 `i` 的值。可以这样理解，每次循环 `let` 都为 `i` 定义了一个新的变量块。
## var 存在变量提升
使用var 定义的变量在同个作用域下是具有变量提升，体现如下：
``` js
 function forTestVar() {
        console.log(hello) // undefined
        var hello
    }
    forTestVar()
```
这里强调的是同一个作用域，如果不属于同一个作用域则会报错：
``` js
function wrapperFn() {
        console.log(hello) // ReferenceError: hello is not defined
        function forTestVar() {
            console.log(hello)
            var hello
        }
        forTestVar()
    }
    wrapperFn();
```
若使用 `let` 定义的变量，未定义就使用则会报错：
``` js
function forTestLet() {
        console.log(hello) // // Uncaught ReferenceError: Cannot access 'hello' before initialization
        let hello
    }
    forTestLet()
```
如果一个定义一个未声明的变量，则这个变量将转化为全局的变量(在非严格模式下)：
``` js
function forTestUndeFined() {
        hello = 'hello'
        console.log(window.hello) // "hello"
    }
    forTestUndeFined()
```
## 在相同的作用域下let不允许重新声明同一个变量
在函数体内的同一个作用域下面 `let` 不允许声明同一个变量：
``` js
function forTestLet(arg) {
        let arg; // Identifier 'arg' has already been declared
    }
    forTestLet()
```
在函数体内的不同作用域下面 `let` 允许声明同一个变量：
``` js
function forTestLet(arg) {  
        console.log(arg) // 2
        {
            let arg = 5
            console.log(arg) // 5
        }
    }
    forTestLet(2) //依次输出 2、5
```