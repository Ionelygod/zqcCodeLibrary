// 源码1/24 总结
// 1. 匿名函数 将所有代码都添加到传入的window上, 不污染全局变量 也不会被污染
// 2. 工具代码 类型的判断 类型的转换 引用类型的方法
// 3. 工具函数 高级函数looseEqual 判断两个值是否浅相等 polyfillBind  函数之间的调用  cached  缓存值 闭包

// 源码2/24 总结
// 1. 定义Vue 的变量与配置 全局变量
// 2. Dep vue的核心之一 收集数据 dep相当于把Observer监听到的数据做了一个收集 通过dep.notify()的方法通知 watcher 从而进行视图更新
// 3. VNode 视图更新的最重要的VNode 把template模板编译成VNode 对比之前的新旧VNode 只更新有变化的一部分 提高视图更新速度

// 源码3/24 总结
// 1. Observer vue的核心之一监听数据 Observer的调用过程 initState() --> Observer(data) --> new Observer
// 2. defineReactive 高级函数 定义一个响应式对象 给对象添加getter/setter方法, 用于收集依赖和派发更新
// 3. depend 为对象的属性添加 dep.depend(), 达到监听对象(引用的值)属性的目的
// 4. 配置选项合并策略 父子组件之配置项的合并策略,默认的合并,钩子的合并,filter/props,data合并,以及标准的组件名/props有一个统一化规范写法

// 源码4/24 总结
// 1. 工具代码 辅助函数
// 2. flushCallbacks 挨个执行callbacks里的回调
// 3. nextTick时 会 flushSchedulerQueue(刷新调度器队列)
//      1. 同步方式: 当把data中的name修改之后,此时触发name的setter中的dep.notify通知依赖本data的render watcher去
//        update,update会把flushSchedulerQueue函数传递给nextTick,render watcher在flushSchedulerQueue函数运行时
//        watch.run再走diff -> patch 那一套重渲染re-render视图,这个过程中会重新依赖收集,这个过程是异步的;所以当我们直
//        接修改了name之后打印, 这时异步的改动还没被patch到视图上,所以获取视图上的DOM元素还是原来的内容
//      2. setter前: setter前为什么还打印的是原来的内容呢,是因为nextTick在被调用的时候把回调挨个push进callbacks数组,
//        之后执行的时候也是for循环出来挨个执行,所以是类似于队列这样一个概念,先入先出;在修改name 之后,触发把render
//        watcher填入 schedulerQueue队列并把他的执行函数flushSchedulerQueue传递给nextTick,此时callbacks队列中已经有
//        了setter前函数了,因为这个cb是在setter前函数之后被push进callbacks队列的,那么先入先出的执行callbacks中回调的时
//        候先执行setter前函数,这时并未执行render watcher 的watcher.run,所以打印DOM元素仍然是原来的内容
//      3. setter后: setter后这时已经执行完flushSchedulerQueue,这时render watcher 已经把改动patch到视图上,所以此时
//        获取DOM是改过之后的内容
//      备注: 前文提过,在依赖收集原理的响应式化方法defineReactive中的setter访问器中有派发更新dep.notify()方法,这个方法
//      会挨个通知在dep的subs中收集的订阅自己变动的watchers执行update.
//
