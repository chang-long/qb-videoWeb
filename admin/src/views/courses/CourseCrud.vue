<template>
  <div>
    <avue-crud 
    :data="data.data" 
    :option="option" 
    @row-save="create" 
    @row-update="updata" 
    @row-del="remove"></avue-crud>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  @Component({})
  export default class CourseList extends Vue {
    data = {};
    option = {
      title: '课程管理',
      column: [
        { prop: 'name', label: '课程名称' },
        { prop: 'cover', label: '课程封面图' },
      ]
    };

    created() {
      this.fetch();
    }

    /**
     * @description: 获取表单数据
     * @return: data
     */
    async fetch() {
      const res = await this.$http.get("courses");
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
      await this.$http.post('courses', row);
      this.$message.success('创建成功');
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
      await this.$http.put(`courses/${row._id}`, data);
      this.$message.success('更新成功');
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
      await this.$http.delete(`courses/${row._id}`);
      this.$message.success("删除成功");
      this.fetch();
    }
  }
</script>

<style>
</style>