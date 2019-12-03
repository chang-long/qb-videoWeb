import Vue from 'vue';
import { AxiosInstance } from 'axios';
declare module 'vue/types/vue' {
  //声明为vue补充的东西
  interface Vue{
    $http: AxiosInstance
  }
}