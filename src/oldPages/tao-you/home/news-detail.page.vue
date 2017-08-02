<!-- author:zqy -->
<template>
  <div>
    <!--头部-->
    <app-header :title="title"></app-header>
    <!--标题-->
    <div class="am-list twoline">
      <div class="am-list-item am-list-items">
        <div class="am-list-content">
          <div class="am-list-title over">{{news.title}}</div>
          <div class="am-list-brief">
            <span class="am-ft-12">{{ news.publishTime }}</span>
            <span class="am-ft-12 am-wingblank wb10px">{{news.author}}</span>
          </div>
        </div>
      </div>
    </div>
    <section class="TaoYou-News-Section-Content JS-statistics-news-detail-Content">
      <div class="self" v-html="news.content"></div>
      <div class="dont"></div>
    </section>
    <!--评论-->
    <section class="section">
      <div class="am-list info">
        <div class="am-list-body">
          <div class="am-list-item oneline">
            <div class="am-list-content">用户评论</div>
            <div class="am-list-extra yan JS-statistics-news-detail-cos" @click="showCommentBox(true)">评论</div>
          </div>
        </div>
      </div>
      <div class="container-lf am-wingblank wb15px JS-statistics-news-detail-each" v-for="it in commonlist.slice(0,3)" @click='link({name: "TaoYouHomeAllReplies", params: {newsID: newsID, id:it.id, category: category}})'>
        <ul class="am-wingblank wb15px left">
          <li class="am-list twoline">
            <div class="am-list-item" id="am-list-item-self">
              <div class="am-list-thumb">
                <img :src="it.avatarPath">
              </div>
              <div class="am-list-content">
                <div class="am-list-title">{{it.name}}</div>
                <div class="am-list-brief">
                  <span>{{it.publishTime}}</span>
                </div>
              </div>
            </div>
          </li>
          <div class="text">{{it.content | substr(50,'...')}}</div>
        </ul>
        <div class="apply">
          <div class="left apply-left" v-show="it.replyList.length>0">
            <span>
              <span class="self-p" @click='link({name: "TaoYouHomeAllReplies", params: {newsID:newsID,id:it.id, category: category}})'>查看全部{{it.replyList.length}}条回复</span>
              <span class="icon-arrow-right self-p "></span>
            </span>
          </div>
        </div>
      </div>
      <!--查看更多评论-->
    </section>
    <div v-if="num>0" @click="link({name: 'TaoYouHomeAllComments', params: {id: newsID, category: category}})" class="more am-ft-center JS-statistics-news-detail-MoreCommon">查看全部评论({{num}})</div>
    <div v-if="commonlist.length==0" class="more am-ft-center" :class="{'more--last': $route.query.type==1}">还未有评论，快来评论抢占主楼吧</div>
    <template v-if="$route.query.type!==3">
      <div class="dont"></div>
      <!--相关资讯-->
      <div class="am-list" v-if="relatedList.length > 0">
        <div class="am-list-body">
          <div class="am-list-item">
            <div class="am-list-content">相关资讯</div>
          </div>
        </div>
      </div>
      <ul v-if="relatedList.length > 0">
        <li v-for="item in relatedList" @click="link('/tao-you/news/' + item.id)" class="am-wingblank wb15px self-li JS-statistics-news-detail-self-li">
          <p class="am-wingblank wb15px  am-ft-sm " id="break">{{ '• ' + item.title }}</p>
        </li>
      </ul>
    </template>
    <!-- 提示窗口 -->
    <tmDialog :show="showAlert" :content="alertStatus" btn-text="确定"></tmDialog>
    <comment-dialog @post-comment="postComment" :config="config" :news-id="$route.params.id" :category="category" type="0"></comment-dialog>
    <return-btn v-if="!useBackHome"></return-btn>
    <home-btn :back-link="{name: 'TaoYouHome'}" v-if="useBackHome"></home-btn>
    <!-- 添加底部的组件 -->
    <div class="GAME-DETAIL-footer-container">
      <footer-component :only-login="true" :menu-id="1"></footer-component>
    </div>
    <!-- 返回顶部 -->
    <back-top></back-top>
  </div>
</template>
<script>

import Vue from 'vue';
import $ from 'jquery';
import AppHeader from '../../../oldComponents/tao-you/layout/header.component';
import tmDialog from '../../../oldComponents/tao-you/dialog/one-button-simple-dialog.component';
import CommentDialog from '../../../oldComponents/tao-you/comment/comment-dialog.component';
import ReturnBtn from '../../../oldComponents/tao-you/button/return.component';
import HomeBtn from '../../../oldComponents/tao-you/button/home-btn.component';
import FooterComponent from '../../../oldComponents/tao-you/layout/footer.component';
// 统计代码
import Statistics from '../statistics/news-detail/index.statistics';
// 添加回到顶部
import BackTop from '../../../oldComponents/tao-you/button/back-top.component';

