# TS 

## 简介
### 优先
* 给JavaScript添加特性的语言扩展，包括类型检查和类型推断等，
* 保证变量正确性并且结合功能，可以提示变量属性和方法，
* 减少开发成本，减少代码维护成本
### 缺点
* 增加额外的代码，而且需要处理各种不匹配的类型
* 增加代码编译过程，从TS编译成标准的JS

## TS基础

### 基础类型
boolean number string array 
* tuple 
* enum
* unknown
* any
* void
* null and undefined
* never
* object
  
### 组合类型
#### 联合类型
多个类型
#### 交叉类型
将类型进行交叉

#### 断言
#### 类型守卫

### 泛型 <>T
泛型的作用是临时占位，之后通过传入来进行类型推导设置
* 泛型是指在定义函数、接口或类的时候，不预先指定具体类型，而是在使用时再指定类型。
* T
  
### 函数类型

### 接口


## TS进阶
### 映射类型
### 可变元祖类型
### 模板字面类型
### this类型

## 项目中的TS配置

## QA
### TS VS JS
JS ∈ TS

* TS是JS的扩展，是JS的超集，同时TS也可以编译成JS执行
* TS可以在编译时就发现问题
* 支持代码静态检测，支持后端语言中的特性（？？？什么特性）

### interface VS Type

* interface 是接口，用于描述以一个对象
* type只是一个类型别名，用于给各种类型定义别名，让TS更简洁、青清晰
* 开发中，一般使用组合或者交叉类型时，用type
* 一般用类的 extends 或 implement时，用 interface

### Hooks中的类型声明

https://mp.weixin.qq.com/s/6PCG52vWzcqHMgLgK1EXYQ 