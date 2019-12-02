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

##  创建数据模型(user.module.ts)

* 在libs/db/src中创建一个models文件夹用来存放我们的数据库模型

##  引用数据模型(全局引用)

* 在db.module.ts将Module标记为全局的(@Global())，然后使用forFeature方法将模型引用进来，然后把模型导入进来，再导出这些模型。
* 在需要引用模型的地方(app.module.ts)中引入

##  添加模型模块(users)

<code>nest g mo -p admin users</code></br>
<code>nest g co -p admin users</code></br>

* 相当于在admin这个模块添加一个users子模块

## 使用@Crud快速实现增删改查接口

<code>yarn add nestjs-mongoose-crud</code><br>

* 在\server\apps\admin\src\users\users.controller.ts中使用(constructor @InjectModel)将user模型注入进来
* 使用@Crud将model传入

##  使用Swagger编写接口文档

<code>yarn add @nestjs/swagger swagger-ui-express</code><br>
[文档中](https://docs.nestjs.com/recipes/swagger)OpenAPI (Swagger)接口文档的编写；

* 更改接口名，一般来说接口文档的命名为(api-docs) 
* 建议给每个模型模块增加Tag分组<code>@ApiUseTag('xxx')</code>
* 给每个模型使用@ApiModelProperty()模型属性的简介，方便阅读属性的作用。description:表示描述，example默认值。
* 在模型上定义@modelOptions可以指定一些其他属性(比如时间，toJson)

```TypeScript
@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
```

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://qbenben-1259133534.cos.ap-shenzhen-fsi.myqcloud.com/uploads/swagger.png" width="90%" alt="QbenbenSwaggerUI页面" /></a>
</p>

##  建立课程和课时模型之间的关系，类似为B站上的一个视频对应多个分集(course.module.ts && episode.model.ts)

* 在命名上我们习惯上把模型定义为单数并且定义一些模型的属性。而在操作这些模型的模块和控制器上我们习惯性定义为复数，可以认为是对于模型上的一些管理
* 其实@prop()是属性最重要的标识，一旦打上才能作为数据库的字段
* 课程和课时都是独立的模型，使用课时的id对课程进行关联，存放这些id是一个数组字段，定义的时候就不能用@prop()，应该使用<b>@arrayProp()</b>标识数组字段。
* 存放episodes这个字段的时候使用Ref表示引入了“参考”，Ref是一个泛型，我们应该定义为<code>Episode</code>这个数组模型。
* 使用@arrayProp()传入{itemRef: 'Episode'},表示里面的每一个元素参考的哪一个。这样就可以用<code>episodes</code>将课程和课时关联起来

##  添加课程模型模块以及课时模型模块(courses && episodes)

<code>nest g mo -p admin courses</code></br>
<code>nest g co -p admin courses</code></br>
<code>nest g mo -p admin episodes</code></br>
<code>nest g co -p admin episodes</code></br>

* 与user一样使用@Crud快速生成增删改查以及@InjectModel注入模型

##  解决跨域

* 在main.ts中加入<code>app.enableCors()</code>

