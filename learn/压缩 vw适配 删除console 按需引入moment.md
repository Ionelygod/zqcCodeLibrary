启用压缩
--------------
配置`compression-webpack-plugin`  
`yarn add cpmpression-webpack-plugin -D`  
在vue.config.js 文件中配置  
```javascript
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isPord = process.env.NODE_ENV === 'production'
module.exports = {
  configureWebpack: config => {
    if(isPord){
      // 配置webpack 压缩
      config.plugin.push(new CompressionWebpackPlugin({
        test: /\.js$|\.html$|\.css$/,
        // 超过4KB
        threshold:4096                       
       }))
    }
  }
}
```
### 移动端适配

*    *    *
vw适配  ：首先安装 `postcss-px-to-viewport`插件  
`yarn add postcss-ps-to-viewport -D`  
在项目根目录下新建文件 postcss.config.js 写入以下代码
```javascript
module.exports = {
  plugins:{
    autoprefixer: {},
    'postcss-px-to-viewport':{
      //视窗的宽度, 对应的是我们设计稿的宽度
      viewportWidth:375,
      // 视窗的高度 根据750设备的宽度来指定  一般指定1334 也可以不配置
      viewportHeight:1334,
      // 指定 'px' 转换为视窗单位值的小数位数
      unitPrecision:3,
      viewportUnit:'vw',
      // 指定不转换为视窗单位的类,可以自定义,可以无限添加,建议使用一到两个通用的变量
      selectorBlackList:['.ignore'],
      // 小于等于'1px' 不转换为视窗单位,
      minPixelValue:1,
      // 允许在媒体中查询中转换‘px’
      mediaQuery:false
    }
  }
}
```
### 忽略目录,让 moment 变得更小
在vue.config.js 文件中 需要添加一下代码 需要用到webpack.IgnorePlugin 
```javascript
const webpack = require('webpack')
module.exports = {
  chainWebpack: config => {
    // 优化moment 去掉国际化内容
    config
     .plugin('ignore')
     // 忽略/moment/locale下的所有文件 
     .use(new webpack.IgnorePlugin(/^\.\/locale$/,/moment$/))
  }
}
```
虽然按照上面的方法忽略了包含‘./locale/‘该字段路径下的文件目录 但是我们使用的时候也不能显示中文语言了
想使用某一种语言时应
```javascript
import moment from 'moment'
// 手动引入所需要的的语言包
import 'moment/loacle/zh-cn';
//指定使用的语言
moment.locale('zh-cn');
// 更推荐使用更轻量级的 day.js 代替moment
```
### 生产环境删除console.log
>安装插件 `babel-plugin-transform-remove-console` 插件
> - yarn add babel-plugin-transform-remove-console -D

> 配置babel.config.js
> 文件中添加以下代码
```javascript
// 所有生产环境
const prodPlugin = []
if (process.env.NODE_ENV === 'production'){
  // 如果是生产环境,则自动清理掉打印的日志,但保留error 与 warn
  prodPlugin.push([
    'transform-remove-console',
    {
    // 保留console.error 和 console.warn
    exclude:['error','warn']
    }
  ])
} 
module.exports = {
  plugins:[
    ...prodPlugin
  ]
}
```
