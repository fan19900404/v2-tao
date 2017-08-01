<template>
  <div>
    <!--顶部-->
    <div class="header">
      <header-component :title="title"></header-component>
    </div>
    <!-- 游戏的图片介绍 -->
    <div class="game-simple-intro">
      <img class="game-simple-intro__img" :src="pd.gameIcon" alt="游戏图标">
      <div class="game-simple-intro__text">
        <div class="name">{{pd.gameName}}</div>
        <div class="type">类型:{{pd.category}}</div>
        <div class="intro" v-html="pd.abstract"></div>
        <share-component :config="config" :bind-style="{display: 'flex', position: 'absolute', top: 0, right: 0}"></share-component>
      </div>
    </div>
    <!--选项卡-->
    <div class="tab">
      <div class="tab__slide" v-for="(v,index) in tabList" v-bind:class="{'active':index==type}" @click="check(index)" :key="index">{{v}} {{index!=0 ? '(' + mul[index] + ')':null}}</div>
    </div>
    <section v-show="type===0" style="background:#ffffff;padding-top:.15rem;padding-bottom:.05rem">
      <!--轮播-->
      <div class="carousel-outer-wrapper">
        <div class="swiper-container__game-detail">
          <div class="swiper-wrapper">
            <div v-for="(v,index) in drCarouselData" class="swiper-slide" :key="index">
              <img class="swiper-slide__game-detail-img" :src="v" alt="">
            </div>
          </div>
        </div>
      </div>
      <!-- 游戏的更多详细信息 h5 -->
      <div v-show="1 === 1" class="game-other-msg am-flexbox">
        <!-- h5 -->
        <div class="am-flexbox-item">
          <div class="item-info">
            <span class="item-key">游戏版本</span>
            <span class="item-value overflow-ellipsis">{{pd.version}}</span>
          </div>
          <div class="item-info">
            <span class="item-key">人气值</span>
            <span class="item-value overflow-ellipsis">{{pd.downNumber}}</span>
          </div>
          <div class="item-info">
            <span class="item-key">运营商</span>
            <span class="item-value overflow-ellipsis">{{pd.company}}</span>
          </div>
        </div>
        <div class="am-flexbox-item">
          <div class="item-info">
            <span class="item-key">是否联网</span>
            <span class="item-value overflow-ellipsis">{{+pd.isOnline ? '是' : '否'}}</span>
          </div>
          <div class="item-info">
            <span class="item-key">游戏评分</span>
            <span class="item-value overflow-ellipsis">{{pd.averageScore}}</span>
          </div>
        </div>
      </div>
      <!-- 游戏的文字介绍 <span class="game-intro-weight">游戏简介</span>: -->
      <div class="game-text-intro" v-html="pd.gameIntro"></div>
    </section>
    <section v-show="type===1" class="section1">
      <div class="list" v-for="(item,index) in Packs" :key="index">
        <div class="list__container" @click="link({name:'TaoYouPacksDetails',params:{id:item.id}})">
          <div class="list__img">
            <img :src="item.image">
          </div>
          <div class="list__text">
            <p class="p1">{{item.gameName}}</p>
            <p class="p2">{{item.name}}</p>
            <p class="p3">{{item.typeName}}</p>
          </div>
          <div class="gift__progress">
            <progress-component :has="item.uID!=0" :progress="item.usedNumber/item.totalNumber*100"></progress-component>
            <span :class="{'gift__progress-text--new':item.uID==0,'gift__progress-text--old':item.uID!=0}" class="gift__progress-text">{{item.uID == 0&&item.taoDou !=0 ? '兑' :item.uID == 0?'领':'已领' }}</span>
          </div>
        </div>
      </div>
      <div class="no" v-show="Packs.length==0">亲：当前没有游戏礼包哦！</div>
    </section>
    <section v-show="type===2" class="section2">
      <div class="task" v-for="(item,index) in bearList" :key="index">
        <div class="task__left">
          <img class="task__img" :src="item.picPath" alt="">
          <div class="task__intro">
            <div class="task__name overflow-ellipsis">{{item.title}}</div>
            <div class="task__type overflow-ellipsis-multiline">{{item.content}}</div>
          </div>
        </div>
        <div class="task__right">
          <div class="task__info">
            <a class="task__btn task__btn--finished" v-if="item.isComplete==1" @click="go(item.url)">去完成</a>
            <a class="task__btn task__btn--get" v-if="item.isComplete==2" @click.stop="getTaskAward(item.id,index)">领取</a>
            <a class="task__btn task__btn--disabled" v-if="item.isComplete==3">已领取</a>
            <span class="task__award">{{item.reward}}</span>
          </div>
        </div>
      </div>
      <div class="task__more" v-show="false">更多任务
        <i class="icon-arrow-right"></i>
      </div>
      <div class="no" v-show="bearList.length==0">亲：当前没有游戏任务哦！</div>
    </section>
    <section v-if="type==3" class="section3" :class="{'have':commentList.length>0}">
      <div class="container-lf am-wingblank wb15px" v-for="(it,index) in commentList.slice(0,3)" @click='link({name: "TaoYouHomeAllReplies", params: {newsID: $route.params.id, id: it.id, category: category}})' :key="index">
        <ul class="wb15px left">
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
          <div class="text">{{it.content | substr (50, '...')}}</div>
        </ul>
        <div class="apply">
          <div class="left apply-left" v-show="it.replyList.length>0">
            <span>
              <span class="self-p" @click='link({name: "TaoYouHomeAllReplies", params: {newsID: $route.params.id,id:it.id, category: category}})'>查看全部{{it.replyList.length}}条回复</span>
              <span class="icon-arrow-right self-p "></span>
            </span>
          </div>
        </div>
      </div>
      <div class="task__more" v-show="commentList.length>4" @click="link({name: 'TaoYouHomeAllComments', params: {id: $route.params.id, category: category}})">查看更多评论
        <i class="icon-arrow-right"></i>
      </div>
      <div class="no" v-show="commentList.length==0">亲：当前没有游戏评论哦！</div>
    </section>
    <!--相关游戏-->
    <div class="title" @click="link({name:'TaoYouGameCenter'})">
      <span class="title__left">相关游戏</span>
      <span class="title__right">更多
        <i class="icon-arrow-right"></i>
      </span>
    </div>
    <!--游戏列表-->
    <div class="all">
      <div class="list" v-for="(item,index) in moreGames" :key="index">
        <div class="list__container" @click="link({name:'',params:{id:'id'}})">
          <div class="list__img">
            <img :src="item.gameIcon">
          </div>
          <div class="list__text" @click="Intro(item.id)">
            <p class="p1">{{item.name}}</p>
            <p class="p2" v-show="item.field ==1">{{item.category}}</p>
            <p class="p2" v-show="item.field ==2">{{item.category}} | {{item.fileSize}}</p>
            <p class="p3">{{item.abstract.slice(0,13)}}</p>
          </div>
          <div class="list__button" @click="open(item.field,item.id,item.gameUrl,item.name,item.direction)">
            <a>进入</a>
            <div class="list__num">
              <span>{{item.viewNumber}}</span>人在玩</div>
          </div>
        </div>
      </div>
      <p v-show="loading" class="page-infinite-loading">
        <my-spinner type="fading-circle"></my-spinner>加载中...
      </p>
    </div>
    <!--按钮及评论-->
    <div class="button">
      <div class="button__share" @click="link({name: 'TaoYouNewsComment', params: {newsID: $route.params.id, category: category, type: 1}})">
        <div class="share-wrapper">
          <span class="icon-comment">
          </span>
          <div class="button__text">评论</div>
        </div>
      </div>
      <div class="button__key">
        <app-button :btn-text="btnMsg" @button-component="button"></app-button>
      </div>
    </div>
    <return-btn></return-btn>
    <!-- 返回顶部 -->
    <back-top></back-top>
    <!--2个按钮弹窗-->
    <dialog-component :show="showDialog" content="showContent" :has-slot="true" left-btn-text="全部任务" right-btn-text="立即查看" @two-btns-dialog-component-left="left" @two-btns-dialog-component-right="right">
    </dialog-component>
    <!--1个按钮弹窗-->
    <dialog-component-one :show="isShowOneDialog" :btn-Text="'确定'" :content="'当前设备不支持下载'"></dialog-component-one>
  </div>
