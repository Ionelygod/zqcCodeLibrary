#### 项目中对axios进行二次封装
单纯的axios插件并不能满足我们日常的使用,因此我们使用时,需要根据项目实际的情况  
来对axios进行二次封装.
对axios的二次封装主要分三部分,请求之前、返回响应以及使用等。
### 1.请求之前
    一般的接口都会有鉴权认证(token)之类的,因此在接口的请求头里面,我们需要带上token值以通过  
    服务器的鉴权认证. 但是如果每次请求的时候再去添加,不仅会大大的加大工作量,而且很容易出错  
    好在axios提供了拦截器机制,可以再请求的拦截器中可以添加token
```javascript
// 请求拦截
axios.interceptors.request.use((config) => {
  /// ...省略代码
  config.headers.x_access_token = token;
  return config
},function(error) {
  return Promise.reject(error)
})
```
当然请求拦截器中,除了处理添加token以外,还可以进行一些其他的处理,具体的依据实际需求进行处理

### 2.响应之后
    请求接口,并不是每一次都会成功。那么当接口请求失败的时候,我们又怎么处理呢？每次请求的  
    时候处理？封装axios统一处理？我想一个稍微追求代码质量的码农,应该都会选择封装axios进  
    行统一处理吧. axios不仅提供了请求的拦截器,其也提供了响应的拦截器.在此处,可以获取到服  
    务器返回的状态码,然后根据状态码进行相对应的操作.
```javascript
axios.interceprors.response.use(function(response) {
  if(response.data.code === 401){
    // 清空用户信息
    sessionStorage.user = ""
    sessionStorage.token = ""
    window.location.href = "/"; // 返回登录页
    return Promise.reject(msg)  // 接口Promise返回错误状态,错误信息msg可由后端返回,也可以我们自己定义一个码--信息的关系。
  }
  if(response.status !== 200 || response.data.code !== 200){// 接口请求失败, 具体根据实际情况判断
    message.error(msg); // 提示错误信息
    return Promise.reject(msg) //接口Promise返回错误状态
  }
  return response
},function(error) {
  if (axios.isCancel(error)){
    requestList.length = 0;
    //  store.dispatch('changeGlobalState',{loading:false})
    throw new axios.Cancel('cancel request')
  } else {
    message.error('网络请求失败,请重试')
  }
  return Promise.reject(error)
})
```
当然响应拦截器同请求拦截器一样,还可以进行一些其他的处理,具体的根据实际需求进行处理

### 3. 使用axios
 axios 使用的时候一般有三种方式: 
   * 执行 get 请求
```javascript
    axios.get('url',{
        params:{}, //接口参数
    }).then(function(res){
        console.log(res); //处理成功的函数 相当于success
    }).catch(function(error){
        console.log(error) // 错误处理 相当于error
    })
```
   * 执行 post 请求
```javascript
    axios.post('url',{
      data:xxx // 参数
    },{
      headers:xxxx, // 请求头信息
    }).then(function(res) {
      console.log(res); // 处理成功的函数 相当于success
    }).catch(function(error) {
      console.log(error) // 错误处理 相当于error
    })
```
   * axios API 通过相关配置传递给axios完成请求
```javascript
axios({
method: 'delete',
url:'xxx',
cache:false,
params:{id:123},
headers:xxx,
})
// ----------------------------------
axios({
method:'post',
url:'/user/12345',
data:{
  firstName:'monkey',
  lastName:'soft'
}
});
```
直接使用api的方式虽然容易,但是不同请求参数的名字不一样,在实际开大的过程中容易写错  
或者忽略,容易为开发造成不必的时间损失。
前面两种方式虽然没有参数不一致的问题,但是使用的时候,太过于麻烦.那么仔细观察  
发现两个有一定的相似点,便可以甚于这些相似点二次封装 形成适合我们使用的一个请求函数.直接上代码:
```javascript
/* 
*  url : 请求的url
*  params: 请求的参数
*  config: 请求时的header信息
*  method: 请求方法
* */
const request = function({url,params,config,method}) {
  // 如果是get 请求 需要拼接参数
  let str = ""
  if(method == "get" && params){
    Object.keys(params).forEach(item => {
      str += `${item}=${params[item]}&`
    })
  }
  return new Promise(((resolve,reject)=>{
    axios[method](str ? (url + "?" + str.substring(0,str.length -1)) :url,params,Object.assign({},config)).then(res=>{
      resolve(res.data)
    },err => {
      if(err.Cancel){
        
      }else{
        reject(err)
      }
    }).catch(err => {
      reject(err)
    })
  })
  )
}
```
这样我们需要接口请求的时候,直接调用该函数就好,不管用什么方式请求,传参方式都一样


## 2. 封装
http request拦截请求
```javascript
axios.interceptors.request.use(config => {
  const meta = (config.meta || {});
  const isToken = meta.isToken === false;
  config.headers['Authorization'] = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`;
  //让每个请求携带token
  if (getToken() && !isToken) {
    config.headers[website.tokenHeader] = 'bearer ' + getToken()
  }
  return config
}, error => {
  return Promise.reject(error)
});
```
http response 拦截
```javascript
axios.interceptors.response.use(res => {
  //获取状态码
  const status = res.data.code || res.status;
  const statusWhiteList = website.statusWhiteList || [];
  const message = res.data.msg || res.data.error_description || '未知错误';
  //如果在白名单里则自行catch逻辑处理
  if (statusWhiteList.includes(status)) return Promise.reject(res);
  //如果是401则跳转到登录页面
  if (status === 401) store.dispatch('FedLogOut').then(() => router.push({path: '/login'}));
  // 如果请求为非200否者默认统一处理
  if (status !== 200) {
    Message({
      message: message,
      type: 'error'
    });
    return Promise.reject(new Error(message))
  }
  return res;
}, error => {
  return Promise.reject(new Error(error));
});
```

