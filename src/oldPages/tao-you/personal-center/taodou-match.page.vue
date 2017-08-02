<!-- author:zqy -->
<template>
  <div>
    <!--公共头部组件-->
    <app-header :title="title"></app-header>
    <div class="notice_top_banner_replace"></div>
    <div class="notice_top_banner">
      <div class="notice-area-container">
        <div class="notice-area">
          <scroll-notice :notices="notices" :time="1000"></scroll-notice>
        </div>
      </div>
      <div class="top_banner" v-if="loggedIn">
        <div>
          <span class="taodouname">我的淘豆:</span>
          <span class="taodouval">{{taodou | moneyWidthComma}}</span>
        </div>
        <i class="icon icon-what" @click="link({name: 'TaoYouTaoDouExplain'})"></i>
      </div>
    </div>
    <div class="task-container" v-show="showTask">
      <div class="header" @click="link({name: 'TaoYouTasks'})">
        <div class="header__title">任务得淘豆</div>
        <div class="header__text">
          <div calss="herder__link-text" v-if="user.day_taodou>0">还有
            <span style="color:red">{{user.day_taodou}}</span>淘豆未领取</div>
          <div calss="herder__link-text" v-else>今日任务已完成</div>
          <div class="icon icon-arrow-right"></div>
        </div>
      </div>
      <div class="task">
        <div class="task__left">
          <img class="task__img" :src="task.picPath" alt="">
          <div class="task__intro">
            <div class="task__name overflow-ellipsis">{{ task.title }}</div>
            <div class="task__type overflow-ellipsis-multiline">{{ task.content }}</div>
          </div>
        </div>
        <div class="task__right">
          <div class="task__info">
            <a class="task__btn task__btn--enabled" @click.stop="goForTask(task.url)" v-if="task.isComplete==1">去完成</a>
            <a class="task__btn task__btn--get" @click.stop="getTaskAward(task)" v-if="task.isComplete==2">领取</a>
            <!--未登陆 or 已完成任务未领奖励-->
            <a class="task__btn task__btn--disabled" v-if="task.isComplete==3">已领取</a>
            <!--<span class="task__award">奖励<span>1000</span>淘豆</span>-->
            <span class="task__award overflow-ellipsis">{{ task.reward }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="activity-container" v-show="showActivity">
      <div class="header" @click="link({name:'TaoYouActivityList'})">
        <div class="header__title">活动得淘豆</div>
        <div class="header__text">
          <div calss="herder__link-text">更多</div>
          <div class="icon icon-arrow-right"></div>
        </div>
      </div>
      <div class="item" @click="link({name: 'TaoYouNewsDetail',params: {id: activity.id}, query: {type: 1}})">
        <div class="content type1 am-flexbox">
          <div class="content__title overflow-ellipsis">{{ activity.title }}</div>
          <div class="content__picture am-flexbox">
            <img :src="activity.picPath" alt="">
          </div>
          <div class="content__info am-flexbox">
            <!--<span>活动时间：{{ activity.startTime }}-{{ activity.endTime }}</span>-->
            <span>活动时间：{{ activity.desc }}</span>
          </div>
        </div>
      </div>
    </div>
    <!--头部 -->

    <div class="header" @click="link({name:'TaoYouPersonalCenterGameRule'})">
      <div class="header__title">游戏得淘豆</div>
      <div class="header__text">
        <div class="icon icon-what"></div>
        <div calss="herder__link-text">参赛规则</div>
      </div>
    </div>
    <!--极速场-->
    <div class="am-list info">
      <div class="am-list-body">
        <div class="am-list-item oneline">
          <div class="am-list-content speed">极速场
            <span class="span1">
              <div class="span3">快节奏</div>
            </span>
          </div>
          <div v-if="+quickGamesStatus.status === 2" class="am-list-extra">
            <span class="icon-cut-down"></span> 成绩结算中....</div>
          <div v-if="+quickGamesStatus.status === 1" class="am-list-extra">
            <span class="icon-funnel"></span>
            <app-timer @timer-action="getNext" :endtime="quickGamesStatus.lastTime"></app-timer>
          </div>
        </div>
      </div>
    </div>
    <!--创建的开始-->
    <section class="bulid">
      <div class="wrapper JS-statistics-enter-game-space" v-for="(v,index) in quickGames" @click="link({name:'TaoYouOurGameIntro',params:{id:v.gid},query:{type:v.type}})" :key="index">
        <div class="container">
          <div class="container--lf">
            <div class="container--lf--img">
              <img class="taodou-game-image" :src="v.gameIcon">
            </div>
          </div>
          <div class="container--rh">

            <div class="container--rh--top">
              <p class="am-wingblank wb15px self-p">
                <span class="am-ft-ellipsis self--p--top">{{v.gameName}}</span>
                <span class="self--p--bottom">{{v.gameTermId}}期</span>
              </p>
            </div>
            <div class="container--rh--bottom">
              <div class="am-wingblank wb15px bottom">
                <div class="bottom-lf">
                  <div class="yan">简介:{{v.gameInfo}}</div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="bottom-rh">
          <a v-show="(v.userStatus === 1) && (quickGamesStatus.status === 1)" @click.stop="gotoUrl(v.gameUrl + '&type=2',v.gid)" class="bottom-rh-a">继续</a>
          <a v-show="(v.userStatus === 0) && (quickGamesStatus.status === 1)" @click.stop="gotoUrl(v.gameUrl + '&type=2',v.gid)" class="bottom-rh-a bottom-rh-b JS-statistics-enter-game-jion">参赛</a>
          <a v-show="quickGamesStatus.status === 0" href="javascript:void(0)" disabled="disabled" class="am-button disabled bottom-rh-c">结算中</a>
        </div>
        <!--中间分割-->
        <div v-show="v.currentRank !== null" class="bulid-center" @click="link({name: 'TaoYouPersonalCenterGameRanking', params: {id: v.pid}})">
          <span v-show="+v.currentRank !== 0" class="rank">当前排名
            <i class="am-ft-red">{{v.currentRank}}</i>名</span>
          <span v-show="+v.currentRank === 0" class="rank">当前排名 未上榜</span>
          <span>预计奖励:{{v.userGet}}淘豆</span>
          <i class="icon icon-arrow-right"></i>
        </div>
        <!--排名列表-->
        <div v-if="!v.players || !v.players.length" class="build-bottom  am-ft-center">暂无排名，快来参加得第一赢海量淘豆</div>
      </div>
    </section>

    <!--普通场-->
    <div class="am-list info" id="am-list">
      <div class="am-list-body">
        <div class="am-list-item oneline">
          <div class="am-list-content speed">普通场
            <span class="span2">
              <div class="span4">高奖励</div>
            </span>
          </div>
          <div v-if="+normalGamesStatus.status === 2" class="am-list-extra">
            <span class="icon-cut-down"></span> 成绩结算中....</div>
          <div v-if="+normalGamesStatus.status === 1" class="am-list-extra">
            <span class="icon-funnel"></span>
            <app-timer @timer-action="getNext" :endtime="normalGamesStatus.lastTime"></app-timer>
          </div>
        </div>
      </div>
    </div>
    <!--数据开始创建-->
    <section class="bulid">
      <div class="wrapper JS-statistics-enter-game-button-space" v-for="(v,index) in normalGames" @click="link({name:'TaoYouOurGameIntro',params:{id:v.gid},query:{type:v.type}})" :key="index">
        <div class="container">
          <div class="container--lf">
            <div class="container--lf--img">
              <img class="taodou-game-image" :src="v.gameIcon">
            </div>
          </div>
          <div class="container--rh">
            <div class="container--rh--top">
              <p class="am-wingblank wb15px self-p">
                <span class="am-ft-ellipsis self--p--top">{{v.gameName}}</span>
                <span class="self--p--bottom">{{v.gameTermId}}期</span>
              </p>
            </div>
            <div class="container--rh--bottom">
              <div class="am-wingblank wb15px bottom">
                <div class="bottom-lf">
                  <div class="am-ft-md yan">简介:{{v.gameInfo}}</div>
                </div>
                <div class="bottom-rh">
                  <a v-show="(v.userStatus === 1) && (normalGamesStatus.status === 1)" @click.stop="gotoUrl(v.gameUrl + '&type=1',v.gid)" class="bottom-rh-a">继续</a>
                  <a v-show="(v.userStatus === 0) && (normalGamesStatus.status === 1)" @click.stop="gotoUrl(v.gameUrl + '&type=1',v.gid)" class="bottom-rh-a bottom-rh-b JS-statistics-enter-game-button">参赛</a>
                  <a v-show="normalGamesStatus.status === 0" href="javascript:void(0)" disabled="disabled" class="am-button disabled bottom-rh-c">结算中</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--中间分割-->
        <div v-show="v.currentRank !== null" class="bulid-center" @click="link({name: 'TaoYouPersonalCenterGameRanking', params: {id: v.pid}})">
          <span v-show="+v.currentRank !== 0" class="rank">当前排名
            <i class="am-ft-red">{{v.currentRank}}</i>名</span>
          <span v-show="+v.currentRank === 0" class="rank">当前排名 未上榜</span>
          <span class="am-ft-sm">预计奖励:{{v.userGet}}淘豆</span>
          <i class="icon icon-arrow-right"></i>
        </div>
        <!--排名列表-->

        <div v-if="!v.players || !v.players.length" class="build-bottom  am-ft-center">暂无排名，快来参加得第一赢海量淘豆</div>
      </div>
    </section>
    <dialog-component :show="showDialog" content="兑换成功" :has-slot="true" left-btn-text="全部任务" right-btn-text="立即查看" @two-btns-dialog-component-left="left" @two-btns-dialog-component-right="right">
      <div class="dialog-content" slot>
        <span class="dialog-title">任务完成</span>
        <!--<br> <span>奖励<span class="count">10000</span>淘豆</span>-->
        <span>{{ task.reward }}</span>
      </div>
    </dialog-component>
    <return-btn></return-btn>

    <!-- 返回顶部 -->
    <back-top></back-top>
  </div>
</template>

<script>
import Vue from 'vue';
import $ from 'jquery';
import { mapActions, mapGetters } from 'vuex';
import AppHeader from '../../../oldComponents/tao-you/layout/header.component';
import AppTimer from '../../../oldComponents/tao-you/timer/match-timer.component';
import ReturnBtn from '../../../oldComponents/tao-you/button/return.component';
import ScrollNotice from '../../../oldComponents/tao-you/notice/game-center-scroll-notice.component';
import DialogComponent from '../../../oldComponents/tao-you/dialog/two-buttons-simple-dialog.component';
// 统计代码
import Statistics from '../statistics/game-more/index.statistics';
// 添加回到顶部
import BackTop from '../../../oldComponents/tao-you/button/back-top.component';
// import { user } from '../../../vuex/getters';
// import { getUserInfo } from '../../../vuex/actions';

export default {
  // vuex: {
  //   getters: {
  //     user,
  //   },
  //   actions: {
  //     getUserInfo,
  //   },
  // },
  data() {
    return {
      // 推广的游戏
      ad: {},
      // 淘豆的数量
      taodou: 0,
      task: {},
      activity: {},
      quickGamesStatus: {},
      normalGamesStatus: {},
      normalGames: [],
      quickGames: [],
      title: '福利',
      notices: [],
      // 弹框
      showDialog: false,
      dialogTitle: '',
      dialogContent: '',
    };
  },
  computed: {
    ...mapGetters(['user']),
    loggedIn() {
      return mallUtils.checkLoggedIn();
    },
    showTask() {
      return !$.isEmptyObject(this.task);
    },
    showActivity() {
      return !$.isEmptyObject(this.activity);
    },
  },
  components: {
    ReturnBtn,
    AppHeader,
    AppTimer,
    ScrollNotice,
    DialogComponent,
    BackTop,
  },
  methods: {
    ...mapActions(['getUserInfo']),
    link(url) {
      this.$router.push(url);
    },
    getTaskAward(item) {
      if (!mallUtils.checkLoggedIn(this)) {
        return;
      }
      Vue.ClientHttp(this).POST({
        id: item.id,
      }, Vue.ClientUrl.get_task_award)
        .then((res) => {
          if (res.code === 10000) {
            item.isComplete = 3;
            this.showDialog = true;
          }
        });
    },
    getHotTask() {
      Vue.ClientHttp(this).GET({
        page: 1,
        limit: 1,
        type: 2,
        nologin: 1,
      }, Vue.ClientUrl.task_list)
        .then((res) => {
          if (res.code === 10000) {
            if (res.result && res.result[0]) {
              this.task = res.result[0];
            }
          }
        });
    },
    getHotActivity() {
      Vue.ClientHttp(this).GET({
        fromType: 3,
        page: 1,
        limit: 1,
        nologin: 1,
      }, Vue.ClientUrl.activity_list)
        .then((res) => {
          if (res.code === 10000) {
            if (res.result && res.result[0]) {
              this.activity = res.result[0];
              console.log(JSON.stringify(this.activity) != '{}');
            }
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
    },
    getNext() {
      this.getGames();
    },
    // 获取广告
    getAd() {
      Vue.ClientHttp(this).GET({
        type: 5,
        nologin: 1,
      }, Vue.ClientUrl.game_center_banner)
        .then((res) => {
          if (res.code === 10000) {
            this.ad = res.result[0];
          }
        });
    },
    getNotices() {
      let _this = this;
      return Vue.ClientHttp(this).GET({
        nologin: 1,
      }, Vue.ClientUrl.game_center_scroll_msg)
        .then((res) => {
          if (res.code !== 10000) {
            return;
          }
          if (res.result && res.result.length) {
            _this.notices = res.result;
          }
        });
    },
    // 获取比赛
    getGames() {
      Vue.ClientHttp().GET({ nologin: 1 }, Vue.ClientUrl.my_taodou_match)
        .then((res) => {
          if (res.code === 10000) {
            this.taodou = res.result.taodou;
            this.quickGamesStatus = res.result.quickGamesStatus;
            this.normalGamesStatus = res.result.normalGamesStatus;
            this.normalGames = res.result.normalGames;
            this.quickGames = res.result.quickGames;
            // 如果状态值是2 继续请求
            if (this.quickGamesStatus.status === 2) {
              let sec = this.quickGamesStatus.lastTime;
              const timer = setInterval(() => {
                sec--;
                if (sec == 0) {
                  clearInterval(timer);
                  this.getNext();
                }
              }, 1000);
            }
            // 如果状态值是2 继续请求
            if (this.normalGamesStatus.status === 2) {
              let sec = this.normalGamesStatus.lastTime;
              const timer = setInterval(() => {
                sec--;
                if (sec == 0) {
                  clearInterval(timer);
                  this.getNext();
                }
              }, 1000);
            }
          }
        });
    },
    gotoUrl(url, gid) {
      if (!mallUtils.checkLoggedIn(this)) {
        return;
      }
      if (typeof gid !== 'undefined') {
        Vue.ClientHttp(this).GET({
          type: 0,
          gid,
        }, Vue.ClientUrl.sendGameStatistics)
          .then((res) => {
            if (res.code === 10000) {
              // TODO
              location.href = url;
            }
          });
      } else {
        location.href = url;
      }
    },
    goForTask(url) {
      url = url.replace('http://1.lly800.com/#', '').replace('http://pre.lly800.com/#', '');
      if (url.startsWith('http')) {
        location.href = url;
        return;
      }
      if (!url.startsWith('/')) {
        url = `/${url}`;
      }
      this.$router.push(url);
    },
  },
  mounted() {
    $('body').css('background-color', '#f5f5f9');
    this.getUserInfo();
    this.getNotices();
    this.getAd();
    this.getHotTask();
    this.getHotActivity();
    this.getGames();
    localStorage.setItem('originUrl', location.href);
    Statistics(this);
  },
};
</script>

<style lang="scss" scoped>
/* 引入公共的样式 */

@import '../../../assets/tao-you/common.scss';
.notice_top_banner_replace {
  height: .86rem;
  margin-bottom: .15rem;
}

.notice_top_banner {
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 640px;
  z-index: 100;
  border-bottom: 1px solid #e5e5e5;
}

.notice-area-container {
  border-bottom: solid #e5e5e5 1px;
  background-color: #fff;
}

.notice-area {
  margin-left: .15rem;
  padding-right: .15rem;
}

.top_banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 .15rem;
  overflow: hidden;
  background-color: $white;
  height: .44rem;
  line-height: .44rem;
  .taodouval {
    color: #ff4a4a;
  }
  i {
    font-size: .2rem;
    color: #ccc;
  }
}

.task-container {
  margin-bottom: .15rem;
}

.task {
  height: 0.765rem;
  background-color: #fff;
  display: flex;
  padding-left: .15rem;
  padding-right: .15rem;
  border-top: 1px solid #e5e5e5;
  &__left {
    display: flex;
    flex: 1;
  }
  &__right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    width: 1rem;
    font-size: .12rem;
  }
  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
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
    line-height: 1em;
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
    color: #a5a5a5;
    width: 100%;
    text-align: right;
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
    border: solid #a5a5a5 1px;
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
      color: #00c1b3;
      border: solid #00c1b3 1px;
    }
    &--get {
      color: #00c1b3;
      border: solid #00c1b3 1px;
    }
  }
}

