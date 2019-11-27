<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
 
##  启动项目(管理模块)：
<code>nest start -w admin</code><br>

##  DB库的初始化
* 我们admin和server模块虽然在接口方面是独立的，互不干扰的，但是他们也有共用的地方(库)，<code>nest g lib db</code>，这样的话我们在数据库中的模型就可以在库中写好，一旦接口方面需要使用，我们可以直接在<code>app.module.ts</code>引用过去

##  连接DB数据库

<code>yarn add nestjs-typegoose @typegoose/typegoose mongoose @types/mongoose</code><br>

* 在/libs/db/src/db.module.ts中使用forRoot方法引入数据库，并且传入连接对象

##  创建数据模型

* 在libs/db/src中创建一个models文件夹用来存放我们的数据库模型

##  引用数据模型(全局引用)

* 在db.module.ts将Module标记为全局的(@Global())，然后使用forFeature方法将模型引用进来，然后把模型导入进来，再导出这些模型。

##  添加模型模块

<code>nest g mo -p admin users</code></br>
<code>nest g co -p admin users</code></br>

* 相当于在admin这个模块添加一个users子模块

## 使用Crud快速实现增删改查接口

<code>yarn add nestjs-mongoose-crud</code><br>

* 在\server\apps\admin\src\users\users.controller.ts中使用(constructor @InjectModel)将user模型注入进来
* 使用@Crud将model传入

##  使用Swagger编写接口文档

<code>yarn add @nestjs/swagger swagger-ui-express</code><br>