</template>
<style lang="scss" scoped>
@import "../../../../assets/tao-you/common.scss";
.game-simple-intro {
  display: flex;
  padding: .15rem;
  box-sizing: border-box;
  height: 1rem;
  background-color: $white;
  align-items: center;
  border-top: 1px solid $primary-border;
  /**border-bottom: 1px solid $primary-border;**/
  margin-bottom: .15rem;

  &__img {
    height: .7rem;
    width: .7rem;
    min-width: .7rem;
    margin-right: .1rem;
    border-radius: .15rem;
  }
  &__text {
    display: flex;
    flex-direction: column;
    height: .6rem;
    justify-content: space-between;

    position: relative;
    width: 100%;

    .name {
      color: #333;
      font-size: $font-size-lg;
      height: $font-size-lg;
      line-height: $font-size-lg;
    }
    .type,
    .intro {
      color: #a5a5a5;
      font-size: $font-size-md;
      height: $font-size-md;
      line-height: $font-size-md;
      overflow: hidden;
    }
    .share-area {
      display: flex;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}

.tab {
  height: .45rem;
  display: flex;
  background: #ffffff;
  &__slide {
    flex: 1;
    font-size: .14rem;
    color: #666666;
    text-align: center;
    line-height: .45rem;
    box-sizing: border-box;
  }
}

.active {
  color: #00C1B3;
  border-bottom: 2px solid #00C1B3;
}

.carousel-outer-wrapper {
  background-color: $white;
  margin-left: .15rem;
  display: block;
  overflow: hidden;
}

.game-other-msg {
  align-items: stretch;
  border-top: 1px solid #dfdfdf;
  color: #898989;
  font-size: .14rem;
  padding: .1rem .15rem .1rem .15rem;
}

.item-info {
  display: flex;
  line-height: .22rem;

  .item-key {
    width: .61rem;
    min-width: .61rem;
  }
}

.item-value {
  width: .88rem;
  color: #000;
  padding-left: .05rem;
}

.game-text-intro {
  padding-right: .15rem;
  color: #898989;
  font-size: .14rem;
  line-height: .22rem;
  border-top: 1px solid #dfdfdf;
  padding-top: .1rem;
  padding-bottom: .1rem;
  text-indent: .1rem;
  padding-left: .15rem;
}



/*通用头*/

.title {
  height: .42rem;
  line-height: .42rem;
  padding: 0 .15rem;
  /*border-top: 1px solid #E5E5E5;*/
  border-bottom: 1px solid #E5E5E5;
  background: white;
  margin-top: .15rem;
  &__left {
    font-size: .16rem;
    color: #333333;
    float: left;
  }
  &__right {
    color: #c7c7cc;
    font-size: .13rem;
    float: right;
    i {
      color: #c7c7cc;
      font-size: .13rem;
    }
  }
}



/*图片/文字/右边圆环*/

.list {
  background: white;
  &__container {
    display: flex;
    margin-left: .15rem;
    border-bottom: 1px solid #E5E5E5;
  }
  &__img {
    width: .43rem;
    height: .43rem;
    padding-top: 0.07rem;
    padding-right: 0.10rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 0.06rem;
    }
  }
  &__text {
    flex: 1;
    .p1 {
      height: .16rem;
      font-size: .16rem;
      color: #333333;
      padding-top: .07rem;
    }
    .p2 {
      height: .14rem;
      font-size: .13rem;
      color: #a5a5a5;
      padding-top: .07rem;
    }
    .p3 {
      height: .10rem;
      font-size: .13rem;
      color: #a5a5a5;
      padding-top: .05rem;
      padding-bottom: .14rem;
    }
  }
  &__button {
    /*display: flex;*/
    /*align-items: center;*/
    margin-right: .15rem;
    a {
      display: inline-block;
      width: .46rem;
      height: .25rem;
      box-sizing: border-box;
      line-height: .25rem;
      text-align: center;
      border: 1px solid #cccccc;
      border-radius: 0.04rem;
      font-size: .13rem;
      color: #333333;
      float: right;
      margin-top: .17rem;
      margin-bottom: 0.05rem;
    }
  }
  &__num {
    font-size: .12rem;
    color: #666666;
    padding-bottom: .11rem;
    span {
      color: #ff4a4a;
    }
  }
}

.all {
  margin-bottom: .62rem;
}

.all .list:nth-last-child(2) .list__container {
  border-bottom: none;
}

.all .list:nth-last-child(1) {
  border-bottom: 1px solid #E5E5E5;
}

.page-infinite-loading {
  font-size: .14rem;
  color: #a5a5a5;
}

.button {
  background: #ffffff;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  border-top: 1px solid #E5E5E5;
  z-index: 99;
  max-width: 640px;
  &__key {
    flex: 1;
    margin-right: .15rem;
    padding: .10rem 0;
  }
  &__share {
    text-align: center;
    width: .61rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .share-wrapper {
      span {
        padding: .10rem 0 .04rem 0;
        color: #666666;
      }
    }
  }
  &__text {
    font-size: .12rem;
    color: #666666;
  }
}

.gift__progress {
  position: relative;
  width: .39rem;
  height: .39rem;
  margin-top: .15rem;
  margin-right: .15rem;
}

.gift__progress-text {
  position: absolute;
  font-size: .11rem;
  width: .24rem;
  height: .12rem;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  line-height: .12rem;
}

.gift__progress-text--new {
  color: #00C1B3;
}

.gift__progress-text--old {
  color: #a5a5a5;
}

.section1 .list:nth-child(1) {
  border-top: 1px solid #E5E5E5;
}

.section1 .list:nth-last-child(2) .list__container {
  border-bottom: none;
}

.task {
  height: 0.765rem;
  background-color: #fff;
  display: flex;
  padding-left: .15rem;
  padding-right: .15rem;
  border-bottom: 1px solid #e5e5e5;
  &__more {
    font-size: .13rem;
    color: #a5a5a5;
    height: .36rem;
    text-align: center;
    line-height: .36rem;
    background: #ffffff;
  }
  &__left {
    display: flex;
    flex: 1;
  }
  &__right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    width: .935rem;
    font-size: .12rem;
  }
  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
  &__img {
    display: block;
    width: .43rem;
    height: .43rem;
    margin-top: .1rem;
    border-radius: .05rem;
  }
  &__intro {
    flex: 1; // max-width: 1.5rem;
    margin-top: .1rem;
    padding-left: .1rem;
    padding-right: .05rem;
  }
  &__name {
    max-width: 1.5rem;
    height: .16rem;
    line-height: .16rem;
    font-size: .16rem;
    color: #333;
  }
  &__type,
  &__platform {
    // max-width: 1.5rem;
    height: .32rem;
    line-height: .16rem;
    margin-top: .07rem;
    font-size: .14rem;
    color: #a5a5a5;
  }
  &__award {
    margin-top: .05rem;
    span {
      color: #ff4a4a;
    }
  }
  &__btn {
    display: inline-block;
    box-sizing: border-box;
    width: .46rem;
    height: .25rem;
    line-height: .25rem;
    color: #333;
    font-size: .13rem;
    /*px*/
    text-align: center;
    border: solid #f0f0f0 1px;
    /*no*/
    background-color: #fff;
    border-radius: .04rem;

    &--disabled,
    &--enabled {
      width: .57rem;
    }

    &--disabled {
      color: #adadad;
      background-color: #f0f0f0;
    }
    &--finished {
      color: #333333;
      border: solid #00c1b3 1px;
    }
    &--get {
      color: #00c1b3;
      border: solid #00c1b3 1px;
    }
  }
}

