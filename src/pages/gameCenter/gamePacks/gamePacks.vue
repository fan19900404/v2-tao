<template>
  <div>
    <!--头部-->
    <app-header :title="'礼包'"></app-header>
    <!--搜索-->
    <div class="search">
      <link-search></link-search>
    </div>
    <!--热门礼包-->
    <app-title :title="'热门礼包'"></app-title>
    <ul class="list">
      <li class="list-item" v-for="(item, index) in hotPacks" :key="index">
        <tmListItem :thumb="item.image" :title="item.gameName" :sub-title="item.name" :extra="item.typeName" :is-last="index == hotPacks.length-1" :border-type="1">
          <TmProgress slot="right" :progress="(item.totalNumber-item.usedNumber==0)?0:item.usedNumber/item.totalNumber" :disabled="(item.uID||item.totalNumber-item.usedNumber==0)?true:false" :text="item.uID == 0&&item.taoDou !=0 ? '兑' :item.uID == 0?'领':'已领'"></TmProgress>
        </tmListItem>
      </li>
    </ul>
    <!--新推礼包-->
    <app-title :title="'新推礼包'"></app-title>
    <ul class="list">
      <li class="list-item" v-for="(item, index) in newPacks" :key="index">
        <tmListItem :thumb="item.image" :title="item.gameName" :sub-title="item.name" :extra="item.typeName" :is-last="index == newPacks.length-1" :border-type="1">
          <TmProgress slot="right" :progress="(item.totalNumber-item.usedNumber==0)?0:item.usedNumber/item.totalNumber" :disabled="(item.uID||item.totalNumber-item.usedNumber==0)?true:false" :text="item.uID == 0&&item.taoDou !=0 ? '兑' :item.uID == 0?'领':'已领'"></TmProgress>
        </tmListItem>
      </li>
    </ul>
    <!--全部礼包-->
    <app-title :title="'全部礼包'"></app-title>
    <ul class="list"  v-infinite-scroll="getAllPacks" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
      <li class="list-item" v-for="(item, index) in allPacks" :key="index">
        <tmListItem :thumb="item.image" :title="item.gameName" :sub-title="item.name" :extra="item.typeName" :is-last="index == allPacks.length-1" :border-type="1">
          <TmProgress slot="right" :progress="(item.totalNumber-item.usedNumber==0)?0:item.usedNumber/item.totalNumber" :disabled="(item.uID||item.totalNumber-item.usedNumber==0)?true:false" :text="item.uID == 0&&item.taoDou !=0 ? '兑' :item.uID == 0?'领':'已领'"></TmProgress>
        </tmListItem>
      </li>
      <p v-show="loading" class="page-infinite-loading">
        <my-spinner type="fading-circle"></my-spinner>加载中...
      </p>
    </ul>
  </div>
</template>
<script>
  import { Spinner } from 'mint-ui';
  import Vue from 'vue';
  import AppHeader from '../../components/header/header';
  import AppTitle from './title';
  import linkSearch from '../../components/linkSearch/linkSearch';
  import TmButton from '../../../components/button/button';
  import TmListItem from '../../../components/listItem/listitem';
  import TmProgress from '../../../components/progress/circleProgress';
  import { getHotPacks, getNewPacks, getAllPacks } from '../../../api/game';

  Vue.component('my-spinner', Spinner);
  export default {
    data() {
      return {
        msg: '礼包页，按当前设计稿做，不再分手游礼包',
        hotPacks: [],
        newPacks: [],
        allPacks: [],
        loading: false,
        pageIndex: 1,
        pageSize: 10,
        allLoaded: false,
      };
    },
    components: {
      AppHeader,
      AppTitle,
      linkSearch,
      TmProgress,
      TmButton,
      TmListItem,
    },
    methods: {
      // 热门礼包
      getHotPacks() {
        getHotPacks().then((res) => {
          this.hotPacks = res.data.result;
        });
      },
      // 新推礼包
      getNewPacks() {
        getNewPacks().then((res) => {
          this.newPacks = res.data.result;
        });
      },
      // 全部礼包
      getAllPacks() {
        if (this.allLoaded || this.loading) {
          return;
        }
        this.loading = true;
        const query = {
          page: this.pageIndex,
          limt: this.pageSize,
        };
        getAllPacks(query).then((res) => {
          setTimeout(() => { this.loading = false; }, 1500);
          if (res.data.code === 10000) {
            this.allPacks = this.allPacks.concat(res.data.result);
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
      this.getHotPacks();
      this.getNewPacks();
    },
  };
</script>
<style lang="scss" scoped>
  .search{
    background: #ffffff;
    padding: 20px 30px;
  }
  /*正在加载中样式*/
  .page-infinite-loading {
    font-size: 26px;
    color: #A5A5A5;
    letter-spacing: 0;
    line-height: 26px;
  }
</style>
