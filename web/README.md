# qb-video

> 使用 Nuxt.js 框架项目

## 命宁行

``` bash
# 拉取代码后下载依赖
$ yarn install

# 客户端启动 端口号：3000
$ yarn dev

# 客户端代码打包
$ yarn build
$ yarn start

```

## 使用youtube[应用布局](https://vuetifyjs.com/zh-Hans/getting-started/pre-made-layouts)
- 拉取代码后使用 vscode 代码格式化工具(Prettier)
- 下载[图标](https://vuetifyjs.com/en/customization/icons#install-material-icons)，安装这些图标和普通的Vue项目安装图标图标不太一样，因为没有index.html 模板页面，可以复制link地址后在【nuxt.config.js】中的head,link中引用

##  初始化页面
* 首先先把我们页面的架子代码在(web\layouts\default.vue)中写好，并且使用类似之前vue的router-view标签的nuxt-child 表示内容展示区，然后在pages中书写内容展示区的页面代码

##  使用dotenv和axios开发课程页面
* 与普通的vue页面不同的是，我们此时使用的服务端渲染要先请求数据再渲染页面，所以在Nuxt中的页面初始化的钩子函数与Vue的不同，使用asyncData中放入获取数据的逻辑
* 在asyncData函数的参数中解构出$axios，这个是在web\nuxt.config.js中引入@nuxtjs/axios模块，这样我们就获得一个在上下文中$axios，以至于我们可以直接引用，其中需要注意的是在Nuxt中所有的$开头的二次封装获取数据方法，返回值直接就是res.data，更为方便我们直接使用数据。
* 设置axios的根地址，根地址在Nuxt中是放在.env环境变量参数中的<b>API_URL</b>，这也是Nuxt规定的会自动查找后作为接口的根地址。需要注意的我们需要导入dotenv，使用dotenv模块并调用config方法，其作用就是让他读取.env文件读取接口根地址。
* 读取数据后打印在页面上，并查看网页源代码其实就可以发现使用服务端渲染的好处就在于此刻非常便于SEO。搜索引擎可以很方便抓取到我们网页中的数据也好网页的标签展示部分的数据也好，都是可以抓取到的。

##  使用路由参数和计算属性开发课程详情页
* 与之前的Vue项目的传递参数不同之处在于我们没有路由文件，传递过去的组件文件夹下创建组件文件取名需要使用下划线加【参数名】点Vue。如(web\pages\courses\_id.vue)。然后我们就可以使用params.【参数名】获取参数。
* 需要注意的是与传统的服务端渲染不同的是，传统服务端渲染跳转到其他页会重新全部请求刷新页面，他其实与单页的Vue一样。
* 在获取数据的时候，由于我们需要使用到后端的查询虚拟字段，请求带参：query带入populate需要让后端关联查谁。

##  使用@nuxtjs/auth模块实现Nuxt登录
* 在以前做登录功能的时候我们传递表单对象给后台接口，成功后接口返回token，并且将token存储在localstorage中并且在后续请求中带上token，而在nuxt中有更简单的方法：
* 安装：yarn add @nuxt/auth
* 在web\nuxt.config.js中配置一下，首先在modules中引入。然后插件引入建立一个auth插件配置项在其中使用相对应的策略。
* 在登录调用方法中使用$auth的loginWith方法，第一个参数代表使用什么策略，第二个参数传递对应的数据。然后nuxt会使用策略的login接口传递过去，所以nuxt作为中间层进行转发  
* 值得注意的是由于我们要使用到全局Vuex所以我们需要在store文件下创建一个index.js



