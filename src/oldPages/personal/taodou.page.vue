<!-- author:yex copy -->
<template>
  <app-header :title="title"></app-header>

  <!-- 我的淘豆 -->
  <section class="count-box flex-ld">
    <span>我的淘豆<em class="count margin-little-left">{{ user.taoDou }}</em></span>
    <a class="dhdbq-btn" v-link="'/tao-you/personal/taodou-dh'">兑换抵扣券</a>
  </section>

  <!-- 列表无数据 -->
  <section class="no-dbq-box" :class="{'hidden': !noData}">
    <img class="no-img" src="/static/images/personal/no_dbq_bg.png">
    <p class="tips">没有可使用的抵扣券</p>
    <a class="ljdh" v-link="'/tao-you/personal/taodou-dh'">立即兑换</a>
  </section>

  <!-- 列表有数据 -->
  <section class="dbq-box" :class="{'hidden': noData}">
    <p class="sy-tips"><i class="icon icon-info"></i>使用说明</p>
    <ul class="dbq-list" v-infinite-scroll="loadDbqList()" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
      <li v-for="item in dbqList" :class="{'unused':item.status==0,'used':item.status==1,'overdue':item.status==3}">
        <div class="top flex-ld">
          <span class="t">{{item.name}}</span>
          <span class="money">￥<em class="count">{{item.prize}}</em></span>
        </div>
        <div class="bottom flex-col-middle">
          <span>{{item.remark}}</span>
          <span>有效期：{{item.startTime}}至{{item.endTime}}</span>
        </div>
      </li>
    </ul>
    <p v-show="loading" class="page-infinite-loading">
      <mt-spinner type="fading-circle"></mt-spinner>加载中
    </p>
  </section>

  <!-- common alert -->
  <common-alert :type="alertType" :show-alert="showAlert" :alert-msg="alertMsg" :alert-status="alertStatus"></common-alert>
</template>

<script>
  'use strict';
  import Vue from 'vue';
  import AppHeader from '../../oldComponents/common-layout/header.component';
  import CommonAlert from '../../oldComponents/common-alert/common-alert.component';
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
        title: '我的淘豆',
        loading: false, // 加载中
        allLoaded: false, // 已全部加载
        pageIndex: 1, // 当前第几页
        pageSize: 5, // 一页数据条数
        noData: false, // 没有数据
        dbqList: [], // 抵扣券列表
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
      this.loadDbqList();
    },
    methods: {

      /* 获取我的抵扣券列表 */
      loadDbqList() {
        if (this.allLoaded) {
          return;
        }
        this.loading = true;
        Vue.ClientHttp().GET({
            page: this.pageIndex,
            limit: this.pageSize
          }, Vue.ClientUrl.my_ticket_list)
          .then((res) => {
            this.loading = false;
            if (res.code === 10000) {
              this.dbqList = this.dbqList.concat(res.result);
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
            this.alertStatus = res.msg || '加载抵扣券列表失败';
          });
      }
    }
  }
</script>

<style lang="scss" scoped>

  /* 我的淘豆头部 */
  .count-box {
    height: 6rem;
    padding: 0 1.35rem;
    background-color: #ff4a4a;
    color: #fff;
    font-size: 1.75rem;

    .count {
      color: #ffff00;
      font-style: normal;
    }

    .dhdbq-btn {
      display: block;
      width: 8.4rem;
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      font-size: 1.2rem;
      color: #ff4a4a;
      background-color: #ffff00;
      border-radius: .5rem;
    }
  }

  /* 抵扣券列表 */
  .dbq-box {
    padding: 0 1.1rem;

    .sy-tips {
      line-height: 4.0rem;
      text-align: right;
      font-size: 1.2rem;
      color: #bbbbbb;

      i {
        color: #c5c5c5;
        margin: 0 .2rem 0 0;
        vertical-align: text-bottom;
      }
    }

    li {
      min-height: 10rem;
      padding: 0 1.5rem;
      margin: 0 0 1.6rem 0;
      color: #898989;
    }

    @at-root {
      .dbq-list{
        > li{
          .top {
            min-height: 4.8rem;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #ececec;
            font-size: 1.8rem;

            .money .count {
              font-size: 3.1rem;
              font-weight: bold;
            }
          }

          .bottom {
            margin-top: 0.55rem;

            > span {
              font-size: 1.2rem;
              color: #898989;
              line-height: 2rem;
            }

            @at-root {
              .flex-ld {
                  display: box;
                  display: -webkit-box;
                  display: flex;
                  display: -webkit-flex;
                  justify-content: space-between;
                  align-items: center;
              }
              .flex-col-middle {
                display: box;
                display:-webkit-box;
                display: flex;
                display: -webkit-flex;
                flex-direction: column;
                justify-content: center;
              }
            }

          }
        }

        /*未使用的抵扣券样式*/
        > li.unused {
          background: url(/static/images/personal/quan_bg.png) no-repeat top center;
          background-size: 100% 100%;

          .top{
            .t{
              color: #000;
            }
            .money {
              color: #ff4a4a;
            }
          }
        }

        /*过期的抵扣券样式*/
        > li.overdue {
          background: url(/static/images/personal/quan_overdue_bg.png) no-repeat top center;
          background-size: 100% 100%;
        }

        /*已使用的抵扣券样式*/
        > li.used {
          background: url(/static/images/personal/quan_used_bg.png) no-repeat top center;
          background-size: 100% 100%;
        }
      }
    }
  }

  /*没有抵扣券时的情况*/
  .no-dbq-box {
    padding: 8rem 0 3.4rem 0;

    .no-img {
      display: block;
      width: 18.6rem;
      height: 11rem;
      margin: 0 auto;
    }

    .tips {
      font-size: 1.4rem;
      color: #cdcdcd;
      line-height: 4rem;
      text-align: center;
      margin: 0 0 4rem 0;
    }

    .ljdh {
      display: block;
      width: 18rem;
      height: 4.5rem;
      line-height: 4.5rem;
      text-align: center;
      color: #fff;
      font-size: 1.4rem;
      border-radius: .5rem;
      background-color: #ff4a4a;
      margin: 0 auto;
    }
  }
</style>
