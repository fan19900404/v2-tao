<!-- author:yex -->
<template>
  <app-header :title="title"></app-header>
  <section class="container text-default">
    <!-- 用户有游戏记录 -->
    <template v-if="result.myGameList.length > 0">
      <ul class="gameList bgc-white border-bottom  margin-bottom text-default padding-small"
        v-infinite-scroll="loadMyGameList()" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <li class="item clearfix position-relative padding-top padding-bottom margin-left margin-little-right" v-for="item in result.myGameList">
          <div class="wrapper fl ">
            <img class="radius" :src="item.imgUrl" alt="">
          </div>
          <div class="right">
            <div class="title w60 overflow-ellipsis">{{ item.name }}</div>
            <div class="time text-sub">{{ item.publishTime}}</div>
            <a class="goto align-vertical border radius" v-link="'/tao-you/game-intro/' + item.gameID">进入</a>
          </div>
        </li>
      </ul>
      <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>加载中
      </p>
    </template>

    <!-- 用户无任何游戏记录 -->
    <template v-if="result.myGameList.length == 0 && showCList">
      <div class="no-data">
        <div class="wrapper text-center">
          <img src="../../../oldStatic/images/nodata.png" alt="">
          <div class="text-sub margin-top">
            您还没有玩游戏哦~
          </div>
        </div>
        <!-- 推荐游戏 -->
        <div class="commend padding" v-if="result.commendGameList.length > 0">
          <div class="header border-bottom margin-bottom padding-bottom">推荐游戏</div>
          <ul class="commend-gameList clearfix margin-small-top">
            <li class="item w25 fl text-center" v-for="item in result.commendGameList">
              <a v-link="'/tao-you/game-intro/' + item.gameID" class="text-default">
                <div class="padding-small">
                  <div class="wrapper">
                    <img class="radius" :src="item.imgUrl" alt="">
                  </div>
                  <div class="margin-top overflow-ellipsis text-small">{{ item.name }}</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
  'use strict';
  import Vue from 'vue';
  import AppHeader from '../../oldComponents/common-layout/header.component';
  import { InfiniteScroll } from 'mint-ui';
  import { Spinner } from 'mint-ui';

  Vue.component('mt-spinner', Spinner);

  export default {
    components: {
      AppHeader,
      InfiniteScroll,
      Spinner
    },
    data() {
      return {
        title: '我的淘游',
        showCList: false, // 是否显示推荐游戏
        loading: false, // 加载中
        allLoaded: false, // 已全部加载
        pageIndex: 1, // 当前第几页
        pageSize: 8, // 一页数据条数
        result: {
          myGameList: [], // 我的游戏列表
          commendGameList: [] // 推荐游戏列表
        }
      }
    },
    mounted() {
      $('body').css('background-color', '#f8f8f8');
      this.loadMyGameList();
    },
    methods: {

      /* 加载我的游戏列表 */
      loadMyGameList() {
        if (this.allLoaded) {
          return;
        }
        this.loading = true;
        Vue.ClientHttp().GET({
            page: this.pageIndex,
            limit: this.pageSize
          }, Vue.ClientUrl.my_game_list)
          .then((res) => {
            this.loading = false;
            if (res.code === 10000) {
              this.result.myGameList = this.result.myGameList.concat(res.result);
              let length = res.result.length;
              if (length > 0) {
                this.pageIndex++;
              }
              if (length < this.pageSize) {
                this.allLoaded = true;
              }

              // 用户未玩过任何游戏场合、呈现推荐游戏列表给用户
              if (this.pageIndex === 1 && length < this.pageSize) {
                this.showCList = true;
                this.loadCommendGameList();
              }
              return;
            }
          });
      },

      /* 加载推荐游戏列表 */
      loadCommendGameList() {
        Vue.ClientHttp().GET({
            type: 4,
            page: 1,
            limit: 4
          }, Vue.ClientUrl.game_center_list)
          .then((res) => {
            if (res.code === 10000) {
              this.result.commendGameList = this.result.commendGameList.concat(res.result.slice(0, 4));
              return;
            }
          });
      }
    }
  }
</script>

<style lang="scss" scoped>

  /*我的游戏列表*/
  .gameList{
    .item{
      &:not(:last-child){
        border-bottom: solid 1px #dfdfdf;
      }
      .wrapper{
        width: 5.5rem;
        height: 5.5rem;
      }
      .right{
        margin-left: 6.5rem;
        height: 5.5rem;
        line-height: 2rem;
      }
      .goto{
        display: block;
        width: 6rem;
        height: 3rem;
        line-height: 3rem;
        right: 0.5rem;
        color: #8a8a8a;
        text-align: center;
        background-color: #f8f8f8;
      }
    }
  }

  /*推荐游戏*/
  .no-data{
    >.wrapper{
      margin: 6rem auto 3rem auto;
       img{
        width: 3.2rem;
        height: 4rem;
       }
    }
    .commend{
      .header{
        color: #929292;
      }
      .commend-gameList{
        .wrapper{
          width: 5.5rem;
          height: 5.5rem;
          margin: 0 auto;
        }
      }
    }
  }
</style>
