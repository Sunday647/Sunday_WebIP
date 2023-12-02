/** EventBus
 *  发布-订阅模式
 * 多个模块A、B、C订阅了一个事件3EventX，
 * 模块A在事件总线发布了这个事件，那么事件总线会通知所有订阅者A、B|C，他们都能收到这个通知消息，
 * 同时传递参数
 */
class EventBus {
  constructor() {
    this.eventObj = {};
  }
  publish(eventName, ...args) {
    //取出当前事件所有的回调函数
    const callbackList = this.eventObj(eventName);
    if(callbackList.length === 0) {
      return console.log('event not found');
    }
    //执行每一个回调函数
    for(let callback of callbackList) {
      callback(...args);
    }
  }
  //订阅事件
  subscribe(evenName, callback) {
    if(!this.eventObj[evenName]) {
      //使用对象存储，注销回调函数的时候提高删除的效率
      this.eventObj[eventName] = [];
    }
    //存储订阅者的回调函数
    this.evenObj[eventName].push(callback);
  }
  // 取消订阅
  unsubscribe() {

  }
}
// 测试
const eventBus = new EventBus();
// 订阅事件eventX
eventBus.subscribe("eventX", (obj, num) => {
  console.log("模块A", obj, num);
});
eventBus.subscribe("eventX", (obj, num) => {
  console.log("模块B", obj, num);
});
eventBus.subscribe("eventX", (obj, num) => {
  console.log("模块C", obj, num);
});

// 发布事件eventX
eventBus.publish("eventX", { msg: "EventX published!" }, 1);










