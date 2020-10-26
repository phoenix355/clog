---
tags: 
  - JavaScript
  - 数据类型
date: 2020-07-30
author: 帅哥俊呀
location: 广州图书馆
---
# JavaScrict 的数据类型
> `JavaScript` 中的变量具有多种 **数据类型**：数值（number）、字符串（string)、数组（array）、对象（object）、布尔值（boolean）、undefined（undefined）、null（null）、函数（function）。
## 五大原始类型：Number、String、Boolean、Undefined、Null。
> 我们可以使用typeof 运算符对数据的类型进行检测辨别，typeof可以检测出number、string、boolean、undefined、object、function
### Number
JavaScript的数值包括整数和浮点数两个部分，整数即没有带小数的数值，浮点数是至少带一位小数即小数点后面至少还有一位整数。对于浮点数超大或超小的数值我们也可以使用科学计数法来表示。

``` js
// 整数
var intNum = 88;
console.log(typeof intNum) // number

// 浮点数 
var floatNum = 88.8;
console.log(typeof floatNum) //number

// 超大的浮点数
var y = 123e5;      // 12300000

// 超小的浮点数 
var z = 123e-5;     // 0.00123
```
### String
`JavaScript` 中的字符串即是使用英文的双引号或单引号包裹起来的主体：
``` js
var stringTestSingel = 'hello world'
var stringTestDouble = "hello world"
console.log(typeof stringtestSingel) // string
```
字符串可以使用 `+` 运算符行拼接，在`JavaScript` 中加法的运算过程是从左往右进行计算的，在对数值和字符串的拼接的时候需要注意它们的拼接顺序，不同的顺序会输出不同的结果：
``` js
var string1 = 'hello'
var string2 = 'world'
var num1 = 1
var num2 = 2

console.log(string1 + string2) // 'helloworld'
console.log(num1 + strgin1 + string2 + num2) // '1helloworld2'
console.log(num1 + num2 + string1 + string2) // 3helloworld
``` 
我们可以使用减法或 `JavaScripe `原始方法 将字符串转化为number类型：
``` js
// 使用减法
console.log('2' - 0, typeof('2' - 0)) // 2 number

// 使用number()方法
console.log(Number('2'),typeof(Number('2'))) // 2 number

// parseFloat(), parseInt()
console.log(parseFloat('2'), parseInt('2.77')) // 2 2
```
### Boolean
布尔值只有两个值，通常被用在条件的测试中：
``` js
var x = true
var y = false

console.log(typeof x) // boolean
```
我们可以将其他的数据类型转化成布尔值，`undefined` 和 `null`转化的布尔值为 `false` 其他的为 `true`。
### Undefined
当一个变量被定义而没有初始化的时候这个变量的值就是`undefined`，一个函数没有返回值，默认会返回 `undefined`，使用 `typeof` 去检测时候还是会返回 `undefined`。
``` js
var a;
console.log(a) // undefined

var fn = function() {};
coneole.log(fn()) // undefined
cocnsole.log(undefined)
```
### Null
在 `JavaScript` 中 `null` 表示一个不存在的事物，但是它的数据类型却是对象，可以看做是JavaScript` 的一个bug。我们可以通过给变量设置为`null` 或 `undefind` 清空对象。
``` js
var name = null
console.log(typeof null) //object
```

## 引用类型（Array、Object）
> `JavaScript` 的引用类型是指拥有某些属性方法并且可以手动添加属性的数据类型。

### Array
数组其实是一种特殊的对象，数组中的每一项可以是不同的变量类型如：对象、字符串、数值甚至是数组等，数组的索引是从0开始的。
``` js
var array = [{name:'hello'},'string',2,[{name:'world'},'text']]

//new 一个新的数组对象
var array1 = new Array();
console.log(array[0].name + '' + array[2][0].name) // hello world
console.log(typeof array1) // array
```
### Object
几乎所有的对象都是 `Object` 构造函数的一个实例，当我们使用构造函数方法创建一个对象，我们可以从 `Object.prototype` 继承属性方法：

    * 如果输入的值是 `null` 或 `undefined` 则会返回一个空对象 
    * 如果输入的是一个基础类型，就会返回一个输入类型包装的对象
    * 如果传进去的是引用类型的值，仍然会返回这个值，经他们复制的变量保有和源对象相同的引用地址
    
当以非构造函数形式调用时，`Object` 的行为相当于 `new Object()`。



