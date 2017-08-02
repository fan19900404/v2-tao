<!-- author:yex -->
<template>
  <app-header :title="title"></app-header>
  <section class="container">
    <section v-if="!$loadingRouteData" v-el:news class="news-detail bgc-white margin-bottom border-bottom">

      <!-- 资讯详情 -->
      <div class="detail" v-if="news">
        <div class="news-header bgc-gray padding border-bottom">
          <h3 class="text-big margin-small-bottom text-lh-big">{{ news.title }}</h3>
          <div class="more-info text-lh-small">
              <span class="source overflow-ellipsis inline-block margin-small-right">{{ news.author }}</span>
              <span class="publish-time overflow-ellipsis inline-block">{{ news.publishTime }}</span>
            </div>
        </div>
        <div class="content padding text-big text-lh">
          {{{ news.content }}}
        </div>
      </div>

      <!-- 相关资讯 -->
      <div class="related-info padding-top padding-left padding-right" v-if="relatedList.length > 0">
        <div class="related-list-title msg-title border-bottom padding-small-bottom">相关资讯</div>
        <ul class="list margin-top">
          <li v-link="'/tao-you/news/' + item.id" class="item margin overflow-ellipsis" v-for="item in relatedList">{{ '• ' + item.title }}</li>
        </ul>
      </div>
    </section>

    <!-- 用户评论 -->
    <section v-if="!$loadingRouteData" class="user-commont bgc-white margin-bottom text-default">
      <div class="padding border-top-bottom">
        <div class="title clearfix border-bottom padding-bottom">
          <span class="fl text-red">用户评论</span>
          <a class="fr text-blue" @click="showCommentBox(true)">评论</a>
        </div>
        <load-more-by-click :list="commentList"
        :left-msg-count="leftMsgCount"
        :is-loading="isLoading"
        :can-load-more="canLoadMore"
        :query="query"
        :data-url="dataUrl">
          <ul slot="list-content" class="list-content commentList">
            <li class="item margin-top margin-bottom border-bottom" v-for="item in commentList">
              <div class="clearfix">
                <div class="wrapper fl text-lh-little">
                  <img class="radius-circle" :src="item.avatarPath" alt="">
                </div>
                <div class="fl margin-left text-lh-little text-small">
                  <div>{{ item.name }}</div>
                  <div class="publish-time margin-little-top">{{ item.publishTime }}</div>
                </div>
              </div>
              <div class="margin-top margin-bottom text-big">
                {{ item.content }} {{v.email}}
              </div>
            </li>
          </ul>
          <p v-show="!isLoading && canLoadMore" @click="loadMore" slot="load-more-btn" class="load-more-btn moreinfo text-blue text-center margin-top">查看更多评论</p>
        </load-more-by-click>
      </div>
    </section>
  </section>
  <app-footer></app-footer>

  <!-- 评论框 -->
  <game-comment :show="commentShow" @game-comment-cancel="showCommentBox(false)" @game-comment-post="submitC" :comment-content="commentContent" :length-limit="true"></game-comment>

  <!-- common alert -->
  <common-alert :type="alertType" :show-alert="showAlert" :alert-msg="alertMsg" :alert-status="alertStatus"></common-alert>
</template>

