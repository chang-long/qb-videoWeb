<template>
  <div>
    <avue-crud
      v-if="option.column"
      :page="page"
      :data="data.data"
      :option="option"
      @row-save="create"
      @row-update="updata"
      @row-del="remove"
      @on-load="changePage"
      @sort-change="changSort"
      @search-change="search"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({})
export default class ResourceList extends Vue {
  @Prop(String) resource!: string;
  data: any = {};
  option: any = {};
  page: any = {
    // pageSize: 2,
    // pageSizes: [2, 5, 10],
    total: 0
  };
  query: any = {
    limit: 10
  };

  created() {
    this.fetchOption();
    this.fetch();
  }

  /**
   * @description: 获取表单配置数据
   * @return: option
   */
  async fetchOption() {
    const res = await this.$http.get(`${this.resource}/option`);
    this.option = res.data;
  }

  /**
   * @description: 切换分页设置时触发的钩子函数
   * @param {obj} page 分页器配置对象
   * @return: data 表格数据
   */
  async changePage({ pageSize, currentPage }) {
    this.query.page = currentPage;
    this.query.limit = pageSize;
    this.fetch();
  }

  /**
   * @description: 点击排序箭头触发的钩子函数
   * @param {obj} 列数据以及排序状态(order)的对象
   * @return: data
   */
  async changSort({ prop, order }) {
    if (!order) {
      this.query.sort = null;
    } else {
      this.query.sort = {
        [prop]: order === "ascending" ? 1 : -1
      };
    }
    this.fetch();
  }

  /**
   * @description: 搜索的钩子函数
   * @param {obj} 列名以及搜索栏中数据，键值对的对象
   * @return: data
   */
  async search(where) {
    //如果该列名在服务端传回中标识了允许使用模糊查询，则该搜索变为模糊查询
    for (let k in where) {
      const field = this.option.column.find(v => v.prop === k);
      if (field.regex) {
        where[k] = { $regex: where[k] };
      }
    }
    this.query.where = where;
    this.fetch();
  }

  /**
   * @description: 获取表单数据
   * @return: data
   */
  async fetch() {
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query
      }
    });
    this.page.total = res.data.total;
    this.data = res.data;
  }

  /**
   * @description: 创建数据，Avue的创建表单数据的钩子函数
   * @param {obj} row 行数据对象
   * @param {function} done 自动加载动画以及关闭遮罩的函数
   * @param {function} loading  手动加载动画以及关闭遮罩的函数
   * @return: void
   */
  async create(row, done, loading) {
    await this.$http.post(`${this.resource}`, row);
    this.$message.success("创建成功");
    this.fetch();
    done();
  }

  /**
   * @description: 编辑数据，Avue的编辑表单行数据的钩子函数
   * @param {obj} row 行数据对象
   * @param {number} index 行索引(需要注意，更新的时候row对象中会添加$index，我们需要把他删除，mongodb不允许)
   * @param {function} done 自动加载动画以及关闭遮罩的函数
   * @param {function} loading  手动加载动画以及关闭遮罩的函数
   * @return: void
   */
  async updata(row, index, done, loading) {
    const data = JSON.parse(JSON.stringify(row));
    delete data.$index;
    await this.$http.put(`${this.resource}/${row._id}`, data);
    this.$message.success("更新成功");
    this.fetch();
    done();
  }

  /**
   * @description: 编辑数据，Avue的编辑表单行数据的钩子函数
   * @param {obj} row 行数据对象
   * @return: void
   */
  async remove(row) {
    try {
      await this.$confirm("是否确认删除？");
    } catch (e) {
      return;
    }
    await this.$http.delete(`${this.resource}/${row._id}`);
    this.$message.success("删除成功");
    this.fetch();
  }
}
</script>

<style>
</style>