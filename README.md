# qb-videoWeb 🎞
qbenben-NodeJS+VueJS全栈项目—QBen视频网站<br>
前后台都使用TypeScript开发<br>
包管理器：yarn<br>

## 服务端(管理端) 【server/apps/admin】
### 技术栈：NodeJS的Nest.js框架+MongoDB

- 大部分的都是增删改查的接口 
- 启动:<br>
<code>cd server</code><br>
<code>nest start -w admin</code><br>

## 服务端(客户端) 【server/apps/server】
### 技术栈：NodeJS的Nest.js框架+MongoDB

- 大部分的都是查询的接口 
- 两个服务端所使用的的数据库是一样的，模型也几乎一样，所以nest模式使用的单体仓库模式(Monorepo),在server文件夹中使用命令<code>nest g app admin</code>创建子应用
- 启动:<br>
<code>cd server</code><br>
<code>nest start -w server</code><br>



## 前台界面(管理端) 【admin】
### 技术栈：VueJS(TypeScript)框架 + ElementUI
- 使用<b>vue-class-component</b>基于类的Vue组件
- 启动:<br>
<code>cd admin</code><br>
<code>yarn serve</code><br>

##  前台界面(客户端) 【web】
### 技术栈：Nuxt.js - Vue.js 通用框架 + Vuetify
- 采用服务端渲染(SSR)
- 启动:<br>
<code>cd web</code><br>
<code>yarn serve</code><br>



---
学习途径： [全栈之巅](https://www.bilibili.com/video/av73070499)
