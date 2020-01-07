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


