<template>
  <div>
    <!-- 触发评论的部分 -->
    <div class="comment-container-replace"></div>
    <div class="comment-container">
      <div class="comment-text" @click.self="showPopup">我也来说几句...</div>
      <span class="comment-btn  JS-statistics-news-detail-common" @click.self="showPopup" v-if="type==0">发表</span>
      <template v-else>
        <span class="comment-btn" @click="link({name: 'TaoYouNewsDetail', params:{id: newsId}})" v-if="category==1">原文</span>
        <span class="comment-btn" @click="link({name: 'TaoYouGameCenterGameDetails', params:{id: newsId}})" v-else>原文</span>
      </template>
      <share-component :config="config" :bind-style="{ marginLeft: '.15rem'}"></share-component>
    </div>
    <!-- 评论弹窗 -->
    <comment-popup @game-comment-post="postComment" :show="show" :length-limit="true" :comment-placeholder="commentPlaceholder">
    </comment-popup>
  </div>
</template>
<script>
import CommentPopup from './comment-popup.component';
import ShareComponent from '../../../oldComponents/tao-you/share/share.component';

export default {
  props: {
    config: {
      type: Object,
      default() {
        return {};
      },
    },
    commentPlaceholder: {
      type: String,
      default: '发表自己的见解',
    },
    category: {
      type: String,
      default: '1',
    },
    type: {
      type: String,
      default: '',
    },
    newsId: {
      type: String,
      default: '',
    },
    commentId: {
      type: String,
      default: '',
    },
  },
  components: {
    CommentPopup,
    ShareComponent,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    link(url) { this.$router.push(url); },
    showPopup() {
      if (+localStorage.getItem('login') === 1) {

        let route = {
          name: 'TaoYouNewsComment',
          params: { newsID: this.newsId, type: this.type, category: this.category },
        };
        if (this.type == '2') {
          route.query = {};
          route.query.commentID = this.commentId;
        }
        this.$router.push(route);
        return;
      }
      debugger;
      localStorage.setItem('Q_next_url', location.hash.slice(1));
      this.$router.push({
        name: 'TaoYouUserLogin',
        query: {
          mID: localStorage.getItem('mID') || 8,
        },
        replace: true,
      });
    },
    postComment(str, limit, getByteLen, cl) {
      this.$emit('post-comment', str, limit, getByteLen, cl);
    },
  },
};
</script>
<style lang="scss" scoped>
/* 引入公共的样式 */

@import '../../../assets/tao-you/common.scss';
.comment-container-replace {
  height: .45rem;
}

.comment-container {
  max-width: 640px;
  height: .45rem;
  background-color: $white;
  position: fixed;
  border-top: 1px solid $primary-border;
  bottom: 0;
  z-index: 9;
  width: 100%;
  box-sizing: border-box;
  padding: .1rem .15rem;
  display: flex;
  align-items: center;
}

.comment-text {
  height: .25rem;
  line-height: .25rem;
  font-size: $font-size-xs;
  border-radius: .05rem;
  border: 1px solid $primary-border;
  flex: 1;
  color: $information;
  text-indent: .1rem;
  box-sizing: border-box;
}

.comment-btn {
  width: .45rem;
  height: .25rem;
  line-height: .25rem;
  background-color: #ffffff;
  font-size: $font-size-sm;
  text-align: center;
  margin-left: .15rem;
  border-radius: .05rem;
  color: #000000;
  border: 1px solid #cccccc;
  box-sizing: border-box;
}

.conment-body {
  margin-left: 0.235rem;
  color: #898989;
  font-size: .205rem;
}
</style>
