<template>
  <div>
    <!--推荐部分-->
    <div class="tit"><img src="/static/images/gameCenter/game_first.png"></div>
    <div class="recommendation">
      <div class="recommendation__slide" v-for="v in firstGameData.slice(0,3)">
        <div class="recommendation__img">
          <img src="/static/images/gameCenter/h5.png" id="bg" v-show="v.field ==1">
          <img  :src="v.gameIcon">
        </div>
        <div class="recommendation__name">{{v.name}}</div>
        <div class="recommendation__num"><span>{{v.viewNumber}}</span>人在玩</div>
        <div class="recommendation__count">{{v.abstract.slice(0,8)}}</div>
      </div>
    </div>
    <!--图片/文字/按钮与文字居中-->
    <ul class="list">
      <router-link tag="li"  :to="{name: 'gameDetails'}"  class="list-item" v-for="(item, index) in firstGameData.slice(3)" :key="index">
        <tmListItem :thumb="item.gameIcon" :title="item.name" :sub-title="item.category" :extra="item.abstract" :is-last="index == firstGameData.slice(3).length-1" :border-type="1">
          <tmButton slot="right" text="进入" :has-action="true"></tmButton>
          <span slot="right" class="item__desc"><em>{{item.viewNumber}}</em>人在玩</span>
        </tmListItem>
      </router-link>
    </ul>
    <div class="title">
      <span class="title__left">全部游戏</span>
    </div>
    <!--全部游戏，滚动加载-->
    <div v-infinite-scroll="getNewGameData" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
      <router-link tag="li"  :to="{name: 'gameDetails'}"  class="list-item" v-for="(item, index) in newGameData" :key="index">
        <tmListItem :thumb="item.gameIcon" :title="item.name" :sub-title="item.category" :extra="item.abstract" :is-last="index == newGameData.length-1" :border-type="1">
          <tmButton slot="right" text="进入" :has-action="true"></tmButton>
          <span slot="right" class="item__desc"><em>{{item.viewNumber}}</em>人在玩</span>
        </tmListItem>
      </router-link>
      <p v-show="loading" class="page-infinite-loading">
        <my-spinner type="fading-circle"></my-spinner>加载中...
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .tit {
    height: 66px;
    background: #ffffff;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #E5E5E5;
    img {
      width: 278px;
      height: 29px;
    }
  }

  .recommendation {
    display: flex;
    background: #ffffff;
    border-bottom: 1px solid #E5E5E5;
    &__slide {
      flex: 1;
      display: flex;
      flex-flow:column nowrap;
      align-items: center;
    }
    &__img {
      width: 118px;
      height: 118px;
      padding: 18px 0 20px 0;
      img {
        width: 100%;
        height: 100%;
        border-radius: 20px;
      }
    }
    &__name {
      font-size: 28px;
      color: #333333;
      padding-bottom: 10px;
      overflow: auto;
    }
    &__num {
      height: 24px;
      font-size: 24px;
      color: #a5a5a5;
      padding-bottom: 10px;
      span {
        color: #ff4a4a;
      }
    }
    &__count {
      height: 24px;
      font-size: 24px;
      color: #a5a5a5;
      padding-bottom: 18px;
    }
  }
  .recommendation .recommendation__slide:nth-child(2) {
    border-left: 1px solid #E5E5E5;
    border-right: 1px solid #E5E5E5;
  }

  /**H5游戏添加图标**/
  #bg{
    position: absolute;
    width: 56px;
    height: 56px;
    border-radius:0;
  }
  /**按钮的样式**/
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
  /*通用头*/
  .title {
    height: 84px;
    line-height: 84px;
    padding: 0 30px;
    /*border-top: 1px solid #E5E5E5;*/
    border-bottom: 1px solid #E5E5E5;
    background: white;
    margin-top: 30px;
    &__left {
      font-size: 32px;
      color: #333333;
      float: left;
    }
  }
  .page-infinite-loading {
    font-size: 26px;
    color: #A5A5A5;
    letter-spacing: 0;
    line-height: 26px;
  }
</style>
<script>
  import { Spinner } from 'mint-ui';
  import Vue from 'vue';
  import TmButton from '../../../components/button/button';
  import TmListItem from '../../../components/listItem/listitem';
  import { getCommonList, getNewGameData } from '../../../api/game';

  Vue.component('my-spinner', Spinner);
  export default {
    data() {
      return {
        firstGameData: [],
        newGameData: [],
        loading: false,
        pageIndex: 1,
        pageSize: 8,
        allLoaded: false,
      };
    },
    components: {
      TmButton,
      TmListItem,
    },
    methods: {
      getCommonList() {
        getCommonList().then((res) => {
          if (res.data.code === 10000) {
            this.firstGameData = res.data.result;
            console.log(this.firstGameData);
          }
        });
      },
      getNewGameData() {
        if (this.allLoaded || this.loading) {
          return;
        }
        this.loading = true;
        getNewGameData({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          nologin: 1,
        }).then((res) => {
          setTimeout(() => { this.loading = false; }, 1500);
          if (res.data.code === 10000) {
            this.newGameData = this.newGameData.concat(res.data.result);
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
    },
    mounted() {
      this.getCommonList();
      this.getNewGameData();
    },
  };
</script>
