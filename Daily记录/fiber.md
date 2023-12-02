编译时
编译时js代码会被转成ast对象树， ast节点里的jsx标签节点会被替换成React.createElement(type, config, children)的调用节点, 创建一个中间对象：
const element = {
  $$typeof: REACT_ELEMENT_TYPE, // 固定标识， 凡是createElement创建的对象都有这个值
  type: type,// 函数或class或'div'字符串
  key: key,
  ref: ref,
  props: props,
  _owner: owner,// 创建自己的组件是谁
};
然后将ast反转成js即得到可直接在浏览器里运行的js代码
运行时
mount时

mount时会:
1.先创建FiberRoot节点做整个应用的根节点并与div#root相互引用, 
2.然后以 当前节点->第一个子节点的方式从<App />标签开始深度优先递归逐个创建fiber节点、同时记录新props、记录新state, ，当遍历完最左下的节点后
3.以下一个同级节点 -> 没有下一个同级节点就回到上级节点`的方式创建 fiber节点， 同时记录firstEffect、nextEffect和lastEffect以备做dom的增删移位操作,这个时候会创建dom并赋属性、只是不会append到页面上而是挂到fiber的stateNode上。这时会产生父子节点的相互引用、同级节点对下一个同级节点的引用
4.fiber树构建完成后遍历rootFiber节点的firstEffect一次性commit更新dom完成渲染，然后将fiber树赋值给fiberRoot的current属性：
第2、3步在17版本是异步可中断的、称为reconciler， 第4步是不可中断的、称为commit。fiber和HTMLElement之间有相互引用。
fiber节点简化结构:
type Fiber = {
  key: null | string, // key
  type: any, // class或函数或'div'字符串
  stateNode: any, // class实例或真实dom, 函数组件没有stateNode
  return: Fiber | null, // 父fiber
  child: Fiber | null,  // 第一个子fiber
  sibling: Fiber | null,  // 下一个同级fiber
  ref:
    | null
    | (((handle: mixed) => void) & {_stringRef: ?string, ...})
    | RefObject, // ref
  pendingProps: any,  // 新的props
  memoizedProps: any, // 旧的props
  updateQueue: mixed, // 更新队列, 比如setState操作不会直接reRender组件而是把更新放这里调度时批量执行
  memoizedState: any, // 已更新到组件上的state
  nextEffect: Fiber | null, // 要执行dom操作的下一个节点
  firstEffect: Fiber | null,  // 要执行dom操作的第一个节点
  lastEffect: Fiber | null, // 要执行dom操作的最后一个节点
  // 对自身副本的引用
  alternate: Fiber | null,
|};
update时(如setState导致的更新)
1.setState不会直接去reRender组件, 而是先将setState的参数构建为一个Updater对象放到该组件fiber的updateQueue上， 然后到了调度时间从根节点开始重新构建一个fiber树workInProgress,当workInProgress树构建完成就会一次性提交渲染到页面上, 然后将workInProgress树赋值给fiberRoot的current属性，再将workInProgress变量赋为null。这就是setState异步执行的原因。
reconciler如何实现可中断
let nextUnitOfWork: fiber = null;

function workLoop(deadLine) {
    while(nextUnitOfWork && deadline.timeRemaing) {
       nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }
    if(!nextUnitOfWork) {
        completeWork()
    }
    requestIdleCallback(workLoop)
}

function performUnitOfWork(nextUnitOfWork) {
    // 先diff state和props， 决定当前组件是更新还是删除还是移位
    //  然后
    if(nextUnitOfWork.child) {
        return nextUnitOfWork.child;
    }
    if(nextUnitOfWork.sibling) {
        return nextUnitOfWork.sibling;
    }

    while(nextUnitOfWork.return) {
        if(nextUnitOfWork.return.sibling) {
            return nextUnitOfWork.return.sibling;
        }
        nextUnitOfWork = nextUnitOfWork.return
    }
}



function beginWork() {
    nextUnitOfWork = AppFiber
    requestIdleCallback(workLoop)
}
上面的代码是简化版的， 但是大致原理是这样
react diff算法
react diff 算法基于3个假设， 从而将diff时间复杂度从O(n^3)降为O(n):
1.Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计。
2.拥有相同类的两个组件 生成相似的树形结构
3.对于同一层级的一组子节点，通过唯一key区分。
也就是说， react diff时只会进行同级节点之间的比较， 不会进行跨层级节点之间的比较。key的作用是key不同时可以直接删除整个元素而不需要继续递归往下diff。
react diff 流程:
[图片]
遍历新节点列表, 从第一个节点开始在旧列表中查找新节点的index, lastIndex开始时为0
- 当index > lastIndex时，将index的值赋值给lastIndex
- 当index = lastIndex时，不操作
- 当index < lastIndex时，将当前节点移动到newIndex的位置
- 如果index找不到, 那在lastIndex后面插入一个节点并将lastIndex += 1
最后遍历完后:
1.旧节点列表中lastIndex后面的元素都是需要删除的,
2.遍历一遍旧节点列表,旧节点列表中在新节点列表中找不到的节点要删除;
3.新节点列表在lastIndex后面的都是要新增的。
各生命周期函数执行时机:
reconciler完成之后:
1.getSnapShotBeforeUpdate、getDerivedStateFromProps
2.commit更新dom
3.componentWillUnmount，useEffect和useLayoutEffect的销毁函数,useEffect、useLayoutEffect、setState的的执行，componentDidMount、componentDidUpdate
总结
实际上react执行流程极度复杂, 有scheduler调度更新过程，有reconciler调和fiber树， 有renderer做渲染， 有各种context和mode， 还有lanes和expirationTime标识更新优先级，我只看了一部分，这里只讲了一部分。