.activity-container {
  margin-bottom: .15rem;

  .item {
    padding: 0 .15rem;
    border-top: 1px solid #e5e5e5;
    background-color: #fff;
  }
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
    color: #a5a5a5;
    &__source {
      max-width: 1rem;
      margin-right: .095rem;
    }
  }
}

.type1.content {
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  .content__title {
    width: 100%;
    margin-bottom: .14rem;
  }
}

.bulid {
  background-color: #fff;

  .wrapper:last-child {
    border-bottom: none;
  }
}

.top {
  background-color: $white;
  height: 1.04rem;
  border-bottom: 1px solid $primary-border;
  border-top: 1px solid $primary-border;
  .top--con {
    height: 1.04rem;
    .top--top {
      height: .54rem;
      line-height: .585rem;
      font-size: $font-size-xl;
      span {
        color: #ff4a4a;
      }
    }
    .top--bottom {
      height: .50rem;
      display: flex;
      justify-content: center;
      a {
        background: #01c1b4;
        display: inline-block;
        width: .9rem;
        height: .3rem;
        text-align: center;
        line-height: .3rem;
        border-radius: .05rem;
        color: $white;
        margin: 0 .18rem;
      }
    }
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: .43rem;
  line-height: .43rem;
  border: none;
  padding-left: .15rem;
  padding-right: .15rem;
  background-color: #fff;
  &__title {
    font-size: .16rem;
    /*px*/
    color: #333;
    text-align: left;
  }
  &__text {
    display: flex;
    align-items: center;
    margin-right: -.02rem;
    /*px*/
    color: #a5a5a5;
    div {
      height: .13rem;
      line-height: .13rem;
      font-size: .13rem;
    }
    .icon {
      display: flex;
      align-items: center;
      font-size: .13rem;
      color: #ccc;
    }
    .icon-what {
      margin-right: .025rem;
      &:before {
        font-family: icons!important;
        content: '\1F33E';
      }
    }
    .icon-arrow-right {
      margin-left: .025rem;
    }
  }
}

.am-list.info {
  margin-top: 0;
  padding-top: .02rem;
  padding-bottom: .02rem;
  background-color: #fff!important;
}

.wrapper {
  margin-left: .15rem;
  padding-right: .15rem;
  padding-top: .065rem;
  padding-bottom: .105rem;
  border-bottom: solid #e5e5e5 1px;
  position: relative;
}

.am-list.info:not([am-version]) .am-list-item {
  padding-top: 0;
  padding-bottom: 0;
}

.speed {
  color: #666;
  font-size: .16rem!important;
  display: inline-flex;
  align-items: center;
  .span1 {
    display: inline-block;
    width: .48rem;
    height: .27rem;
  }
  .span3 {
    width: .44rem;
    height: .18rem;
    border: 1px solid #00c1b3;
    position: relative;
    background-color: #eafffd;
    text-align: center;
    line-height: .18rem;
    border-radius: .02rem;
    top: .035rem;
    left: .05rem;
    color: #00c1b3;
    font-size: .12rem;
  }

  .span3:before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    right: .45rem;
    top: .05rem;
    border-width: 4px;
    border-style: solid;
    border-color: transparent #00c1b3 transparent transparent;
  }

  .span3:after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    right: .44rem;
    top: .05rem;
    border-width: 4px;
    border-style: solid;
    border-color: transparent #eafffd transparent transparent;
  }
  .span2 {
    display: inline-block;
    width: .48rem;
    height: .27rem;
  }
  .span4 {
    width: .44rem;
    height: .18rem;
    border: 1px solid #ff4a4a;
    position: relative;
    background-color: #fff5f5;
    text-align: center;
    line-height: .18rem;
    border-radius: .02rem;
    top: .035rem;
    left: .05rem;
    color: #ff4a4a;
    font-size: .12rem;
  }

  .span4:before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    right: .45rem;
    top: .05rem;
    border-width: 4px;
    border-style: solid;
    border-color: transparent #ff4a4a transparent transparent;
  }

  .span4:after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    right: .44rem;
    top: .05rem;
    border-width: 4px;
    border-style: solid;
    border-color: transparent #fff5f5 transparent transparent;
  }
}

