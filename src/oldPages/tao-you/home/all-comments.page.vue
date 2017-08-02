<template>
  <div>
    <!--公共头部组件-->
    <app-header :title="title"></app-header>
    <section v-infinite-scroll="getComment" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false" class="secs">
      <div class="container-lf am-wingblank wb15px" v-for="(item,i) in commentList" :key="i">
        <div class="am-wingblank wb15px left">
          <li class="am-list twoline" @click='link({name: "TaoYouHomeAllReplies", params: {newsID: newsID, id:item.id}})'>
            <div class="am-list-item" id="am-list-item-self">
              <div class="am-list-thumb">
                <img class="user-comment-header-pic" :src="item.avatarPath" alt="">
              </div>
              <div class="am-list-content">
                <div class="am-list-title floor-container">
                  {{item.name}}
                  <span class="floor-flag"># {{totalCount - i}}</span>
                </div>
                <div class="am-list-brief">
                  <span>{{item.publishTime}}</span>
                </div>
              </div>
            </div>
          </li>
          <div class="text text-content-outer"> {{ item.content}}</div>
        </div>
        <!--查看全部回复，是该条数据的回复，镶嵌在该条数据的框架下-->
        <div class="apply">
          <div class="am-wingblank wb15px left" id="right" v-for="(v,index) in item.replyList.slice(0,2)" :key="index">
            <li class="am-list twoline">
              <div class="am-list-item col" id="am-list-item-self" style="background-color: rgb(245,245,249);">
                <div class="am-list-thumb">
                  <img class="user-comment-header-pic" :src="v.avatarPath" alt="">
                </div>
                <div class="am-list-content dev">
                  <div class="am-list-title floor-container dev">
                    {{v.name}}
                  </div>
                  <div class="am-list-brief">
                    <span>{{v.publishTime}}</span>
                  </div>
                </div>
              </div>
            </li>
            <div class="text text-content-outer specleft">{{v.content | substr(50,'...')}}</div>
            <div>
              <span>
                <span v-show="1 == index" class="self-p self-rl" @click='link({name: "TaoYouHomeAllReplies", params: {id:item.id}})'>查看全部{{item.replyList.length}}条回复</span>
                <span v-show="1 == index" class="icon-arrow-right self-p "></span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>加载中
      </p>
    </section>
    <!-- 评论弹窗 -->
    <comment-popup @game-comment-post="postComment" :show="commentShow" :length-limit="true" :comment-placeholder="commentContent">
    </comment-popup>
    <!-- 提示窗口 -->
    <tm-dialog :show="showAlert" :content="alertStatus" btn-text="确定"></tm-dialog>
    <comment-dialog @post-comment="postComment" :category="category" type="1" :news-id="$route.params.id"></comment-dialog>
    <return-btn></return-btn>
  </div>
</template>
<script>
import Vue from 'vue';
import { InfiniteScroll, Spinner } from 'mint-ui';
import $ from 'jquery';
import AppHeader from '../../../oldComponents/tao-you/layout/header.component';
import CommentPopup from '../../../oldComponents/tao-you/comment/comment-popup.component';
import tmDialog from '../../../oldComponents/tao-you/dialog/one-button-simple-dialog.component';
import CommentDialog from '../../../oldComponents/tao-you/comment/comment-dialog.component';
import ReturnBtn from '../../../oldComponents/tao-you/button/return.component';

Vue.component('mt-spinner', Spinner);
Vue.use(InfiniteScroll);

export default {
  data() {
    return {
      newsID: 0,
      title: '评论',
      loading: false, // 加载中
      allLoaded: false, // 已全部加载
      pageIndex: 1, // 当前第几页
      pageSize: 5, // 一页数据条数
      commentList: [], // 评论列表
      category: this.$route.params.category,
      totalCount: 0,
      // comment
      commentShow: false,
      commentContent: '',
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
    CommentPopup,
    tmDialog,
    CommentDialog,
  },
  mounted() {
    $('body').css('backgroundColor', '#fff');
    this.getComment();
    this.newsID = this.$route.params.id;
  },
  methods: {
    link(url) {
      this.$router.push(url);
    },
    getComment() {
      if (this.allLoaded) {
        return;
      }
      this.loading = true;
      Vue.ClientHttp(this).GET({
        page: this.pageIndex,
        limit: this.pageSize,
        newsID: this.$route.params.id,
        showType: 4,
        nologin: 1,
        fromType: this.category, // 1：资讯(原创、转载、活动) 2：游戏
      }, Vue.ClientUrl.news_comment_list)
        .then((res) => {
          this.loading = false;
          if (res.code === 10000) {
            this.totalCount = +res.count;
            this.commentList = this.commentList.concat(res.result);
            let length = res.result.length;
            if (length > 0) {
              this.pageIndex++;
            }
            if (length < this.pageSize) {
              this.allLoaded = true;
            }

          }
        });
    },
    /* 打开/关闭评论框 */
    showCommentBox(flag) {
      this.commentShow = flag;
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
      let len = getByteLen(str);
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
        console.log(this.newsID);
        console.log(str);
        if (res.code !== 10000) {
          this.showAlert = true;
          this.alertMsg = '消息提示';
          this.alertStatus = res.msg || '评论失败';
          return;
        }
        if (res.result) {
          console.log(this.commentList.length);
          this.commentList.splice(0, 0, {
            name: res.result.name,
            avatarPath: res.result.avatarPath,
            content: str,
            publishTime: res.result.publishTime,
            id: res.result.id,
          });
          console.log(this.commentList.length);
        }
        this.commentContent = '';
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../../assets/tao-you/common.scss';
.am-list:not([am-version]) .am-list-item {
  padding: 0;
}

.container-lf {
  margin-right: 0;
  border-bottom: 1px solid $primary-border;
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
  padding-left: .6rem;
  white-space: normal;
  word-break: break-all;
}

.secs .container-lf:nth-last-child(2) {
  margin-left: 0;
  padding-left: .15rem;
}
</style>
