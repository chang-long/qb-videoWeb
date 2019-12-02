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