export default {
  components: {
    ReturnBtn,
    HomeBtn,
    AppHeader,
    tmDialog,
    CommentDialog,
    FooterComponent,
    BackTop,
  },
  data() {
    return {
      newsID: 0,
      title: '资讯',
      // 新闻详细
      news: {},
      // 评论列表
      commonlist: [],

      // 回复列表
      relatedList: [],
      // comment
      commentShow: false,
      commentContent: '',
      // 弹框
      showAlert: false,
      alertMsg: '',
      alertStatus: '',
      config: {
        url: location.href,
      },
      // 微信返回问题
      useBackHome: false,
      category: '1',
    };
  },
  watch: {
    $route(val) {
      this.changeId(val.params.id);
    },
  },
  computed: {
    num() { // 还有多少评论
      return this.commonlist.length <= 3 ? 0 : this.commonlist.length; // 评论数
    },
  },
  methods: {
    link(url) {
      this.$router.push(url);
    },
    changeId(id) { // 初始化
      this.news = {};
      this.relatedList = [];
      this.commentList = [];
      this.newsID = id;

      this.loadNewsDetail(id);
      this.loadRelatedNewsList(id);
      this.loadCommentList(id);
      this.$emit('init-load-more');

      // 处理微信分享的问题
      try {
        if (this.$route.query.shareFrom === 'wechat') {
          this.useBackHome = true;
        } else {
          this.useBackHome = false;
        }
      } catch (e) {
        console.log(e);
      }

      return {};
    },
    shareWechat(msg) {
      wx.ready(() => {
        // 修复分享参数的问题
        let shareUrl;
        if (this.$route.query.shareFrom === 'wechat') {
          shareUrl = window.location.href;
        } else {
          shareUrl = encodeURI(`${window.location.href}?shareFrom=wechat`);
        }
        let content = $('.self').children('p').first().text();
        if (content.length > 36) {
          content = `${content.substring(0, 36)}...`;
        }
        // 分享的文案
        const shareInfo = {
          title: msg.title, // 分享标题
          link: shareUrl, // 分享链接
          desc: content,
          imgUrl: msg.imgUrl || $('.self').find('img').attr('src'),
        };
        // 分享到朋友圈
        wx.onMenuShareTimeline(shareInfo);
        // 分享给朋友
        wx.onMenuShareAppMessage(shareInfo);

        const otherShareInfo = {
          title: msg.title, // 分享标题
          link: shareUrl, // 分享链接
          desc: msg.author,
          imgUrl: msg.imgUrl || $('.self').find('img').attr('src'),
        };

        wx.onMenuShareQQ(otherShareInfo);
        wx.onMenuShareWeibo(otherShareInfo);
        wx.onMenuShareQZone(otherShareInfo);
      });
    },

    /* 获取资讯详细 */
    loadNewsDetail(id) {
      Vue.ClientHttp(this).GET({
        newsID: id,
        nologin: 1,
      }, Vue.ClientUrl.news_detail).then((res) => {
        if (res.code === 10000) {
          this.news = res.result;

          // 微信分享
          this.shareWechat(this.news);

          Vue.nextTick(() => {
            Object.assign(this.config, {
              title: res.result.title,
              summary: '',
              pic: $('.self').find('img').attr('src'),
            });
          });
        }
      });
    },

    /* 获取相关资讯列表 */
    loadRelatedNewsList(id) {
      Vue.ClientHttp(this).GET({
        newsID: id,
        page: 1,
        limit: 2,
        nologin: 1,
      }, Vue.ClientUrl.unite_news).then((res) => {
        if (res.code === 10000) {
          this.relatedList = res.result.slice(0, 2);
        }
      });
    },

    /* 获取评论列表 */
    loadCommentList(id) {
      const query = {
        newsID: id,
        showType: 2,
        nologin: 1,
        fromType: 1, // 1：资讯(原创、转载、活动) 2：游戏
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.news_comment_list).then((res) => {
        if (res.code === 10000) {
          this.commonlist = res.result;
        }
      });
    },

    /* 打开/关闭评论框 */
    showCommentBox(flag) {
      if (+localStorage.getItem('login') === 1) {
        this.$router.push({
          name: 'TaoYouNewsComment',
          params: { newsID: this.$route.params.id, category: this.category, type: 0 },
        });
        return;
      }
      localStorage.setItem('Q_next_url', location.hash.slice(1));
      this.$router.push({
        name: 'TaoYouUserLogin',
        query: {
          mID: localStorage.getItem('mID') || 8,
        },
        replace: true,
      });
    },


    /* 提交评论 */
    postComment(str, limit, getByteLen, clearText) {
      // 评论内容为空
      if (str.trim() == '') {
        this.showAlert = true;
        this.alertMsg = '消息提示';
        this.alertStatus = '评论失败，内容不能为空';
        console.log('评论为空');
        return;
      }
      const len = getByteLen(str);
      if (len > limit) {
        this.showAlert = true;
        this.alertMsg = '消息提示';
        this.alertStatus = '评论失败，内容输入过长';
        return;
      }
      clearText();

      // 提交评论
      Vue.ClientHttp(this).POST({
        type: 1,
        newsID: this.newsID,
        content: str,
      }, Vue.ClientUrl.do_comment).then((res) => {
        if (res.code !== 10000) {
          this.showAlert = true;
          this.alertMsg = '消息提示';
          this.alertStatus = res.msg || '评论失败';
          return;
        }

        if (res.result) {
          this.commonlist.splice(0, 0, {
            name: res.result.name,
            avatarPath: res.result.avatarPath,
            content: str,
            publishTime: res.result.publishTime,
            id: res.result.id,
            newsID: this.$route.params.id,
          });
        }

        this.commentContent = '';
      });
    },

  },
  mounted() {
    this.changeId(this.$route.params.id);
    // 使用统计脚本
    Statistics(this);
    $('body').css('backgroundColor', '#fff');
  },
};
</script>
<style lang="scss" scoped>
@import '../../../assets/tao-you/common.scss';
.am-list {
  padding: 0;
  .am-list-title {
    font-weight: 600;
  }
}