.am-list {
  border-bottom: 1px solid $primary-border;
  border-top: 1px solid $primary-border;
  padding-bottom: 0;
  padding-top: 0;
  margin-top: .15rem;
}





/**创建的开始**/

.container {
  /*height: .70rem;*/
  display: flex;
  .container--lf {
    height: 100%;
    float: left;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    .container--lf--img {
      width: .43rem;
      height: .43rem;
      border-radius: .05rem;
      img {
        width: .43rem;
        height: .43rem;
        border-radius: .06rem;
      }
    }
  }
  .container--rh {
    display: inline-flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    float: left;
    .container--rh--top {
      /*height: 30%;*/
      /*margin-top: .12rem;*/
    }
    .container--rh--bottom {
      /*height: 70%;*/
      p {
        height: 100%;
        background-color: #00aaee;
      }
    }
  }
}

.self-p {
  width: 100%;
  margin-right: 0;
  display: inline-flex;
  align-items: center;
  .self--p--top {
    display: inline-block;
    font-size: $font-size-lg;
  }
  .self--p--bottom {
    display: inline-block;
    width: 47%;
    font-size: $font-size-sm;
    margin-left: .1rem;
    color: #333333;
  }
}

.bottom {
  height: 100%;
  margin-right: 0;
  .bottom-lf {
    width: 70%;
    height: 100%;
    float: left;
    display: flex;
    justify-content: center;
    flex-flow: column nowrap;
    .yan {
      color: #a5a5a5;
      font-size: $font-size-md;
    }
  }
}