.section2 .task:nth-child(1) {
  border-top: 1px solid #E5E5E5;
}



/***评论***/

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

.apply {
  margin-bottom: .1rem;
  text-align: right;
  margin-right: .15rem;
}

#right {
  margin-left: .15rem;
}

.self-p {
  color: rgb(176, 176, 176);
}

.section3 {
  background: #ffffff;
}

.section3 .container-lf:nth-last-child(3) {
  border-bottom: none;
}

.no {
  font-size: .13rem;
  color: #a5a5a5;
  text-align: center;
  background: #ffffff;
  padding: .11rem 0;
}

.have {
  border-top: 1px solid #E5E5E5;
}
</style>
<script>
import { InfiniteScroll, Spinner } from 'mint-ui';
import DialogComponentOne from "../../../../components/tao-you/dialog/one-button-simple-dialog.component.vue";
import DialogComponent from "../../../../components/tao-you/dialog/two-buttons-simple-dialog.component.vue";
import HeaderComponent from "../../../../components/tao-you/layout/header.component.vue";
import ShareComponent from '../../../../components/tao-you/share/share.component';
import MySwipe from '../../../../components/tao-you/horizontal-swiper/horizontal-swiper.component.vue';
import ReturnBtn from '../../../../components/tao-you/button/return.component.vue';

