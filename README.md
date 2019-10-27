# qb-videoWeb
qbenben-NodeJS+VueJS全栈项目—QBen视频网站

## 服务端(管理端)
### 技术栈：NodeJS的Nest.js框架+MongoDB

- 大部分的都是增删改查的接口 

## 服务端(客户端)
### 技术栈：NodeJS的Nest.js框架+MongoDB

- 大部分的都是查询的接口 
- 两个服务端所使用的的数据库是一样的，模型也几乎一样，所以nest模式使用的单体仓库模式(Monorepo),在server文件夹中使用命令<code>nest g app admin</code>创建子应用