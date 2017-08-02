<template>
  <div>
    <tmHeader title="资讯"></tmHeader>
    <newsHeader :title="news.title" :publishTime="news.publishTime" :author="news.author"></newsHeader>
    <!-- 文章内容 -->
    <div class="news-header-content" v-html="news.content"></div>
    <!-- 文章相关评论 -->
    <div class="news-header-block">
      <newsComment :newsID="newsID"></newsComment>
    </div>
    <div class="news-header-block">
      <newsRelatedList :newsID="newsID"></newsRelatedList>
    </div>
    <div class="news-header-block">
      <newsCommentBox></newsCommentBox>
    </div>

    <backTop></backTop>
    <backBefore></backBefore>
  </div>
</template>
<script>
import tmHeader from '../../components/header/header';
import newsHeader from './newsHeader';
import newsComment from './newsComment';
import newsRelatedList from './newsRelatedList';
import newsCommentBox from './newsCommentBox';
import { getNewsDetail } from '../../../api/home';
import backTop from '../../components/backTop/backTop';
import backBefore from '../../components/backBefore/backBefore';

export default {
  components: {
    tmHeader,
    newsHeader,
    newsComment,
    newsRelatedList,
    newsCommentBox,
    backTop,
    backBefore,
  },
  data() {
    return {
      news: [],
    };
  },
  created() {
    getNewsDetail(this.$route.params.id).then((res) => {
      if (res.data.code === 10000) {
        this.news = res.data.result;
      }
    });
  },
  computed: {
    newsID() { // 新闻id
      return Number(this.$route.params.id);
    },
  },
  watch: {
    $route(to, from) {
      if (to.params.id !== from.params.id) {
        getNewsDetail(this.$route.params.id).then((res) => {
          if (res.data.code === 10000) {
            this.news = res.data.result;
            scrollTo(0, 0);// 返回顶部
          }
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.news-header-content {
  padding: 40px 30px;
  background: #fff;
  font-size: 28px;
  color: #666;
}

.news-header-block {
  margin-top: 30px;
}
</style>

