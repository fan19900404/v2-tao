<!-- author:dreamapple 000 -->
<template>
  <div>
    <!--{{commentContent}}-->
    <!--<app-header-->
    <!--:has-back-action="hasAction"-->
    <!--@header-back-action="a"-->
    <!--:title="title">-->
    <!--</app-header>-->
    <!--<div class="game-center">Hello {{count}}</div>-->
    <!--<two-btns-alert></two-btns-alert>-->
    <!--<hr>-->
    <!--<simple-carousel-->
    <!--:wrapper-style="wrapperStyle"-->
    <!--:carousel-data="c"></simple-carousel>-->
    <!--<vue-cool-slider :slider-images="c"></vue-cool-slider>-->
    <!--<vue-swipe-slider :slider-config="c"></vue-swipe-slider>-->
    <!--<load-more-by-click :list="list"-->
    <!--:left-msg-count="leftMsgCount"-->
    <!--:is-loading="isLoading"-->
    <!--:can-load-more="canLoadMore"-->
    <!--:query="query"-->
    <!--:data-url="dataUrl">-->
    <!--<ul slot="list-content" class="list-content">-->
    <!--<li v-for="v in list">-->
    <!--<p class="list-content__username">name: {{v.name}}</p>-->
    <!--<p>email: {{v.email}}</p>-->
    <!--</li>-->
    <!--</ul>-->
    <!--<p v-show="!isLoading && canLoadMore" @click="loadMore" slot="load-more-btn" class="load-more-btn">点击加载更多({{leftMsgCount}})</p>-->
    <!--</load-more-by-click>-->
    <hr>
    <!--<swipe class="a">-->
    <!--<swipe-item v-for="v in 3">-->
    <!--<a href="http://www.baidu.com">qwe</a>-->
    <!--</swipe-item>-->
    <!--<swipe-item>2</swipe-item>-->
    <!--<swipe-item>3</swipe-item>-->
    <!--</swipe>-->

    <!--<game-comment :show="commentShow"-->
    <!--@game-comment-cancel="a"-->
    <!--@game-comment-post="a"-->
    <!--:comment-content="commentContent"></game-comment>-->

    <common-alert :show-alert="true" :type="3"></common-alert>

    <!--<app-footer></app-footer>-->
  </div>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem } from 'mint-ui';
import $ from 'jquery';
import CommonAlert from '../../components/common/alert/common-alert';
import AppHeader from '../../components/common-layout/header.component';
import AppFooter from '../../components/common-layout/footer.component';
import TwoBtnsAlert from '../../components/common-alert/two-btns-alert.component';
import VueCoolSlider from '../../components/common-slider/vue-cool-slider.component';
import VueSwipeSlider from '../../components/common-slider/vue-swipe-slider.component';
import LoadMoreByClick from '../../components/common-load-more/load-more-by-click';
import SimpleCarousel from '../../components/common-slider/simple-carousel.component';
import GameComment from '../../components/common-comment/game-comment.component';

export default {
  components: {
    CommonAlert,
    AppHeader,
    TwoBtnsAlert,
    AppFooter,
    VueCoolSlider,
    VueSwipeSlider,
    LoadMoreByClick,
    SimpleCarousel,
    Swipe,
    SwipeItem,
    GameComment,
  },
  data() {
    return {
      title: 'DEMO',
      hasAction: false,
      c: [],
      // load more config
      list: [],
      dataUrl: Vue.ClientUrl.user_list,
      query: {
        page: 1,
        limit: 10,
      },
      leftMsgCount: null,
      isLoading: null,
      canLoadMore: null,
      //
      wrapperStyle: {
        boxSizing: 'border-box',
        margin: '0 1.6rem',
        height: '12rem',
      },
      // comment
      commentShow: true,
    };
  },
  methods: {
    a() {
      console.log(123123);
    },
    loadMore() {
      this.$emit('load-more-by-click');
    },
  },
  // vuex: {
  //   getters: {
  //     count: ({ demo }) => demo.count,
  //   },
  // },
  mounted() {
    setTimeout(() => {
      this.c = [
        {
          link: 'http://www.baidu.com',
          title: '功夫熊猫1',
          imgUrl: '/static/images/home/game_1.png',
        },
        {
          link: 'http://www.baidu.com',
          title: '功夫熊猫2',
          imgUrl: '/static/images/home/game_2.png',
        },
        {
          link: 'http://www.baidu.com',
          title: '功夫熊猫3',
          imgUrl: '/static/images/home/game_3.png',
        },
        {
          link: 'http://www.baidu.com',
          title: '功夫熊猫4',
          imgUrl: '/static/images/home/game_4.png',
        },
      ];
    }, 600);

    $('body').css({ 'background-color': '#f8f8f8' });
  },
  destroyed() {
    $('body').css({ 'background-color': '#f8f8f8' });
  },
};
</script>

<style lang="scss" scoped>
$red: #fa4a4a;

.game-center {
  color: $red;
}

.load-more-btn {
  text-align: center;
  color: blue;
}

.list-content {
  &__username {
    color: red;
    font-weight: 600;
    background-color: black;
  }
}

.a {
  height: 100px;
}
</style>
