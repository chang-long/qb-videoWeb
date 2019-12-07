admin  视频后台管理系统前台界面
===

##  安装elementUI，vue-router，TyperScript依赖

```bash
cd admin
vue add element
vue add router
vue add typescript
```

* 在最后一步添加typescript可以使得整个项目转换为typescript

##  启动项目

```bash
yarn serve
```

##  在router.js添加ts标识路由设置
* 在routers后面加上<code>:RouteConfig[]</code>， 标识是一个路由配置是一个数组。
* 这样就会有友好的编译器提示

##  改造原有组件变为使用基于类的Vue组件
* script标签改写：<br>

```TypeScript
  <script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  @Component({})
  export default class CourseList extends Vue{

  }
  </script>
```

##  TS+axios请求数据

```bash
cd admin
yarn add axios @types/axios
```

* 在<code>main.ts</code>中初始化axios的相关配置

##  创建类型定义文件

* 创建一个什么什么.d文件代表Vue中的类型定义文件(http-vue.d.ts)
* 如axios存储baseuUrl的变量(本项目使用的是$http),其实他对于编译没有作用，只是为了给我们的编辑器使用
* 作用：明确知道($http)是什么，在这里是axios的实例，并且也有很好的代码提示

##  编辑、创建页面
* 首先是路由(router/index.ts)中使用<code>:id</code>并且设置<code>props: true</code>允许传递参数
* 在页面中(CourseEdit.vue)中使用<code>@Prop(String) id!: string</code>使用id值接收路由参数，这里感叹号的意思是：跟编译器说明id我们会给他赋值
* 由于我们编辑和创建都使用了一个组件，我们切换的时候有可能导致他不会更新，所以我们要在(Main.vue)中的<code>router-view</code>中加入一个key，这里使用路由地址不同来更新组件。<code>:key="$route.path"</code>，保证唯一键，避免数据重复导致不更新
* 由于创建和编辑页面的区别在于有没有传递ID过来。以前我们是在计算属性中判断，如今使用基于类的组件方式一些不同，现在需要写成一个方法，并且在前面加上关键字<b>get</b>表示这个方法的返回值为当成属性。<br>

```TypeScript
 get isNew(){
    return !this.id
  }
```

* 最后使用这个属性来判断是否为编辑还是创建页面


##  动态生成表单(vue-ele-form)插件的基本使用

```bash
cd admin
yarn add vue-ele-form
```

* 在main.ts中全局注册
* 需要创建一个ts的声明文件(packages.d.ts)，导出返回一个any值就不会报错了
* form-data表示表单的数据，form-desc表示表单的描述，request-fn表示表单提交的钩子函数
* 在方法中我们需要使用动态的方式去判断是否为创建还是编辑。url和method到需要写成动态的方法(使用isNew这个属性来判断)
* 需要注意动态判断方法时获取对象某一个方法应该使用[]而不是.

##  使用(Avue)插件改造常见表格的CRUD(CourseCrud)
* 安装<code>yarn add @smallwei/avue</code>
* 然后此时之前创建的CourseEdit，CourseList和vue-ele-form就都注释掉，不使用。都改成使用avue去创建动态表单和列表

##  使用(Avue)插件并配合服务端二次封装一个任意资源通用的CRUD组件
