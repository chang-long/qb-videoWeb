<template>
  <div>
    <h3>{{isNew ? '创建' : '编辑'}}课程</h3>
    
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({})
export default class CourseEdit extends Vue {
  @Prop(String) id: string
  data = {};
  fields = {
    _id: { label: "ID" },
    name: { label: "课程名称" },
    cover: { label: "课程封面图" }
  };

  get isNew(){
    return !this.id
  }


  async fetch() {
    const res = await this.$http.get("courses");
    this.data = res.data;
  }

  created() {
    // this.fetch();
  }
}
</script>

<style>
</style>