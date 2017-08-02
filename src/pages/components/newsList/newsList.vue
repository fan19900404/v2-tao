<template>
  <div class="nows-list-box">
    <ul class="news-list" v-infinite-scroll="loadNewsHot" infinite-scroll-disabled="loading" infinite-scroll-distance="100" infinite-scroll-immediate-check="false">
      <li class="item JS-statistics-news" v-for="(item, i) in newsList" @click="link({name: 'TaoYouNewsDetail', params: {id: item.id}, query: {type: item.fromType}})" :key="i">

        <!-- 左右结构 左边是图片 右边是描述文字-->
        <div v-if="item.type == 2" class="home-news-content home-news-content__around">
          <div class="home-news-left">
            <img :src="item.picPath[0]" alt="">
          </div>
          <div class="home-news-right">
            <div class="content__title overflow-ellipsis-multiline">{{ item.title }}</div>
            <div class="content__info">{{ item.source }} {{ formatDateToTimeago(item.publishTime) }}</div>
          </div>
        </div>

        <!-- 上中下结构 -->
        <div v-else class="home-news-content">
          <div class="home-news-top">
            <div class="content__title overflow-ellipsis">{{ item.title }}</div>
          </div>
          <div class="home-news-middle">

            <!-- 中间大图 -->
            <img v-if="item.type == 1" :src="item.picPath[0]" alt="" class="content__picture">

            <!-- 中间文字 -->
            <div v-else-if="item.type == 3" class="content__detail overflow-ellipsis-multiline">{{ item.desc }}</div>

            <!-- 中间多图 -->
            <div v-else-if="item.type == 4" class="content-picture-multi">
              <div v-for="(subItem,index) in item.picPathList" :key="index" class="content-picture-multi-box">
                <img :src="subItem" alt="" />
              </div>
            </div>

          </div>
          <div class="home-news-bottom">
            <span class="content__info">{{ item.source }} {{ formatDateToTimeago(item.publishTime) }}</span>
          </div>
        </div>
      </li>
    </ul>
    <p v-show="loading" class="page-infinite-loading">
      <my-spinner type="fading-circle" :size="14"></my-spinner>加载中...
    </p>
  </div>
</template>
<script>
/**
 * 本组件，用于显示新闻列表
 */
import Vue from 'vue';
import { Spinner } from 'mint-ui';
import { formatDateToTimeago } from '../../../util/mall';

Vue.component('my-spinner', Spinner);

export default {
  props: {
    loadNewsHot: Function,
    newsList: Array,
    loading: Boolean,
    allLoaded: Boolean,
  },
  data() {
    return {};
  },
  methods: {
    formatDateToTimeago,
    link(url) {
      this.$router.push(url);
    },
  },
};
</script>
<style lang="scss" scoped>
.nows-list-box {
  background: #fff;
}

.home-news-content {
  margin: 0 30px;
  box-sizing: border-box;
  background: #FFFFFF;
  box-shadow: inset 0 -2px 0 0 #EEEEEE;
}

.home-news-content__around {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 30px 0;
}

.home-news-left {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-grow: 0;
  flex-shrink: 0;
  height: 140px;
  width: 216px;
  overflow: hidden;
  img {
    height: 100%;
    width: auto;
  }
}

.home-news-right {
  margin-left: 24px;
  height: 140px;
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.content__title {
  font-size: 32px;
  color: #333333;
  letter-spacing: 0;
  line-height: 40px;
}

.content__info {
  font-size: 24px;
  color: #A5A5A5;
  letter-spacing: 0;
  line-height: 24px;
}

.home-news-top {
  padding: 32px 0 24px;
}

.home-news-middle .content__picture {
  width: 100%;
}

.home-news-bottom {
  padding: 24px 0 32px;
}

.content__detail {
  font-size: 28px;
  color: #666;
}

.content-picture-multi {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .content-picture-multi-box {
    flex: 1 1 auto;
  }
  .content-picture-multi-box+.content-picture-multi-box {
    margin-left: 20px;
  }
}

.page-infinite-loading {
  font-size: 26px;
  color: #A5A5A5;
  letter-spacing: 0;
  line-height: 26px;
}
</style>
