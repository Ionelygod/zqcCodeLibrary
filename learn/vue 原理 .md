vue 双向数据绑定的原理是
vue.js 是采用数据劫持结合发布者-订阅者模式的方式,通过Object.defineProperty()来劫持各个属性的setter,    
getter,在数据变动时发布消息给订阅者,触发响应的监听回调。主要分为以下几个步骤:
```markdown
1. 需要observe的数据对象进行递归遍历,包括子属性对象的属性,都加上setter和getter这样的话,给这个对象的  
某个值赋值,就会触发setter,就能监听到数据的变化
2. compile 解析模板指令,将模板中的变量替换成数据,然后初始化渲染页面视图,并将每个指令对应的节点绑定  
更新函数,添加监听数据的订阅者,一旦数据有变动,收到通知,更新视图
3. Watcher订阅者是Observe和Compile之间通信的桥梁,主要做的事情是:①在自身实例化时往属性订阅器(dep)  
里面添加自己 ②自身必须有一个update()方法③待属性变动dep.notice()通知时,能调用自身的update()方法,并  
触发Compile中绑定的回调
4. MVVM作为数据绑定的入口,整合Observer、Compile和Watcher三者,通过Observe来监听自己的model数据  
变化,通过Compile来解析编译模板指令,最终利用Watcher搭起Observe和Compile之间的通信桥梁,达到数据变化->  
视图更新;视图交互变化(input)-> 数据model变更的双向绑定效果。
```
vue 初始化页面闪动
使用vue开发 