.bottom-rh {
  position: absolute;
  top: .1rem;
  right: .15rem;
  width: 30%;
  height: 100%;
  float: left;
  .bottom-rh-a {
    display: block; // width: .57rem;
    // font-size: $font-size-md;
    // height: .24rem;
    // line-height: .24rem;
    text-align: center; // border-radius: .05rem;
    margin-top: .1rem; // color: #333333;
    // border: 1px solid #cccccc;
    float: right;

    padding: .02rem .09rem;
    color: #333;
    font-size: 0.13rem;
    text-align: center;
    border: solid #ccc 1px;
    border-radius: .04rem;
  }
  .bottom-rh-c {
    display: block;
    width: .57rem;
    font-size: $font-size-md;
    height: .24rem;
    line-height: .24rem;
    text-align: center;
    border-radius: .05rem;
    margin-top: .1rem;
    border: 1px solid #cccccc;
    float: right;
  }
  .bottom-rh-b {
    /*background-color: #ff4a4a;*/
    border: 1px solid #cccccc;
  }
}





/**中间分割**/

.bulid-center {
  height: .23rem;
  background-color: #e5f9f7;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: .105rem;
  font-size: .12rem;
  .rank {
    margin-right: .05rem;
  }
  span {
    color: #666;
  }
  i {
    font-size: .1rem;
    color: #666;
  }
}

