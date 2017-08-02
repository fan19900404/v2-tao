<template>
  <div>
    <!--头部-->
    <app-header :title="'排行'"></app-header>
    <!--游戏分类-->
    <tab :tab-list="tabList" @game-rank-tab-action="check"></tab>
    <!--前三名-->
    <div class="container" v-cloak>
      <div class="container__slide">
        <div class="container__img"  @click="open(allGameData[1].field,allGameData[1].id,allGameData[1].gameUrl,allGameData[1].name,allGameData[1].direction)">
          <img src="static/images/gameCenter/h5.png" id="bg" v-show="1==allGameData[1].field ">
          <img :src="allGameData[1].gameIcon">
        </div>
        <div class="container__rank">2</div>
        <div class="container__name overflow-ellipsis">{{allGameData[1].name}}</div>
      </div>
      <div class="container__slide">
        <div class="container__img container__top" @click="open(allGameData[0].field,allGameData[0].id,allGameData[0].gameUrl,allGameData[0].name,allGameData[0].direction)">
          <img src="/static/images/gameCenter/h5.png" id="bg" v-show="1==allGameData[0].field ">
          <img :src="allGameData[0].gameIcon">
        </div>
        <div class="container__rank container__rank-top">1</div>
        <div class="container__name overflow-ellipsis">{{allGameData[0].name}}</div>
      </div>
      <div class="container__slide">
        <div class="container__img" @click="open(allGameData[2].field,allGameData[2].id,allGameData[2].gameUrl,allGameData[2].name,allGameData[2].direction)">
          <img src="static/images/gameCenter/h5.png" id="bg" v-show="1==allGameData[2].field">
          <img :src="allGameData[2].gameIcon">
        </div>
        <div class="container__rank">3</div>
        <div class="container__name overflow-ellipsis">{{allGameData[2].name}}</div>
      </div>
    </div>
    <!--无限加载列表-->
    <ul class="list"  v-infinite-scroll="getRankData" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <router-link tag="li" class="list-item"  v-for="(item, index) in allGameData.slice(3)" :key="index" :to="{name:'gameDetails'}">
          <tmListItem :index="index+4" :thumb="item.gameIcon" :title="item.name" :sub-title="item.category" :extra="item.abstract" :is-last="index == allGameData.slice(3).length-1" :border-type="1">
            <tmButton slot="right" text="进入" :has-action="true"></tmButton>
            <span slot="right" class="item__desc"><em>{{item.viewNumber}}</em>人在玩</span>
          </tmListItem>
        </router-link>
      <p v-show="loading" class="page-infinite-loading">
        <my-spinner type="fading-circle"></my-spinner>加载中...
      </p>
    </ul>
  </div>
</template>
<script>
  import { Spinner } from 'mint-ui';
  import Vue from 'vue';
  import TmButton from '../../../components/button/button';
  import TmListItem from '../../../components/listItem/listitem';
  import AppHeader from '../../components/header/header';
  import Tab from '../../../components/tab/tab';

  import { getRankData } from '../../../api/game';

  Vue.component('my-spinner', Spinner);
  export default {
    data() {
      return {
        tabList: ['人气榜', '付费榜', '新游榜'],
        type: 1,
        loading: false,
        pageIndex: 1,
        pageSize: 10,
        allLoaded: false,
        allGameData: [],
      };
    },
    components: {
      AppHeader,
      Tab,
      TmButton,
      TmListItem,
    },
    methods: {
      // index为1 2 3...代表第一个，第二个
      check(index) {
        this.type = index;
        this.loading = false;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.allLoaded = false;
        this.allGameData = [];
        this.getRankData();
      },
      getRankData() {
        if (this.allLoaded || this.loading) {
          return;
        }
        this.loading = true;
        let query = {};
        const check = this.type;
        if (check === 1) {
          query = {
            type: 'rankHot',
            page: this.pageIndex,
            limit: this.pageSize,
          };
        }
        if (check === 2) {
          query = {
            type: 'rankCharge',
            page: this.pageIndex,
            limit: this.pageSize,
          };
        }
        if (check === 3) {
          query = {
            type: 'rankNew',
            page: this.pageIndex,
            limit: this.pageSize,
          };
        }
        getRankData(query).then((res) => {
          setTimeout(() => { this.loading = false; }, 1500);
          if (res.data.code === 10000) {
            this.allGameData = this.allGameData.concat(res.data.result);
            const length = res.data.result.length;
            if (length > 0) {
              this.pageIndex += 1;
            }
            if (length < 4) {
              this.allLoaded = true;
            }
          }
        });
      },
      open(a, b, c, d, e) {
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(d);
        console.log(e);
      },
    },
    mounted() {
      this.getRankData();
    },
  };
</script>
<style lang="scss" scoped>
  [v-cloak] {
    display: none;
  }
  /**前三名**/
  .container {
    /**此处高度去掉了 排名涨幅这一栏**/
    height: 304px;
    background:white url("/static/images/gameCenter/rank-bg.png") no-repeat;
    background-size:100% 164px;
    display: flex;
    border-bottom: 1px solid #E5E5E5;
    &__slide {
      flex: 1;
      display:flex;
      flex-flow:column nowrap;
      align-items: center;
  }
    &__img {
      width: 118px;
      height: 118px;
      margin: 66px 0 10px 0;
      border-radius: 20px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-radius: 20px;
    }
  }
    &__rank {
      width: 44px;
      height: 34.6px;
      background:white url("/static/images/gameCenter/demo_04.png") no-repeat;
      background-size:100% 100%;
      text-align: center;
      margin-top: 10px;
      color: #ffffff;
      font-size: 22px;
      line-height: 40px;
  }
    &__rank-top{
      width: 56px;
      height: 44px;
      line-height: 50px;
    }
    &__name {
      height: 28px;
      width: 200px;
      text-align: center;
      font-size: 28px;
      color: #333333;
      padding: 12px 0 10px 0;
  }
    &__count {
      height: 24px;
      font-size: 24px;
      color: #ff4a4a;
  }
    &__top {
      margin: 46px 0 22px 0;
    }
  }
  /**H5游戏添加图标**/
  #bg{
    position: absolute;
    width: 56px;
    height: 56px;
    border-radius: 0;
    top: 0;
    left: 0;
  }
  /*按钮样式*/
  .item__desc {
    margin-top: 10px;
    padding-left: 8px;
    line-height: 34px;
    max-height: 38px;
    color: #a5a5a5;
    font-size: 24px;
    text-align: left;
    overflow: hidden;
    em {
      color: #fa4a4a;
    }
  }
  /*正在加载中样式*/
  .page-infinite-loading {
    font-size: 26px;
    color: #A5A5A5;
    letter-spacing: 0;
    line-height: 26px;
  }
</style>
