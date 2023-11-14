## any VS never VS  void && unknown

* Never: 永远不会存在的值类型。一般用在条件语句做安全检查
  * never是每种类型的子类型，但是其他类型都不能分配给never类型
  * never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
* unknown：在未声明或缩小为更具体的类型之前，不允许对未知数进行任何操作
  * 任何类型的值都可以赋值给unknown类型，但是unknown类型的值只能复制给unknown本身和any
* any： 任意类型都可以定义成any.彻底放弃了类型检查。
  * 适用于编程阶段还不清楚类型的变量指定一个类型，这些值可能来自于动态的内容，比如用户输入或第三方代码，这种情况下用any能让它们通过编译阶段的检查。
* void： 没有任何类型。
  * Eg: 一个函数如果没有返回值，那么返回值可以定义为void。
* null & undefined： 默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和 undefined 赋值给 number 类型的

## Type 和 interface 区别

相同点：
* 都可以定义对象和函数
* 都可以扩展extends
  
不同点：
* interface 可以声明合并，即声明了多个同样名称的接口可以合并成一个。但Type不能声明合并。
* Type可以声明：基本类型的别名、联合类型、元祖等类型，但 interface不行，只能用来声明对象类型或方法。
* type 语句中还可以使用typeof获取实例的类型进行赋值
  

## interface 和 Class区别是什么？分别适合什么时候使用？
interface和Class都能定义数据模型，但是
* interface只能用来声明对象类型和方法，不做实现；但Class是类的声明并实现
* interface只在编译时用于类型检查，Class编译完成后。。
  

总结：
* Type 适用于定义类型别名、联合类型、交叉类型等，更适用于组合不同类型；
* interface 主要用于定义对象的类型和结构，支持继承
* Class 提供完整的类型定义和实现，可以在运行时进行实例化和操作。适用于创建具有行为的对象时

## TS 泛型有了解么？如何使用？
泛型简单来说就是类型参数，在定义某些函数、接口和类时，不写死类型，而是改动类型参数的形式，让类型更灵活。

TODO

## const 和 readonly 区别？ enum 和 常量枚举的区别？
* const 用来声明变量，可以防止变量的值被修改； const在运行时检查
* readonly 用来声明属性，可以防止属性被修改；readonly在编译时检查
* 枚举enum 会被编译时会编译成一个对象，可以被当作对象使用
* const 枚举会在 typescript 编译期间被删除，const 枚举成员在使用的地方会被内联进来，避免额外的性能开销
* 常量枚举 只能用常量枚举表达式，并且不同于常规的枚举，常量枚举在编译阶段就会被删除。常量枚举成员在使用的地方会被内联进来，因为常量枚举不允许包含计算成员

## declare, declare global 是什么？
* declare： 定义全局变量、全局函数、全局命名空间、JS modules、class等
* declare global 为全局对象 window 增加新的属性

## keyof 、typeof 关键字的作用
* keyof 索引类型查询操作符，用来获取引用类型的属性名，构成联合类型
* typeof 用来获取一个变量和对象的类型

## typeof、this 在 TS 和 JS中有什么区别？
typeof:
* 在js中获取数据的类型。一般用于判断基本类型除外null， typeof 也可以判断 function函数，但判断 不了Array数组，因为typeof判断数组返回的是Object类型。
* ts中的typeof不仅可以获取数据的类型，还可以在类型上下文中引用变量和属性的类型（类型查询），只能查询变量，不能查询函数调用的。



