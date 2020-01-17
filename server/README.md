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

##  (get接口)传入JSON对象实现数据分页，条件查询，数据模糊查询等等
* <code>"limit": x</code>限制传给前端多少条数据
* <code>"page": x</code>配合limit展示多少条给前端
* <code>"sort": {"关键字段，一般为_id": -1}</code>排序，1表示升序，-1表示降序。因为我们在前台使用服务器的数据渲染表格在传递给前端的数据中加入<code>sortable: true</code>
* <code>"where": {"关键字段": astring}</code>条件查询，因为我们在前台使用服务器的数据渲染表格，<code>search: true</code>
* <code>"where": {"关键字段": {"$regex": "x"}}</code>，模糊查询因为我们在前台使用服务器的数据渲染表格，虽然Avue中没有模糊查询相关的字段匹配，我们可以自己定义一个，比如<code>regex: true</code>

##  上传接口
* 如果上传接口在每个模型的调用各自逻辑不同可以再各自的controller中书写不同逻辑
* 本案例中上传接口都没有不同就在(app.controller.ts)中
* @UseInterceptors()  拦截器
* @UploadedFile() 上传文件的装饰器
* nest自带模块MulterModule,将文件传递到哪里保存(app.module.ts)

##  静态文件托管(server\apps\admin\src\main.ts)
* 由于nest底层是可以支持express的。所以说这种存储是基于什么框架。在app定义的时候可以明确指定(使用泛型)我们现在使用的框架<code><NestEpressApplication></code>表示我们的这个app是基于Express的应用
* 使用app.useStaticAssets传入静态文件的地址，以及文件的前缀。

##  阿里云OSS文件上传(multer-aliyun-oss)
* 虽然前端使用Avue插件自带阿里OSS上传功能，可是把云存储的一些关键信息放在客户端中还是不安全(反编JS)。所以还是要在服务端完成
* <code>yarn add multer-aliyun-oss</code> 
* 配置：
* 填写地域节点前缀：region: 'oss-cn-shenzhen' 
* 	AccessKey ID	，AccessKeySecret都是在用户中的accesskeys中创建子用户后获取。注意子用户需要添加权限哦
* 填写存储桶名：bucket: 'video-qbenben'
* 现在就不会占用我们服务器的空间和流量。

## 完善课程和课时的关系
* 首先在(episode.model.ts)课时中添加指向依赖Ref到课程中
* 在(episodes.controller.ts)中添加服务端渲染下拉菜单的参数，其中下拉菜单的值也是需要从课程模型中获取。使用注入模型。同时在查找中转换对象格式再返回给下拉菜单。
* 此时还是会出现前端传给后端$符号报错。解决的方案是在controller中加入translate: false,让前段接收后不传递。

##  12-28更新依赖
* 我们可以通过下面的命令行的方式查看哪些依赖需要更新
* 值得注意的是一般版本号第一位是大版本号的更新这个需要看文档查看更新内容是不是破坏性兼容并且及时更新进行修改,本次修改的主要依赖是@nestjs/swagger

```bash
cd server
yarn upgrade-interactive --latest
```

*  ApiModelProperty 改为：ApiProperty
* ApiUseTags 改为：ApiTags

##  使用@nest:config加载环境变量
* 假如我们两个项目使用同一个端口就会产生错误，其实当我们多人协同开发项目的话，像端口号，存储桶的测试密钥等信息，每个人都会有所不同，这个时候就要使用环境变量来进行配置，这样就不用更改项目中的信息，只需要更改想.env这样的环境变量配置文件。可是又要考虑别人在拉取代码后也要进行设置，所以我们env文件一般使用gitignore进行忽略，然后创建一个.env进行示例，这样拉取得手别人拉到是示例文件，就可以自行填写。

* 安装依赖：<br>
```bash
cd server
yarn add @nestjs/config
nest g common
```

* 这样我们就得到了一个在libs下的文件夹common，这样我们就可以在这里面写一些两个子项目都会用到的代码（比如：加载环境变量）
* (common.modules.ts)中使用 ConfigModule.forRoot传入isGlobal表示config在任意地方都可以使用，同时要加载DbModule数据库模块
* 在数据库模块这里就可以使用环境变量加载数据库地址,在server文件夹下建立.env文件然后添加数据地址，admin和server 前台和后台使用到的后端端口号环境变量
* 然后在server/.gitignore中忽略.env，再建立.env.example范例文件，为别人拉取代码后自行填写
* 填写完后需要注意的是由于ConfigModule和DbModule都是并行加载的导致在加载DbModule时候ConfigModule并未读取完毕。所以nest模块当中都会有两个方法一个forRoot方法和forRootAsync异步加载
* (db.modules.ts)使用forRootAsync异步加载时使用useFactory 工厂方法,返回数据库的连接配置
* (server\apps\admin\src\app.module.ts)中将使用到的DbModule更换成CommonModule,并放到最上面先进行加载
* 同时将(server\apps\admin\src\app.module.ts)OSS存储中关键的信息也使用环境变量的方式
* 在每个子项目main.ts中将端口号进行更改

##  使用虚拟字段绑定关联关系(server\libs\db\src\models\course.model.ts)
* 我们可以发现之前我们使用课时episode绑定归属于哪个课程course。可是我们的课程没有字段来调出有哪些课时绑定了课程。
* 虚拟字段表示这里面的数据不在此数据表中可以查询
* 使用Ref绑定参考于谁的数据表
* 再使用@arrayProp，中ref表示参考的是谁。localField是本地键，表示使用了什么字段进行关联。foreignField是外键，表示那边使用了什么字段进行关联。
* 同时要在上面模型配置中的schemaOptions配置toJSON，允许虚拟字段查出

##  前台注册接口的实现
* 创建登录模块模型以及控制器

```bash
cd server
nest g mo auth
nest g co auth
```

* 实现注册接口(server\apps\server\src\auth\auth.controller.ts)： 使用Post方法定义接口，采用@Body将前台传入的注册信息获取，定义一个DTO数据传输对象，然后注入user数据库模型进行操作添加。值得注意的是注入模型后将用户模型使用<b>ReturnModelType</b>是typegoose中的一个泛型，指定用户模型，表名是一个用户模型类，这样就有很好的语法提示了

##  前台密码进行加密处理 (bcryptjs)
* 安装依赖

```bash
cd server
yarn add bcryptjs
yarn add -D @types/bcryptjs
```

* 对密码进行加密散列处理(server\libs\db\src\models\user.model.ts)：在@prop中使用set的方法，其作用是使得参数就是实际值用return 转换为某个值.值得注意的是使用set方法也有get方法.在常规获取用户中也不要把密码查出来的设置<code>select: false</code>
* 使用hashSync传入val实际值和加密指数，越大越慢

##  基于Passport策略的前台登录接口的实现
* 实现登录接口(server\apps\server\src\auth\auth.controller.ts)：