.bulid-rank {
  /*margin-bottom: .1rem;*/
}

.build-bottom {
  margin-top: .07rem;
  font-size: .11rem;
  color: #666;
}





/**排名表格**/

.mytable {
  width: 100%;
  margin-top: .08rem;
}

.list {
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  td {
    font-size: $font-size-sm;
    color: #898989;
    height: .23rem;
    line-height: .3rem;
    overflow: hidden;
  }
}

.list td:nth-child(1) {
  width: 14%;
}

.list td:nth-child(2) {
  width: 14%;
}

.list td:nth-child(3) {
  text-align: right;
  width: 19%;
}

.list td:nth-child(4) {
  width: 24%;
}

.list td:nth-child(5) {
  text-align: right;
  width: 19%;
}





/**类banner图**/

.banner {
  height: .72rem;
  background-color: $white;
  margin: .15rem 0;
  img {
    width: 100%;
    height: 100%;
  }
}

.am-list-body {
  background-color: #ffffff;
}

.am-list-extra {
  font-size: .13rem !important;
}

.rule {
  position: absolute;
  border: 1px solid $primary-border;
  right: .15rem;
  top: .17rem;
  font-size: .13rem;
  padding: .02rem .05rem;
  border-radius: .04rem;
}

.dialog-title {
  color: #333;
  font-size: .16rem;
}

.dialog-content {
  color: #333;
  font-size: .14rem;
  text-align: center;

  .count {
    color: #ff4a4a;
  }
}
</style>
