<template>
  <div>
    <app-header :title="title"></app-header>
    <div class="hot-news">
      <!-- 新闻列表 有4种展示方式 -->
      <ul v-if="news.list" class="news-list" v-infinite-scroll="getNewsList" :infinite-scroll-disabled="news.loading || news.allLoaded" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <li class="item JS-statistics-news" v-for="(item,index) in news.list" @click="link({name: 'TaoYouNewsDetail', params: {id: item.id}, query: {type: item.fromType}})" :key="index">
          <!-- 上中下结构 中间大图 -->
          <div v-if="item.type == 1" class="content type1 am-flexbox">
            <div class="content__title overflow-ellipsis">{{ item.title }}</div>
            <div class="content__picture am-flexbox">
              <img :src="item.picPath[0]" alt="">
            </div>
            <div class="content__info am-flexbox">
              <span class="content__info__source overflow-ellipsis">{{ item.source }}</span>
              <span class="content__info__publish-time 1overflow-ellipsis">{{ item.publishTime | formatDateToTimeago }}</span>
            </div>
          </div>
          <!-- 左右结构 左边是图片 右边是描述文字-->
          <div v-if="item.type == 2" class="content type2 am-flexbox">
            <div class="content__left am-flexbox 1content__picture">
              <img :src="item.picPath[0]" alt="">
            </div>
            <div class="content__right am-flexbox-item am-flexbox">
              <div class="content__title overflow-ellipsis-multiline">{{ item.title }}</div>
              <div class="content__info am-flexbox">
                <span class="content__info__source am-flexbox-1 overflow-ellipsis">{{ item.source }}</span>
                <span class="content__info__publish-time 1am-flexbox-1 overflow-ellipsis">{{ item.publishTime | formatDateToTimeago }}</span>
              </div>
            </div>
          </div>
          <!-- 上中下结构 只有文字 -->
          <div v-if="item.type == 3" class="content type3 am-flexbox">
            <div class="content__title overflow-ellipsis">{{ item.title }}</div>
            <div class="content__detail overflow-ellipsis-multiline">{{ item.desc }}</div>
            <div class="content__info am-flexbox">
              <span class="content__info__source overflow-ellipsis">{{ item.source }}</span>
              <span class="content__info__publish-time 1overflow-ellipsis">{{ item.publishTime | formatDateToTimeago }}</span>
            </div>
          </div>
          <!-- 上中下结构 中间多图 -->
          <div v-if="item.type == 4" class="content type4 am-flexbox">
            <div class="content__title overflow-ellipsis">{{ item.title }}</div>
            <div class="content__picture am-flexbox">
              <img v-for="(subItem,index) in item.picPathList" class="am-flexbox-item" :src="subItem" :key="index">
            </div>
            <div class="content__info am-flexbox">
              <span class="content__info__source overflow-ellipsis">{{ item.source }}</span>
              <span class="content__info__publish-time 1overflow-ellipsis">{{ item.publishTime | formatDateToTimeago }}</span>
            </div>
          </div>
        </li>
      </ul>
      <p v-show="news.loading && !news.allLoaded" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>加载中
      </p>
    </div>
    <return-btn></return-btn>
    <!-- 返回顶部 -->
    <back-top></back-top>
  </div>
</template>
<script>
import { InfiniteScroll, Spinner } from 'mint-ui';
import Vue from 'vue';
import $ from 'jquery';
import AppHeader from '../../../components/tao-you/layout/header.component';
import ReturnBtn from '../../../components/tao-you/button/return.component';
import LoadList from '../../../components/tao-you/loadlist/LoadList';
// 添加回到顶部
import BackTop from '../../../components/tao-you/button/back-top.component';

Vue.component('mt-spinner', Spinner);
Vue.use(InfiniteScroll);

export default {
  data() {
    return {
      title: '原创',
      news: {},
      category: 1,
    };
  },
  components: {
    ReturnBtn,
    AppHeader,
    InfiniteScroll,
    Spinner,
    BackTop,
  },
  mounted() {
    $('body').css('backgroundColor', '#fff');
    this.news = new LoadList(Vue.ClientUrl.news_list, {
      fromType: this.category,
      type: 3,
      nologin: 1,
    });
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      if (this.news.getList) {
        this.news.getList();
      }
    },
    link(url) {
      this.$router.push(url);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../../assets/tao-you/common.scss';
.hot-news {
  background-color: #fff;
}

.news-list {
  padding: 0 0 0 .15rem;
  .item {
    padding-right: .15rem;
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
      color: $hint;
      &__source {
        max-width: 1rem;
        margin-right: .095rem;
      }
      &__publish-time {
        // max-width: .5rem;
      }
    }
  }
  .type1.content,
  .type3.content,
  .type4.content {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    .content__title {
      width: 100%;
      margin-bottom: .14rem;
    }
  }
  .type2 {
    align-items: stretch;
    .content__left {
      width: 1.08rem;
      margin-right: .08rem;
      align-items: center;
    }
    .content__right {
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: space-between;
    }
  }
  .type3 {
    .content__detail {
      color: #666;
      font-size: $font-size-md;
    }
  }
  .type4 {
    img:not(:first-child) {
      margin-left: .1rem;
    }
  }
}
</style>