.self {
  padding: .1rem .15rem 0;
  background-color: #fff;
  color: $words;
  overflow-x: hidden;
}

.self-img {
  min-height: 2.9rem;
  margin: .15rem;
}

.container {
  background-color: white;
}

.dont {
  width: 100%;
  height: .15rem;
  background-color: #f5f5f9;
}

.am-list-item {
  background-color: red!important;
  border-top: 1px solid $primary-border;
  border-bottom: 1px solid $primary-border;
}

.container-lf {
  margin-right: 0;
  border-bottom: 1px solid $primary-border;
  .left {
    margin-left: 0;
  }
}

#am-list-item-self {
  border: none!important;
  padding-right: 0!important;
  padding-left: 0!important;
}

.am-list-thumb img {
  border-radius: 50%;
}

.text {
  width: 100%;
  white-space: normal;
  word-break: break-all;
  color: $words;
  padding-bottom: .1rem;
  border: none;
  /*text-indent: .32rem;*/
}

.more {
  height: .44rem;
  line-height: .44rem;
  color: #cccccc;
  border-bottom: solid #e5e5e5 1px;

  &--last {
    border-bottom: none;
  }
}

.self-li {
  margin-right: 0;
  border-bottom: 1px solid $primary-border;
  &:last-child {
    border-bottom: none;
  }
  p {
    margin-left: 0;
    /*height: .4rem;*/
    line-height: .26rem;
  }
}

.yan {
  color: #a5a5a5 !important;
}

#break {
  /*overflow: hidden;*/
  min-height: .4rem;
  display: inline-flex;
  align-items: center;
  /*white-space:normal;*/
  /*word-break:break-all;*/
}

.am-list .am-list-items {
  background-color: $primary-bgc!important;
}















/****/

.apply {
  /*background-color: rgb(245,245,249);*/
  margin-bottom: .1rem;
}

#right {
  margin-left: .15rem;
}

.self-p {
  color: rgb(176, 176, 176);
}

.self-rl {
  margin-left: .6rem;
}

.icon-arrow-right {
  font-size: .14rem;
}

.user-comment-header-pic {
  border-radius: 50%;
}

.secs {
  border-top: 1px solid $stress-border;
}

.specleft {
  white-space: normal;
  word-break: break-all;
}

.over {
  white-space: normal!important;
  word-break: break-all!important;
}

.apply-left {
  display: flex;
  justify-content: flex-end;
  margin-right: .15rem;
}

.section .container-lf:nth-last-child(1) {
  margin-left: 0;
  padding-left: .15rem;
}
</style>