<script>
  'use strict';
  import Vue from 'vue';
  import AppHeader from '../../oldComponents/common-layout/header.component';
  import AppFooter from '../../oldComponents/common-layout/footer.component';
  import LoadMoreByClick from '../../oldComponents/common-load-more/load-more-by-click';
  import GameComment from '../../oldComponents/common-comment/game-comment.component';
  import CommonAlert from '../../oldComponents/common-alert/common-alert.component';

  export default {
    components: {
      AppHeader,
      AppFooter,
      LoadMoreByClick,
      GameComment,
      CommonAlert
    },
    data() {
      return {
        title: '游戏资讯',
        // 点击加载
        dataUrl: Vue.ClientUrl.news_comment_list,
        query: {
          page: 1,
          limit: 4
        },
        leftMsgCount: null,
        isLoading: null,
        canLoadMore: null,
        commentList: [], // 新闻评论列表
        // 新闻详细
        news: null,
        // 相关新闻列表
        relatedList: [],
        // comment
        commentShow: false,
        commentContent: '',
        // 弹框
        alertType: 0,
        showAlert: false,
        alertMsg: '',
        alertStatus: '',
        // 接口返回数据
        res1: null,
        res2: null,
        res3: null,

        // 滚动条位置
        scrollTop: 0
      }
    },
    mounted() {
      $('body').css('background-color', '#f8f8f8');
    },
    route: {
      data({ to: { params: { id }}}) {
        this.news = null;
        this.relatedList = [];
        this.query.page = 1;
        this.query.limit = 4;
        this.query.newsID = id;
        this.commentList = [];

        return {
          res1: this.loadNewsDetail(id),
          res2: this.loadRelatedNewsList(id),
          res3: this.$broadcast('init-load-more')
        };
      }
    },
    methods: {

      /* 获取资讯详细 */
      loadNewsDetail(id) {
        Vue.ClientHttp().GET({
            newsID: id
          }, Vue.ClientUrl.news_detail)
          .then((res) => {
            if (res.code === 10000) {
              this.news = res.result;
              return;
            }
          });
      },

      /* 获取相关资讯列表 */
      loadRelatedNewsList(id) {
        Vue.ClientHttp().GET({
            newsID: id,
            page: 1,
            limit: 2
          }, Vue.ClientUrl.unite_news)
          .then((res) => {
            if (res.code === 10000) {
              this.relatedList = res.result.slice(0, 2);
              return;
            }
            console.log('获取相关资讯列表失败');
          });
      },

      /* 加载更多评论 */
      loadMore() {
        this.$broadcast('load-more-by-click');
      },

      /* 打开/关闭评论框 */
      showCommentBox(flag) {
        this.commentShow = flag;
        if(flag){
          this.scrollTop = document.body.scrollTop;
          return;
        }
        window.scrollTo(0, this.scrollTop);
      },

      /* 提交评论 */
      submitC() {

        // 评论内容为空
        if (!this.commentContent || (typeof this.commentContent != 'undefined' && this.commentContent.replace(/(^\s+)|(\s+$)/g, '') == '')) {
          console.log('评论为空');
          return;
        }

        // 提交评论
        Vue.ClientHttp().POST({
            newsID: this.$route.params.id,
            content: this.commentContent
          }, Vue.ClientUrl.do_comment)
          .then((res) => {
            window.scrollTo(0, this.scrollTop);
            if (res.code !== 10000) {
              this.showAlert = true;
              this.alertMsg = "消息提示";
              this.alertStatus = res.msg || '评论失败';
              return;
            }
            if(res.result){
              this.commentList.splice(0, 0, {
                name: res.result.name,
                avatarPath: res.result.avatarPath,
                content: this.commentContent,
                publishTime: res.result.publishTime
              });
            }
            this.commentContent = '';
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container{
    -webkit-user-select: text!important;
    user-select: text!important;
  }
  .news-detail{
    .content{
      font-size: 1.6rem;
      line-height: 1.6;
    }
    .more-info{
      overflow: hidden;
      vertical-align: middle;
      color: #898989;

      .source{
        max-width: 60%;
      }
      .publish-time{
        max-width: 40%;
      }
    }
  }

  .related-info{
    .list{
      .item{
        font-size: 1.4rem;
      }
    }
  }

  .commentList{
    .item{
      .wrapper{
        width: 2.5rem;
        height: 2.5rem;
      }
      .publish-time{
        color: #898989;
      }
    }
  }

  .msg-title {
    font-size: 1.4rem;
    color: #898989;
  }
</style>