import 'swiper/dist/css/swiper.min.css';
import Swiper from 'swiper';
import AppButton from '../../../../components/tao-you/button/button.component';
import ProgressComponent from "../../../../components/tao-you/svg-progress/svg-progress.component.vue";
// 添加回到顶部
import BackTop from '../../../../components/tao-you/button/back-top.component';
import { startGame } from '../../../../components/tao-you/tools/tools';
Vue.component('my-spinner', Spinner);
export default {
  data() {
    return {
      title: '游戏详情',
      pd: {},
      mul: [null, 0, 0, 0],
      tabList: ['详情', '礼包', '评论'],
      type: 0,
      drCarouselData: [],
      moreGames: [],
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      allLoaded: false,
      btnMsg: "开始游戏",
      Packs: [],
      bearList: [],
      commonList: [],
      category: 2,
      //礼包条数
      gift: null,
      //任务条数
      bear: null,
      //评论条数
      com: null,
      // 弹框
      showDialog: false,
      dialogTitle: '',
      dialogContent: '',
      showContent: '',
      commentList: [],
      //提示按钮弹窗是否显示
      isShowOneDialog: false
    }
  },
  methods: {
    link(url) {
      this.$router.push(url);
    },
    check(index) {
      this.type = index;
      console.log(index);
    },
    //获取更多礼包，考虑无限加载，暂时只显示一页数据
    getMoreGames() {
      //if (this.allLoaded) {
      //return;
      //}
      //this.loading = true;
      let query = {
        //暂时只显示一页数据
        page: 1,
        limit: 5,
        id: this.$route.params.id,
        // 用户不登录也可以查看相关信息
        nologin: 1,
        similar: 1
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.game_detail)
        .then((res) => {
          //this.loading = false;
          if (res.code === 10000) {
            this.moreGames = res.result.similar;
            //this.moreGames = this.moreGames.concat(res.result.similar);
            //if( this.moreGames.length===0) {
            //无数据
            //return;
            //}
            //let length = res.result.length;
            //if (length > 0) {
            //this.pageIndex++;
            //}else{
            //this.allLoaded = true;
            //}
            //return;
          }
        });
    },
    //按钮执行的动作
    button() {
      console.log(this.pd.type);
      this.beginPlay();
    },
    /* 获取评论列表 */
    loadCommentList(id) {
      var query = {
        newsID: id,
        showType: 2,
        nologin: 1,
        fromType: 2 // 1：资讯(原创、转载、活动) 2：游戏
      }
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.news_comment_list).then((res) => {
        if (res.code === 10000) {
          this.commentList = res.result;
          this.com = res.count;
        }
      });
    },
    //获取游戏信息
    gameInfo() {
      let query = {
        id: this.$route.params.id,
        // 用户不登录也可以查看相关信息
        nologin: 1
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.game_detail)
        .then((res) => {
          if (res.code === 10000) {
            this.pd = res.result;
            if (this.pd.type === 1) {
              this.btnMsg = '开始游戏';
            } else {
              this.btnMsg = '下载游戏';
            }
            this.drCarouselData = res.result.imgUrl;
          }
        })
    },
    //获取这个游戏的礼包数据
    getIntroPacks() {
      let query = {
        gameID: this.$route.params.id,
        nologin: 1
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.gifts_list)
        .then((res) => {
          if (res.code === 10000) {
            this.Packs = res.result;
          } else {
            console.log('error');
          }
        })
    },
    //获取这个游戏的任务数据
    getBearList() {
      let query = {
        unionID: this.$route.params.id,
        type: 4,
        nologin: 1
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.task_list).then((res) => {
        if (res.code === 10000) {
          this.bearList = res.result;
        } else {
          console.log('error');
        }
      })
    },
    //进入游戏
    Intro(id) {
      console.log(id)
      this.$router.push({
        name: 'TaoYouGameCenterGameDetails',
        params: { id: id }
      })
    },
    //开始游戏
    open(type, gameID, gameUrl, gameName, direction) {
      startGame(this, {
        gameID: gameID,
        gameUrl: gameUrl,
        gameName: gameName,
        direction: direction,
        type: type
      });
    },
    //按钮执行的事件
    beginPlay() {
      // 跳转页面
      // window.location.href = this.pd.gameUrl;
      // 如果是手游，检查下是ios还是android
      // 若对应版本的游戏不存在，则弹框提示用户
      let item = this.pd;
      //let myGameUrl;
      if (+item.type === 2) {
        let downloadUrl = (/iphone|ipad/gi).test(navigator.appVersion) ? item.iosUrl : item.gameUrl;
        if (!downloadUrl || !downloadUrl.replace(/^\s+|\s+$/g, '')) {
          //提示不支持
          this.isShowOneDialog = true;
          return;
        }
        location.href = downloadUrl;
        return;
      }
      else if (+item.type === 1) {
        //如果是h5游戏直接跳转
        this.$router.push({
          name: 'TaoYouPlayMyGame',
          params: {
            id: this.$route.params.id
          },
          query: {
            d: this.pd.direction,
            gameUrl: this.pd.gameUrl,
            gameName: this.pd.gameName,
            from: 1
          },
          replace: true
        })
      }
      // 我们的小游戏,暂无
      else if (+item.type === 3) {
        location.href = this.pd.gameUrl;
      }
      else {
        //
      }
    },
    go(url) {
      console.log(url);
      if (url) {
        location.href = url;
      }
    },
    getTaskAward(tid, index) {
      if (!mallUtils.checkLoggedIn(this)) {
        return;
      }
      Vue.ClientHttp(this).POST({
        id: tid,
        type: 4
      }, Vue.ClientUrl.get_task_award)
        .then((res) => {
          if (10000 === res.code) {
            this.showContent = res.msg;
            this.showDialog = true;
            this.bearList[index].isComplete = 3;
          }
        });
    },
    left() {
      this.showDialog = false;
      this.$router.push({ name: 'TaoYouTasks' });
    },
    right() {
      this.showDialog = false;
      this.$router.push({ name: 'TaoYouWelfareShopWelfareMyTaodou' });
    }
  },
  components: {
    HeaderComponent,
    ShareComponent,
    MySwipe,
    InfiniteScroll,
    AppButton,
    ProgressComponent,
    ReturnBtn,
    BackTop,
    DialogComponent,
    DialogComponentOne
  },
  route: {
    data({ to: { params: { id } } }) {
      this.type = 0;
      this.newsID = id;
      this.loadCommentList(id);
      //再次调用更新数据
      this.getMoreGames();
      this.gameInfo();
      this.getIntroPacks();
      this.getBearList();
    }
  },
  computed: {
    gift() {
      return this.Packs ? this.Packs.length : 0;
    },
    bear() {
      return this.bearList ? this.bearList.length : 0;
    },
    mul() {
      return [10, this.gift, this.bear, this.com]
    }
  },
  mounted() {
    if (typeof this.$route.query.tabIndex != 'undefined') {
      this.type = this.$route.query.tabIndex;
    }
    this.getMoreGames();
    this.gameInfo();
    this.getIntroPacks();
    this.getBearList();

  },
  watch: {
    drCarouselData() {
      let mySwiper = new Swiper('.swiper-container__game-detail', {
        direction: 'horizontal',
        loop: false,
        slidesPerView: 1.8,
        spaceBetween: 10,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
    },
    type(newValue) {
      if ((0 === newValue) && (this.drCarouselData.length > 0)) {
        let mySwiper = new Swiper('.swiper-container__game-detail', {
          direction: 'horizontal',
          loop: false,
          slidesPerView: 1.8,
          spaceBetween: 10,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          observer: true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents: true //修改swiper的父元素时，自动初始化swiper
        });
      }
    }
  }
}
</script>
