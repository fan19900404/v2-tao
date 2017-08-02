<template>
  <div class="activity-container">
    <app-header :title="title"></app-header>
    <template v-if="activity.inited && activity.list.length>0">
      <ul class="list" v-infinite-scroll="getActivityList" :infinite-scroll-disabled="activity.loading || activity.allLoaded" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <li class="item" v-for="(item,index) in activity.list" @click="link({name: 'TaoYouNewsDetail', params: {id: item.id}, query: {type: item.fromType}})" :key="index">
          <div class="content type1 am-flexbox">
            <div class="content__title overflow-ellipsis">{{ item.title }}</div>
            <div class="content__picture am-flexbox">
              <img :src="item.picPath[0]" alt="">
            </div>
            <div class="content__info am-flexbox">
              <span>活动时间：{{ item.desc }}</span>
            </div>
          </div>
        </li>
      </ul>
      <p v-show="activity.loading && !activity.allLoaded" class="page-infinite-loading">
        <my-spinner type="fading-circle"></my-spinner>加载中
      </p>
    </template>
    <template v-if="activity.inited && activity.list.length==0">
      <no-record-component text="暂时还木有活动哦~"></no-record-component>
    </template>
    <return-btn></return-btn>
  </div>
</template>
<script>
import Vue from 'vue';
import { InfiniteScroll, Spinner } from 'mint-ui';
import $ from 'jquery';
import AppHeader from '../../../../oldComponents/tao-you/layout/header.component';
import LoadList from '../../../../oldComponents/tao-you/loadlist/LoadList';
import NoRecordComponent from '../../../../oldComponents/tao-you/no-record/no-record.component';
import ReturnBtn from '../../../../oldComponents/tao-you/button/return.component';


Vue.component('my-spinner', Spinner);
Vue.use(InfiniteScroll);

export default {
  components: {
    AppHeader,
    InfiniteScroll,
    NoRecordComponent,
    ReturnBtn,
  },
  data() {
    return {
      title: '活动',
      activity: {},
      category: 3, // 1：原创 2：转载 3：活动
    };
  },
  mounted() {
    $('body').css('background-color', '#f5f5f9');
    this.activity = new LoadList(Vue.ClientUrl.activity_list, { nologin: 1, fromType: this.category });
    this.getActivityList();
  },
  methods: {
    link(url){
      this.$router.push(url);
    },
    getActivityList() {
      this.activity.getList();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../../../assets/tao-you/common.scss';
.activity-container {
  // background-color: #fff;
}

.list{
  background-color: #fff;
}

.item {
  padding: 0 .15rem;
  border-bottom: solid $primary-border 1px;
}

.content {
  padding: .14rem 0;
  &__title {
    font-size: $font-size-lg;
  }
  &__picture {
    width: 100%;
  }
  &__info {
    margin-top: .13rem;
    font-size: $font-size-xs;
    color: #a5a5a5;
    &__source {
      max-width: 1rem;
      margin-right: .095rem;
    }
  }
}

.type1.content {
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  .content__title {
    width: 100%;
    margin-bottom: .14rem;
  }
}
.page-infinite-loading{
    margin-top: 0;
}
</style>
