<template>
  <el-container>
    <el-aside width="200px"></el-aside>
    <el-container>
      <el-header>Qbenben视频中心 - 后台管理界面</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class Main extends Vue {}
</script>

<style>
</style>