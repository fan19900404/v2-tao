<!-- author:yex -->
<template>
  <app-header :title="title"></app-header>
    <section class="margin-top border-top text-default">
      <div class="bgc-white list-item position-relative border-bottom padding">
        <div class="header inline-block text-default">头像</div>
        <img class="avatar align-vertical radius-circle" :src="user.avatar" alt="">
      </div>
      <div v-if="user.isCanUpdateName == 1" v-link="'/tao-you/personal/nickname-update'" class="bgc-white list-item position-relative border-bottom padding">
        <div class="header inline-block text-default">昵称</div>
        <div class="header fr inline-block text-sub value">{{ user.username }}</div>
        <i class="icon icon-right align-vertical right text-gray"></i>
      </div>
      <div v-else class="bgc-white list-item position-relative border-bottom padding">
        <div class="header inline-block text-default">昵称</div>
        <div class="header fr inline-block text-sub value">{{ user.username }}</div>
        <i class="icon icon-right align-vertical right text-gray"></i>
      </div>
      <div v-if="user.bindPhone != ''" class="bgc-white list-item position-relative margin-top border-top-bottom padding">
          <div class="header inline-block text-default">绑定手机号</div>
          <div class="header fr inline-block text-sub value">{{ user.bindPhone }}</div>
          <i class="icon icon-right align-vertical right text-gray"></i>
      </div>
      <div v-else v-link="'/tao-you/personal/bind-phone'" class="bgc-white list-item position-relative margin-top border-top-bottom padding">
          <div class="header inline-block text-default">绑定手机号</div>
          <div class="header fr inline-block text-sub value">暂未绑定手机</div>
          <i class="icon icon-right align-vertical right text-gray"></i>
      </div>
      <div @click="logout" class="bgc-white list-item position-relative margin-top border-top-bottom padding">
          <div class="header inline-block text-default">退出登录</div>
          <i class="icon icon-right align-vertical right text-gray"></i>
      </div>
    </section>
</template>

<script>
  'use strict';
  import AppHeader from '../../oldComponents/common-layout/header.component';
  import { user } from '../../vuex/getters';
  import { getUserInfo } from '../../vuex/actions';

  export default {
    vuex: {
      getters: {
        user: user
      },
      actions: {
        getUserInfo
      }
    },
    components: {
      AppHeader
    },
    data() {
      return {
        title: '修改信息'
      }
    },
    mounted() {
      $('body').css('background-color', '#f8f8f8');
      this.getUserInfo();
    },
    methods:{
      // 用户退出
      logout() {
        var that = this;
        Vue.OneMallHttp().GET({}, Vue.OneMallUrl.common_user_logout)
          .then(function(res) {
            if(10000 === res.code) {
              that.$router.go({
                path: '/tao-you/'
              })
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list-item{
    .header{
      height: 3rem;
      line-height: 3rem;
      margin: auto 0;

      &.value{
        margin-right: 1.5rem;
      }
    }
    .avatar{
      right: 1rem;;
      width: 4rem;
      height: 4rem;
      margin-right: 1.5rem;
    }
    .right{
      width: 1.5rem;
      height: 1.35rem;
      right: 0.5rem;
      font-size: 1.45rem;
    }
  }
</style>
