<template>
  <header-component :title="title"></header-component>
  <div class="my_msg_wrapper">
    <span class="mytodou_text">我的淘豆:</span>
    <span class="mytaodou_val">{{user.taoDou | moneyWidthComma}}</span>
    <span class="link_help">如何获得</span>
  </div>
  </template>
<style lang="scss" scoped>
  @import "../../assets/tao-you/common.scss";

  .my_msg_wrapper{
    background-color:$primary;
  }
  .mytodou_text{

  }
  .mytaodou_val{

  }
  .link_help{

  }
</style>
<script>
  import HeaderComponent from "../../oldComponents/common/header/app-header"
  import {InfiniteScroll} from 'mint-ui';
  export default {
    data(){
      return {
        loading:false,
        user:null,
        ajaxIng:false,
        title: '我的夺宝券',
      }
    },
    components: {
      HeaderComponent,InfiniteScroll
    },
    methods:{
      getUserInfo:function() {
        Vue.ClientHttp(this).GET('', Vue.ClientUrl.user_info).then(res=>{
          if(10000 !== res.code) {
            return;
          }
          this.user=res.result
        })
      },
    },
    ready:function(){
      this.getUserInfo()
//      this.getTaobiList()
    }
  }
</script>
