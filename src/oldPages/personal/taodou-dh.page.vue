<!-- author:yex copy -->
<template>
  <app-header :title="title"></app-header>

  <!-- 我的淘豆 -->
  <section class="count-box flex-ld">
    <span>我的淘豆<em class="count margin-little-left">{{ user.taoDou }}</em></span>
    <a class="dhdbq-btn" v-link="'/tao-you/personal/taodou'">查看抵扣券</a>
  </section>

  <!-- 列表区 -->
  <section class="dbq-box">
    <p class="sy-tips"><i class="icon icon-info margin-little-right"></i>使用说明</p>

    <!-- 列表有数据 -->
    <section :class="{'hidden': noData}">
      <ul class="dbq-list" v-infinite-scroll="loadDhList()"
        infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <li class="flex-ld" v-for="item in dhList">
          <div class="dbq-info w75">
            <p><span class="name">{{ item.name }}</span> <!-- 剩余<em class="text-red">{{ item.last }}</em>张 --></p>
            <p>需要<em class="text-red text-bold">{{ item.prize }}</em>淘豆&nbsp;剩余<em class="text-red">{{ item.last }}</em>张</p>
          </div>
          <a class="dh-btn w25" @click.prevent="exchange( item )">兑换</a>
        </li>
      </ul>
      <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>加载中
      </p>
    </section>

    <!-- 列表无数据 -->
    <section :class="{'hidden': !noData}">
      <div class="no-data">
        <div class="wrapper text-center">
          <img src="../../../oldStatic/images/nodata.png" alt="">
          <div class="text-sub margin-top">
            没有可兑换的抵扣券~
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
  import AppHeader from '../../oldComponents/common-layout/header.component';
  import CommonAlert from '../../oldComponents/common-alert/common-alert.component';
  import { InfiniteScroll } from 'mint-ui';
  import { Spinner } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import { user } from '../../vuex/getters';
  import { getUserInfo, updateUserInfo } from '../../vuex/actions';

  Vue.component('mt-spinner', Spinner);

  export default {
    vuex: {
      getters: {
        user: user
      },
      actions: {
        getUserInfo,
        updateUserInfo
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
        title: '福利商城',
        bPress: false, // 兌换按钮是否被按下
        loading: false, // 加载中
        allLoaded: false, // 已全部加载
        pageIndex: 1, // 当前第几页
        pageSize: 5, // 一页数据条数
        noData: false, // 没有数据
        dhList: [], // 可兌换抵扣券列表
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
      this.loadDhList();
    },
    methods: {

      /* 获取可兌换抵扣券列表 */
      loadDhList() {
        if (this.allLoaded) {
          return;
        }
        this.loading = true;
        Vue.ClientHttp().GET({
            'page': this.pageIndex,
            'limit': this.pageSize
          }, Vue.ClientUrl.ticket_list)
          .then((res) => {
            this.loading = false;
            if (res.code === 10000) {
              this.dhList = this.dhList.concat(res.result);
              let length = res.result.length;
              if (length > 0) {
                this.pageIndex++;
              }
              if (length < this.pageSize) {
                this.allLoaded = true;
              }
              if (this.pageIndex == 1 && length < this.pageSize) {
                this.noData = true;
              }
              return;
            }
            this.showAlert = true;
            this.alertMsg = '消息提示';
            this.alertStatus = res.msg || '加载抵扣券列表失败';
          });
      },

      /* 抵扣券兌换处理 */
      exchange(item) {
        if (this.bPress) {
          return;
        }
        let userTaoDou = parseInt(this.user.taoDou);
        let prize = parseInt(item.prize);
        if (userTaoDou < prize) {
          Toast('兑换失败 淘豆数量不足!');
          return;
        }
        if (item.last == 0) {
          Toast('兑换失败 抵扣券库存不足!');
          return;
        }
        this.bPress = true;
        Vue.ClientHttp().GET({
          tID: item.id
        }, Vue.ClientUrl.do_exchange).then((res) => {
          this.bPress = false;
          if (res.code == 10000) {
            this.updateUserInfo({taoDou: userTaoDou - prize});

            /* 最好是后端返回当前库存数量、待修正 */
            if (item.last - 1 >= 0) {
              item.last -= 1;
            }
            let that = this;
            layer.open({
              skin: 'confirm',
              content: '兑换成功!',
              btn: ['继续兑换', '立即查看'],
              yes: () => {
                layer.closeAll();
              },
              no: () => {
                that.$router.go("/tao-you/personal/taodou");
              }
            });
            return;
          }
          Toast(res.msg);
          this.dhList = [];
          this.allLoaded = false;
          this.pageIndex = 1;
          this.loadDhList();
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .flex-ld {
      display: box;
      display: -webkit-box;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      align-items: center;
  }

  /* 我的淘豆 */
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

      @at-root {
        .text-red{
          color: #ff4a4a;
        }

        .text-bold{
          font-weight: bold;
        }
      }
    }
  }

  /* 兌换券列表 */
  .dbq-box {
    padding: 0 1.1rem;

    .sy-tips {
      line-height: 4.0rem;
      text-align: right;
      font-size: 1.2rem;
      color: #bbbbbb;

      i {
        color: #c5c5c5;
        vertical-align: text-bottom;
      }
    }

    @at-root {
      .dbq-list {

        > li {
          min-height: 10rem;
          padding: 0 1.5rem;
          margin: 0 0 1.6rem 0;
          color: #898989;
          background: url(/oldStatic/images/personal/quan_bg.png) no-repeat top center;
          background-size: 100% 100%;

          .dbq-info{
            > p {
              line-height: 2rem;
              font-size: 1.2rem;
              color: #898989;
              padding-right: 0.5rem;

              .name {
                font-size: 1.8rem;
                color: #000;
                margin: 0 .4rem 0 0;
              }
            }
          }

          .dh-btn {
              display: inline-block;
              min-width: 4.5rem;
              height: 3.1rem;
              line-height: 3.1rem;
              text-align: center;
              font-size: 1.2rem;
              color: #fff;
              background-color: #ff4a4a;
              border-radius: .4rem;
            }
        }
      }
    }
  }

  /* 列表无数据 */
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
