<!-- author:yex -->
<template>
  <app-header :title="title"></app-header>
  <section class="container text-default">

    <!-- 我的淘币顶部 -->
    <section class="base-info bgc-default text-default border-bottom text-white padding">
      <div class="user padding margin-bottom clearfix position-relative">
        <div class="wrapper left fl">
          <img src="../../../static/images/personal/taobi.png" alt="">
        </div>
        <div class="wrapper right fl">
          <div>我的淘币</div>
          <div class="num text-large">{{ user.taoBi }}</div>
        </div>
        <a class="recharge bgc-white radius-rounded align-horizontal" v-link="'/tao-you/personal/recharge'">立即充值</a>
      </div>
    </section>

    <!-- 列表有数据 -->
    <section :class="{'hidden': noData}">
      <div class="text-sub margin-big-top padding" :class="{'hidden': noData}">淘币明细</div>
      <ul class="detailList bgc-white border-top-bottom" v-infinite-scroll="loadDetailList()" infinite-scroll-disabled="loading" infinite-scroll-distance="10"  infinite-scroll-immediate-check="false">
        <li class="item clearfix position-relative padding-top padding-bottom margin-left margin-little-right" v-for="item in detailList">
          <div class="fl wripper w70">
            <div class="title margin-small-bottom overflow-ellipsis">{{ item.reason }}</div>
            <div class="time text-sub">{{ item.time }}&nbsp;&nbsp;{{ item.typeDesc }}</div>
          </div>
          <div class="amount w30 text-right align-vertical">{{ item.amount }}</div>
        </li>
      </ul>
      <p v-show="loading" class="page-infinite-loading margin-top">
        <mt-spinner type="fading-circle"></mt-spinner>加载中
      </p>
    </section>

    <!-- 列表无数据 -->
    <section :class="{'hidden': !noData}">
      <div class="no-data">
        <div class="wrapper text-center">
          <img src="../../../static/images/nodata.png" alt="">
          <div class="text-sub margin-top">
            您还未产生过消费记录哦~
          </div>
        </div>
      </div>
    </section>
  </section>

  <!-- common alert -->
  <common-alert :type="alertType" :show-alert="showAlert" :alert-msg="alertMsg" :alert-status="alertStatus"></common-alert>
</template>

<script>
  'use strict';
  import Vue from 'vue';
  import AppHeader from '../../components/common-layout/header.component';
  import CommonAlert from '../../components/common-alert/common-alert.component';
  import { InfiniteScroll } from 'mint-ui';
  import { Spinner } from 'mint-ui';
  import { user } from '../../vuex/getters';
  import { getUserInfo } from '../../vuex/actions';

  Vue.component('mt-spinner', Spinner);

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
      AppHeader,
      InfiniteScroll,
      Spinner,
      CommonAlert
    },
    data() {
      return {
        title: '我的淘币',
        loading: false, // 加载中
        allLoaded: false, // 已全部加载
        pageIndex: 1, // 当前第几页
        pageSize: 10, // 一页数据条数
        noData: false, // 没有数据
        detailList: [], // 消费明细列表
        // 弹出框
        alertType: 0,
        showAlert: false,
        alertMsg: '',
        alertStatus: ''
      }
    },
    mounted() {
      $('body').css('background-color', '#f8f8f8');
      this.getUserInfo();
      this.loadDetailList();
    },
    methods: {

      /* 获取我的消费明细列表 */
      loadDetailList() {
        if (this.allLoaded) {
          return;
        }
        this.loading = true;
        Vue.ClientHttp().GET({
            page: this.pageIndex,
            limit: this.pageSize
          }, Vue.ClientUrl.taobi_daily_detail)
          .then((res) => {
            this.loading = false;
            if (res.code === 10000) {
              this.detailList = this.detailList.concat(res.result);
              let length = res.result.length;
              if (length > 0) {
                this.pageIndex++;
              }
              if (length < this.pageSize) {
                this.allLoaded = true;
              }
              if (this.pageIndex === 1 && length < this.pageSize) {
                this.noData = true;
              }
              return;
            }
            this.showAlert = true;
            this.alertMsg = '消息提示';
            this.alertStatus = res.msg || '加载淘币明细失败';
          });
      }
    }
  }
</script>

<style lang="scss" scoped>

  /* 我的淘币 */
  .base-info{
    .user{
      >.wrapper{
        height: 6.9rem;

        .num{
          color: #ffff00;
        }
      }
      .left{
        width:9.2rem;
      }
      .right{
        margin-left: 1rem;
        line-height: 3rem;
      }
      .recharge{
          display: inline-block;
          padding: 1rem 4rem;
          bottom: -3.65rem;
          width: 7rem;
          text-align: center;
          color: #ff4a4a;
          font-size: 1.4rem;
          box-shadow: 0 0.3rem 0.3rem #facaca;
      }
    }
  }

  /* 淘币明细 */
  .detailList{
    .item{
      &:not(:last-child){
        border-bottom: solid 1px #dfdfdf;
      }
      >.wrapper{
        height: 6rem;
      }
      .amount{
        right: 1rem;
        height: 2rem;
        line-height: 2rem;
      }
    }
  }

  /* 无消费记录 */
  .no-data{
    >.wrapper{
      margin: 6rem auto 3rem auto;
       img{
        width: 3.2rem;
        height: 4rem;
       }
    }
  }
</style>
