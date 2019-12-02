<template>
  <div>
    <h3>课程列表</h3>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class CourseList extends Vue {
  data = {}

  async fetch(){
    const res = await this.$http.get('courses')
    this.data = res.data;
  }

  created () {
    this.fetch()
  }
}
</script>

<style>
</style>