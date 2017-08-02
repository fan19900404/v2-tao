<template>
  <div>
    <!--头部-->
    <app-header :title="'游戏详情'"></app-header>
    <!--粗略信息-->
    <div class="common">
      <div class="common__img">
        <img :src="pd.gameIcon">
      </div>
      <div class="common__des">
        <p class="common__name">{{pd.name}}</p>
        <p class="common__type">类型：{{pd.category}}</p>
        <p class="common__message">{{pd.abstract}}</p>
      </div>
    </div>
    <!--占位空间-->
    <div class="space"></div>
    <!--选项-->
    <tab :tab-list="tabList" @game-rank-tab-action="check"></tab>
    <!--游戏介绍-->
    <section v-show = "type ===1">
      1
    </section>
    <!--游戏礼包-->
    <section v-show = "type ===2">
      2
    </section>
    <!--游戏任务-->
    <section v-show = "type ===3">
      3
    </section>
    <!--游戏评论-->
    <section v-show = "type ===4">
      4
    </section>
    <!--相关游戏-->
    <app-more></app-more>
    <!--底部按钮-->
    <div class="button">
      <div class="button__share">
        <div class="share-wrapper">
        <span class="icon-comment">
      </span>
          <div class="button__text">评论</div>
        </div>
      </div>
      <div class="button__key">
        <app-button :btn-text="btnMsg" @button-component="button"></app-button>
      </div>
    </div>
  </div>
</template>
<script>
  import AppHeader from '../../components/header/header';
  import Tab from '../../../components/tab/tab';
  import AppMore from './more';
  import { getGameInfo } from '../../../api/game';

  export default {
    data() {
      return {
        msg: '游戏详情页',
        pd: {},
        tabList: ['详情', '任务', '礼包', '评论'],
        // 当前为那一项
        type: 1,
      };
    },
    components: {
      AppHeader,
      AppMore,
      Tab,
    },
    methods: {
      getGameInfo() {
        getGameInfo({ id: 27687 }).then((res) => {
          if (res.data.code === 10000) {
            console.log(res.data.result);
            this.pd = res.data.result;
          }
        });
      },
      check(index) {
        this.type = index;
      },
    },
    mounted() {
      this.getGameInfo();
    },
  };
</script>
<style lang="scss" scoped>
  /*占位空间*/
  .space{
    height: 30px;
    background-color: #f5f5f9;
  }
  .common {
    height: 200px;
    background-color: #ffffff;
    padding: 0 30px;
    display: flex;
    &__img {
      width: 140px;
      height: 140px;
      border-radius: 20px;
      margin: 30px 20px 0 0;
      img{
        width: 100%;
        height: 100%;
        border-radius: 20px;
      }
    }
    &__des {
      flex: 1;
      height: 200px;
    }
    &__name{
      color: #333;
      font-size: 32px;
      line-height: 32px;
      margin-top: 44px;
    }
    &__type{
      color: #a5a5a5;
      font-size: 26px;
      line-height: 26px;
      margin-top: 14px;
    }
    &__message{
      color: #a5a5a5;
      font-size: 26px;
      line-height: 26px;
      margin-top: 14px;
    }
  }
</style>
