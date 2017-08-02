<template>
  <div>
    <!--头部-->
    <app-header :title="'开服'"></app-header>
    <!--今日开服-->
    <div class="title" v-show="todayData.length>0">
      <span class="title__left">今日开服</span>
      <span class="title__right">今日共<i>{{num}}</i>开服</span>
    </div>
    <ul class="list">
      <router-link tag="li" class="list-item" v-for="(item, index) in todayData" :key="index" :to ="{name: 'gameDetails'}">
        <tmListItem :thumb="item.gameIcon" :title="item.name" :sub-title="item.category  + ' | ' + item.serviceName" :extra="dateFormat(item.mDate*1000, 'yyyy-MM-dd hh:mm:ss')" :is-last="index == todayData.length-1" :border-type="1">
          <tmButton slot="right" text="进入" :has-action="true" @click="open"></tmButton>
        </tmListItem>
      </router-link>
    </ul>
    <!--即将开服-->
    <div class="title"  v-show="featureData.length>0">
      <span class="title__left">即将开服</span>
      <span class="title__right">即将有<i>{{featureNum}}</i>开服</span>
    </div>
    <ul class="list">
      <router-link tag="li" class="list-item" v-for="(item, index) in featureData" :key="index" :to ="{name: 'gameDetails'}">
        <tmListItem :thumb="item.gameIcon" :title="item.name" :sub-title="item.category  + ' | ' + item.serviceName" :extra="dateFormat(item.mDate*1000, 'yyyy-MM-dd hh:mm:ss')" :is-last="index == featureData.length-1" :border-type="1">
          <tmButton slot="right" text="进入" :disabled="true" @click="open"></tmButton>
        </tmListItem>
      </router-link>
    </ul>
    <!--已经开服-->
    <div class="title" v-show="hadData.length">
      <span class="title__left">已经开服</span>
      <span class="title__right">已经有<i>{{hadNum}}</i>开服</span>
    </div>
    <ul class="list" v-infinite-scroll="getHadData" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
      <router-link tag="li" class="list-item" v-for="(item, index) in hadData" :key="index" :to ="{name: 'gameDetails'}">
        <tmListItem :thumb="item.gameIcon" :title="item.name" :sub-title="item.category  + ' | ' + item.serviceName" :extra="dateFormat(item.mDate*1000, 'yyyy-MM-dd hh:mm:ss')" :is-last="index == hadData.length-1" :border-type="1">
          <tmButton slot="right" text="进入" :has-action="true" @click="open"></tmButton>
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
  import { getTodayData, getFeatureData, getHadData } from '../../../api/game';
  import { dateFormat, formatDateToTimeago } from '../../../util/mall';

  Vue.component('my-spinner', Spinner);
  export default {
    data() {
      return {
        msg: '游戏开服',
        todayData: [],
        num: 0,
        featureData: [],
        featureNum: 0,
        hadData: [],
        hadNum: 0,
        loading: false,
        pageIndex: 1,
        pageSize: 10,
        allLoaded: false,
      };
    },
    components: {
      AppHeader,
      TmListItem,
      TmButton,
    },
    methods: {
      getTodayData() {
        getTodayData().then((res) => {
          if (res.data.code === 10000) {
            this.todayData = res.data.result;
            this.num = res.data.result.length;
          }
        });
      },
      getFeatureData() {
        getFeatureData().then((res) => {
          if (res.data.code === 10000) {
            this.featureData = res.data.result;
            this.featureNum = res.data.result.length;
          }
        });
      },
      getHadData() {
        if (this.allLoaded || this.loading) {
          return;
        }
        this.loading = true;
        const query = {
          page: this.pageIndex,
          limt: this.pageSize,
        };
        getHadData(query).then((res) => {
          setTimeout(() => { this.loading = false; }, 1500);
          if (res.data.code === 10000) {
            this.hadData = this.hadData.concat(res.data.result);
            this.hadNum = this.hadData.length;
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
      dateFormat,
      formatDateToTimeago,
      open() {
        console.log('进入');
      },
    },
    mounted() {
      this.getTodayData();
      this.getFeatureData();
      this.getHadData();
    },
  };
</script>
<style lang="scss" scoped>
  /*通用头*/
  .title {
    height: 84px;
    line-height: 84px;
    padding: 0 30px;
    /*border-top: 1px solid #E5E5E5;*/
    border-bottom: 1px solid #E5E5E5;
    background: white;
    &__left {
      font-size: 32px;
      color: #333333;
      float: left;
    }
    &__right {
      font-size: 26px;
      color: #333333;
      float: right;
      i {
        color: #ff4a4a;
      }
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
