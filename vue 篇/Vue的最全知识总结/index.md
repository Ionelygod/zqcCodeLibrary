#### prop验证,和默认值
 我们在父组件给子组件传值的时候,可以指定该props的默认值及类型,当传递数据类型不正确的时候,vue会发出警告
 ```vue
props:{
  visible:{
    default:true, // 默认值
    type: Boolean, // 值的类型
    required: true // 必须项
  },
},

```

#### 请说一下封装vue 组件的过程
首先,组件可以提升整个项目的开发效率.能够把页面抽象成多个相对独立的模块,解决了我们传统项目开发:
效率低, 难维护,复用性的问题  
使得更加的灵活,使用Vue.extend创建一个组件,然后使用Vue.component的方式注册组件。
子组件需要值,可以从props定义接受,当子组件修改好数据想传回父组件时,可以使用$emit('方法名',值)的方式

#### Vue.js 的template编译
简而言之, 就是先编译成AST树(抽象语法树),再得到rander函数返回VNode(Vue的虚拟DOM节点),
详情步骤如下
>首先通过compile编译器把template编译成AST语法树(abstract syntax tree即源代码的抽象语法结构的树状表达形式),
compile是createCompiler的返回值,createCompiler是用以创建编译器的. 另外compile还负责合并option  
>然后,AST会经过generate(将AST语法树转化成render function字符串的过程)得到render函数,render的返回值是VNode,VNode是Vue的虚拟DOM节点,里面有(标签名,子节点,文本等等)


