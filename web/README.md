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


