<template>
  <div>
    <!--公共头部组件-->
    <app-header :title="title" class="secs"></app-header>
    <div class="container-lf am-wingblank wb15px">
      <div class="am-wingblank wb15px left">
        <li class="am-list twoline">
          <div class="am-list-item">
            <div class="am-list-thumb">
              <img :src="userinfo.avatarPath" alt="">
            </div>
            <div class="am-list-content">
              <div class="am-list-title floor-container">
                {{userinfo.name}}
              </div>
              <div class="am-list-brief">
                <span>{{userinfo.publishTime}}</span>
              </div>
            </div>
          </div>
        </li>
        <div class="text text-content-outer"> {{ userinfo.content }}</div>
      </div>
    </div>
    <section v-show="replieslist.length > 0" class="list-box" v-infinite-scroll="getComment" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
      <div class="container-lf am-wingblank wb15px user-answer-comment" v-for="(item,index) in replieslist" :key="index">
        <div class="am-wingblank wb15px left">
          <li class="am-list twoline">
            <div class="am-list-item single-user-comment">
              <div class="am-list-thumb">
                <img class="user-comment-header-pic" :src="item.avatarPath" alt="">
              </div>
              <div class="am-list-content">
                <div class="am-list-title floor-container">
                  {{item.name}}
                </div>
                <div class="am-list-brief">
                  <span>{{item.publishTime}}</span>
                </div>
              </div>
            </div>
          </li>
          <div class="text text-content-outer specleft"> {{ item.content }}</div>
        </div>
      </div>
      <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>加载中
      </p>
    </section>
    <!-- 提示窗口 -->
    <tm-dialog :show="showAlert" :content="alertStatus" btn-text="确定"></tm-dialog>
    <comment-dialog @post-comment="postComment" :comment-placeholder="commentPlaceholder" :category="category" type="2" :news-id="$route.params.newsID" :comment-id="$route.params.id"></comment-dialog>
    <return-btn></return-btn>
  </div>
</template>
<script>
import Vue from 'vue';
import { InfiniteScroll, Spinner } from 'mint-ui';
import $ from 'jquery';
import AppHeader from '../../../components/tao-you/layout/header.component';
import CommentDialog from '../../../components/tao-you/comment/comment-dialog.component';
import tmDialog from '../../../components/tao-you/dialog/one-button-simple-dialog.component';
import ReturnBtn from '../../../components/tao-you/button/return.component';

Vue.component('mt-spinner', Spinner);
Vue.use(InfiniteScroll);

export default {
  data() {
    return {
      newsID: 0,
      id: 0,
      title: '评论',
      commentPlaceholder: '回复xxx', // 评论框默认内容
      loading: false, // 加载中
      allLoaded: false, // 已全部加载
      pageIndex: 1, // 当前第几页
      pageSize: 5, // 一页数据条数
      replieslist: [], // 要获取的回复列表
      category: this.$route.params.category,
      userinfo: {},
      // 弹框
      showAlert: false,
      alertMsg: '',
      alertStatus: '',
    };
  },
  components: {
    ReturnBtn,
    AppHeader,
    InfiniteScroll,
    Spinner,
    tmDialog,
    CommentDialog,
  },
  mounted() {
    $('body').css('backgroundColor', '#fff');
    this.getComment();
    this.newsID = this.$route.params.newsID;
    this.id = this.$route.params.id;
  },
  methods: {
    getComment() { // 获取回复列表
      if (this.allLoaded) {
        return;
      }

      this.loading = true;

      Vue.ClientHttp(this).GET({
        page: this.pageIndex,
        limit: this.pageSize,
        id: this.$route.params.id,
        showType: 3,
        nologin: 1,
        fromType: this.category, // 1：资讯(原创、转载、活动) 2：游戏
      }, Vue.ClientUrl.news_comment_list)
        .then((res) => {
          this.loading = false;
          if (res.code === 10000) {
            if (res.result.length > 0) {
              this.replieslist = this.replieslist.concat(res.result[0].replyList);
              this.userinfo = res.result[0];
              this.commentPlaceholder = '回复' + this.userinfo.name;
              const length = res.result[0].replyList.length;
              if (length > 0) {
                this.pageIndex++;
              }
              if (length < this.pageSize) {
                this.allLoaded = true;
              }
            }
          }
        });
    },

    // 提交评论
    postComment(str, limit, getByteLen, clearText) {
      // 评论内容为空
      if (str.trim() === '') {
        this.showAlert = true;
        this.alertMsg = '消息提示';
        this.alertStatus = '评论失败，内容不能为空';
        console.log('评论为空');
        return;
      }
      let len = getByteLen(str);
      if (len > limit) {
        this.showAlert = true;
        this.alertMsg = '消息提示';
        this.alertStatus = '评论失败，内容输入过长';
        return;
      }
      clearText();

      // 提交评论
      Vue.ClientHttp().POST({
        type: 2,
        newsID: this.newsID,
        repliedNewsID: this.id,
        content: str,
      }, Vue.ClientUrl.do_comment).then((res) => {
        if (res.code !== 10000) {
          this.showAlert = true;
          this.alertMsg = '消息提示';
          this.alertStatus = res.msg || '评论失败';
          return;
        }

        if (res.result) {
          this.replieslist.splice(0, 0, {
            name: res.result.name,
            avatarPath: res.result.avatarPath,
            content: str,
            publishTime: res.result.publishTime,
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../../assets/tao-you/common.scss';
.list-box {
  padding-bottom: .5rem;
}

.am-list:not([am-version]) .am-list-item {
  padding: 0;
}

.container-lf {
  margin-right: 0;
  /*border-bottom: 1px solid $primary-border;*/
  .left {
    margin-left: 0;
  }
}

.floor-container {
  display: flex;
  justify-content: space-between;
}

.text-content-outer {
  padding-bottom: .15rem;
  color: $words;
  white-space: normal;
  word-break: break-all;
}

.floor-flag {
  font-size: $font-size-xs;
  color: $information;
}

.apply {
  background-color: rgb(245, 245, 249);
  margin-bottom: .1rem;
}

#right {
  margin-left: .15rem;
}

.self-p {
  color: rgb(176, 176, 176);
  margin-left: .15rem;
}

.icon-arrow-right {
  font-size: .14rem;
}

section {
  /*margin-bottom: .50rem;*/
  border-top: 1px solid $primary-border;
  border-bottom: 1px solid $primary-border;
}

.user-comment-header-pic {
  border-radius: 50%;
}

.list-box {
  background-color: #f5f5f9;
  padding-bottom: 0;
}

.user-answer-comment:not(:first-child) {
  border-top: 1px solid $primary-border;
}

.single-user-comment {
  background-color: #f5f5f9 !important;
}

.secs {
  border-bottom: 1px solid $stress-border;
}

.specleft {
  padding-left: .6rem;
  white-space: normal;
  word-break: break-all;
}
</style>
