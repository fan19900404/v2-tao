<template>
  <div>
    <header-component :title="title"></header-component>
    <div class="main_content">
      <div class="top_slide">
        <h5 class="recommend_tit">每日推荐</h5>
        <div class="swiper-container">
          <div class="swiper-wrapper JS-statistics-swipe-wrapper">
            <div v-for="(item,index) in swiperList" class="swiper-slide JS-statistics-swipe" :key="index">
              <a @click="linkToTarget(item.url)" class="JS-statistics-swipe-link">
                <img class="swiper-slide__img" :src="item.imgUrl" alt="">
              </a>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="fix-swipe-space"></div>
      </div>

      <div class="side_title">
        <span>H5游戏TOP5</span>
      </div>
      <div class="top5_list">
        <div v-for="(h5Item,index) in h5TopList" class="top5_item JS-statistics-h5-game" @click="link({name:'GameIntro',params:{id:h5Item.gameID}})" :key="index">
          <div v-if="index<3" class="ranking_count">
            <img v-if="index==0" src="/static/images/game-center/badge-gold.png">
            <img v-if="index==1" src="/static/images/game-center/badge-silvery.png">
            <img v-if="index==2" src="/static/images/game-center/badge-bronze.png">
          </div>
          <div v-if="index>2" class="ranking_count_other">{{index+1}}</div>
          <img class="game_logo" :src="h5Item.imgUrl">
          <span class="side_name overflow-ellipsis">{{h5Item.gameName}}</span>
          <p class="side_type overflow-ellipsis">类型:{{h5Item.type}}</p>
          <p class="side_remark overflow-ellipsis">{{h5Item.intro | substr(12)}}</p>
          <a class="able_btn JS-statistics-h5-game-play" @click="link({name:'TaoYouPlayMyGame',params:{id:h5Item.gameID},query: {gameUrl:h5Item.downloadUrl,gameName:h5Item.gameName}})">进入</a>
        </div>
      </div>
      <a :href="adObj[0].url" class="ad_style JS-statistics-ad">
        <img :src="adObj[0].imgUrl">
      </a>
      <div class="side_title">
        <span>手机热门游戏TOP5</span>
      </div>
      <div class="top5_list">
        <div v-for="(mobileItem,index) in mobileTopList" class="top5_item JS-statistics-mobile-game" @click="link({name:'GameIntro',params:{id:mobileItem.gameID}})" :key="index">
          <div v-if="index<3" class="ranking_count">
            <img v-if="index==0" src="/static/images/game-center/badge-gold.png">
            <img v-if="index==1" src="/static/images/game-center/badge-silvery.png">
            <img v-if="index==2" src="/static/images/game-center/badge-bronze.png">
          </div>
          <div v-if="index>2" class="ranking_count_other">{{index+1}}</div>
          <img class="game_logo" :src="mobileItem.imgUrl">
          <span class="side_name overflow-ellipsis">{{mobileItem.gameName}}</span>
          <p class="side_type overflow-ellipsis">类型:{{mobileItem.type}}</p>
          <p class="side_remark overflow-ellipsis">{{mobileItem.intro | substr(12)}}</p>
          <a class="able_btn JS-statistics-mobile-game-play">进入</a>
        </div>
      </div>
      <a :href="adObj[1].url" class="ad_style JS-statistics-ad">
        <img :src="adObj[1].imgUrl">
      </a>
      <div class="side_title">
        <span>所有游戏</span>
      </div>
      <ul class="top5_list" v-infinite-scroll="loadMore" infinite-scroll-distance="1" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false">
        <li v-for="(item,index) in allGameList" class="top5_item JS-statistics-all-game" @click="link({name:'GameIntro',params:{id:item.gameID}})" :key="index">
          <div class="ranking_count_other">{{index+1}}</div>
          <img class="game_logo" :src="item.imgUrl">
          <span class="side_name overflow-ellipsis">{{item.gameName}}</span>
          <p class="side_type overflow-ellipsis">类型:{{item.type}}</p>
          <p class="side_remark overflow-ellipsis">{{item.intro | substr(12)}}</p>
          <a class="able_btn JS-statistics-all-game-play">进入</a>
        </li>
      </ul>
      <p v-show="loading && !listDone" class="page-infinite-loading">
        <my-spinner type="fading-circle"></my-spinner>加载中
      </p>
    </div>
    <dialog-component :show="showDialog" content="兑换成功" left-btn-text="返回" right-btn-text="再来一局" :has-slot="true">
      <div style="color: #aaaaaa;font-size: .14rem;text-align: left;width: 1.31rem;margin: 0 auto" slot>
        <p style="color: #666666;text-align: center">获奖成绩</p>
        <p style="font-size: .16rem;line-height: 2.5;text-align: center;">名字</p>
        <p>该局分数：0</p>
        <p>该局排名：0</p>
        <p>最高排名：0</p>
        <p>预计奖励：暂无奖励</p>
      </div>
    </dialog-component>
    <dialog-component-one :show="showDialogOne" :has-slot="true" btn-text="完善信息领取奖励">
      <div style="color: #aaaaaa;font-size: .14rem;text-align: left;width: 1.31rem;margin: 0 auto" slot>
        <p style="color: #666666;text-align: center">获奖成绩</p>
        <p style="font-size: .16rem;line-height: 2.5;text-align: center;">名字</p>
        <p>该局分数：0</p>
        <p>该局排名：0</p>
        <p>最高排名：0</p>
        <p>预计奖励：暂无奖励</p>
      </div>
    </dialog-component-one>
    <dialog-component-tip :show="showDialogTip" :content="tipConent" btn-text="知道了">
    </dialog-component-tip>
    <footer-component :menu-id="1"></footer-component>
  </div>
</template>
<style lang="scss" scoped>
@import "../../../assets/tao-you/common.scss";

.swiper-container {
  /*height: 1.4rem;*/
  margin-left: .15rem;
  margin-right: .15rem;
}

.top_slide {
  background-color: #FFFFFF;
  overflow: hidden;
  border-bottom: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
  margin-bottom: .17rem;
}

.recommend_tit {
  color: $dark;
  font-size: $font-size-lg;
  line-height: 1;
  margin: .14rem .15rem;
  font-weight: 400;
}

.swipe {
  margin: 0 .15rem;
  height: 1.2rem;
}

.msg_wrapper {
  margin: 0 .15rem;
  height: .36rem;
  overflow: hidden;
  position: relative;
}

.icon-notice {
  font-size: $font-size-xl;
  color: #666666;
  line-height: .36rem;
}

.msg_list_wrapper {
  position: absolute;
  height: 100%;
  right: 0;
  left: .2rem;
  top: 0;
}

.msg_list_wrapper li {
  line-height: .36rem;
  font-size: $font-size-sm;
  color: $words;
  height: .36rem;
}

.side_title {
  overflow: hidden;
  background-color: #FFFFFF;
  border-bottom: 1px solid $primary-border;
  border-top: 1px solid $primary-border;
  height: .43rem;
}

.side_title span {
  float: left;
  line-height: .43rem;
  color: $dark;
  font-size: $font-size-lg;
  margin-left: .15rem;
}

.side_title a {
  float: right;
  margin-right: .32rem;
  color: #a5a5a5;
  font-size: $font-size-sm;
  line-height: .43rem;
  position: relative;
}

.side_title a:after {
  position: absolute;
  font-family: icons;
  content: '\e90a';
  left: .7rem;
}

.athletics {
  background-color: #FFFFFF;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: .17rem;
}

.side_head:first-of-type {
  border-top: 0;
}

.side_head {
  margin-left: .15rem;
  height: .44rem;
  border-top: 1px solid $primary-border;
}

.side_head_name {
  color: $dark;
  font-size: $font-size-lg;
  line-height: .44rem;
}

.side_head_remark {
  -webkit-text-size-adjust: none;
  position: absolute;
  display: inline-block;
  height: .42rem;
  width: .50rem;
}

.top {
  width: .44rem;
  height: .18rem;
  border: 1px solid #00c1b3;
  position: relative;
  background-color: #eafffd;
  text-align: center;
  line-height: .18rem;
  border-radius: .02rem;
  top: .11rem;
  left: .05rem;
  color: #00c1b3;
  font-size: .12rem;
}

.top:before {
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

.top:after {
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

.side_head_height {
  -webkit-text-size-adjust: none;
  position: absolute;
  display: inline-block;
  height: .42rem;
  width: .50rem;
}

.bottom {
  width: .44rem;
  height: .18rem;
  border: 1px solid #ff4a4a;
  position: relative;
  background-color: #fff5f5;
  text-align: center;
  line-height: .18rem;
  border-radius: .02rem;
  top: .11rem;
  left: .05rem;
  color: #ff4a4a;
  font-size: .12rem;
}

.bottom:before {
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

.bottom:after {
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

.side_head_grade {
  float: right;
  color: $hint;
  font-size: $font-size-sm;
  margin-right: .14rem;
  line-height: .44rem;
  position: relative;
}

.side_head_grade:before {
  position: absolute;
  left: -.2rem;
  font-family: icons;
  content: '\e90b';
}

.side_item {
  position: relative;
  min-height: .8rem;
  overflow: hidden;
}

.side_item .game_logo {
  width: .43rem;
  height: .43rem;
  margin: .11rem .15rem;
  border-radius: .06rem;
}

.side_item .side_name {
  font-size: $font-size-lg;
  color: $dark;
  position: absolute;
  top: .08rem;
  left: .73rem;
  right: .6rem;
}

.side_item .side_period {
  font-size: $font-size-sm;
  color: $dark;
  margin-left: .1rem;
}

.red {
  color: #ff4a4a;
}

.side_item .side_top_price {
  font-size: $font-size-md;
  color: $information;
  position: absolute;
  top: .31rem;
  left: .73rem;
}

.side_item .side_join {
  color: $information;
  font-size: $font-size-md;
  position: absolute;
  top: .5rem;
  left: .73rem;
}

.side_item .able_btn {
  position: absolute;
  right: .15rem;
  top: .4rem;
  padding: 0 .09rem;
  color: #333;
  font-size: .13rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: .04rem;
  height: .23rem;
  line-height: .23rem;
}

.side_item .able_btn.account {
  border: 1px solid $stress-border;
}

.side_item .able_btn.continue {
  border: 1px solid $stress-border;
}

.side_item .able_btn.join {
  border: 1px solid $stress-border;
}

.ranking {
  margin: .08rem .15rem;
  background-color: #f2fbfe;
  color: $words;
  font-size: .11rem;
  padding: 0 .42rem;
  overflow: hidden;
  line-height: .23rem;
}

.ranking_left {
  float: left;
}

.ranking_right {
  float: right;
}

.top5_list {
  background-color: #FFFFFF;
  overflow: hidden;
  border-bottom: 1px solid $primary-border;
}

.top5_item {
  position: relative;
  min-height: .8rem;
  overflow: hidden;
  border-bottom: 1px solid $primary-border;
  margin-left: .15rem;
}

.top5_item:last-of-type {
  border-bottom: 0;
}

.top5_item .game_logo {
  width: .43rem;
  height: .43rem;
  margin: .11rem .15rem .11rem .32rem;
  border-radius: .06rem;
}

.top5_item .side_name {
  font-size: $font-size-lg;
  color: $dark;
  position: absolute;
  top: .08rem;
  left: .9rem;
  right: .6rem;
}

.top5_item .side_type {
  font-size: $font-size-md;
  color: $information;
  position: absolute;
  top: .31rem;
  left: .9rem;
  right: .6rem;
}

.top5_item .side_remark {
  color: $information;
  font-size: $font-size-md;
  position: absolute;
  top: .5rem;
  left: .9rem;
  height: .18rem;
  overflow: hidden;
  right: 0;
}

.top5_item .able_btn {
  position: absolute;
  right: .15rem;
  top: .2rem;
  padding: 0 .09rem;
  color: #333;
  font-size: .13rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: .04rem;
  height: .23rem;
  line-height: .23rem;
}

.top5_item .ranking_count {
  width: .21rem;
  position: absolute;
  top: .16rem;
}

.top5_item .ranking_count img {
  width: 100%;
}

.top5_item .ranking_count_other {
  position: absolute;
  background-color: #dfdfdf;
  width: .21rem;
  height: .21rem;
  font-size: .1rem;
  -webkit-text-size-adjust: none;
  color: #898989;
  border-radius: 50%;
  text-align: center;
  line-height: .21rem;
  top: .22rem;
}

.ad_style {
  width: 100%;
  margin: .14rem 0;
  display: block;
  max-height: .9rem;
  overflow: hidden
}

.ad_style img {
  width: 100%;
  display: block;
  max-height: 100%;
}

.game-center-noticce {
  padding: 0 .15rem;
}

.fix-swipe-space {
  height: .15rem;
  background-color: #ffffff;
}
</style>
<script>
import HeaderComponent from "../../../oldComponents/tao-you/layout/header.component.vue";
import FooterComponent from "../../../oldComponents/tao-you/layout/footer.component.vue";
import GameCenterScrollNotice from "../../../oldComponents/tao-you/notice/game-center-scroll-notice.component.vue";
import DialogComponent from "../../../oldComponents/tao-you/dialog/two-buttons-simple-dialog.component.vue"
import DialogComponentOne from "../../../oldComponents/tao-you/dialog/one-button-simple-dialog.component.vue"
import DialogComponentTip from "../../../oldComponents/tao-you/dialog/one-button-simple-dialog.component.vue"
import { Swipe, SwipeItem, InfiniteScroll, Spinner } from 'mint-ui';
// 统计使用
import Statistics from '../statistics/game-center/index.statistics';
import CdComponent from "../../../oldComponents/common-cd/gamecenter-cd.vue";
import Swiper from 'swiper';

Vue.component('my-spinner', Spinner);

export default {
  data() {
    return {
      loading: false,
      showDialog: false,
      showDialogOne: false,
      title: '游戏中心',
      swiperList: [],
      adObj: [],
      recommendGameListCommon: [],
      recommendGameListQuick: [],
      notices: [],
      h5TopList: [],
      mobileTopList: [],
      allGameList: [],
      allPageIndex: 1,
      showDialogTip: false,
      tipConent: '您的手机暂时不支持此版本游戏下载',
      carouselImgHeight: 0,
      listDone: false
    }
  },
  computed: {
    carouselStyle() {
      return {
        height: this.carouselImgHeight + 'px'
      }
    }
  },
  methods: {
    link(url) {
      this.$router.push(url);
    },
    // 处理轮播图的链接问题
    linkToTarget(url) {
      // 判断是否含有http(s)
      if (/^http(s*)/.test(url)) {
        window.location.href = url;
      }
      else {
        this.$router.push(url);
      }
    },
    // fix image layout
    fixImageLayout(e, index) {
      if (0 === index) {
        var carouselWidth = $('.swipe-items-wrap').width();
        var rate = e.target.naturalHeight / e.target.naturalWidth;
        var realHeight = carouselWidth * rate;
        this.carouselImgHeight = realHeight;
      }
    },
    getSwiperList: function () {
      var _this = this;
      return Vue.ClientHttp(this).GET({ type: 3 }, Vue.ClientUrl.game_center_banner)
        .then((res) => {
          if (10000 !== res.code) {
            return;
          }
          _this.swiperList = res.result
          setTimeout(() => {
            new Swiper('.swiper-container', {
              direction: 'horizontal',
              loop: true,
              pagination: '.swiper-pagination',
              autoplay: 3500,
              autoplayDisableOnInteraction: false
            });
          }, 100);
        })
    },
    getNotices() {
      var _this = this
      return Vue.ClientHttp(this).GET({}, Vue.ClientUrl.game_center_scroll_msg)
        .then((res) => {
          if (10000 !== res.code) {
            return;
          }
          if (res.result && res.result.length) {
            _this.notices = res.result
          }
        })
    },
    getAdObj() {
      var _this = this
      Vue.ClientHttp(this).GET({
        type: 'ad'
      }, Vue.ClientUrl.game_center_banner).then(res => {
        if (10000 !== res.code) {
          return;
        }
        _this.adObj = res.result;
        console.log(res.result, _this.adObj, 88);
      })
    },
    getRecommendGameList() {
      var _this = this
      Vue.ClientHttp(this).GET({ uinfo: 1 }, Vue.ClientUrl.geme_center_recommend_game_list).then(res => {
        if (10000 !== res.code) {
          return;
        }
        if (res.result && res.result.length) {
          var recommendGameListCommon = [], recommendGameListQuick = []
          for (var i = 0; i < res.result.length; i++) {
            if (res.result[i].type == 1 && res.result[i].lastTime) {
              recommendGameListCommon.push(res.result[i])
            } else if (res.result[i].type == 2 && res.result[i].lastTime) {
              recommendGameListQuick.push(res.result[i])
            }
          }
          _this.recommendGameListCommon = recommendGameListCommon
          _this.recommendGameListQuick = recommendGameListQuick
        }
      })
    },
    getGameList: function (query) {
      var _this = this
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.game_center_list).then(res => {
        if (10000 !== res.code) {
          return;
        }
        if (query.type == 2) {
          if (res.result.length > 5)
            res.result.length = 5
          _this.h5TopList = res.result
        } else if (query.type == 3) {
          if (res.result.length > 5)
            res.result.length = 5
          _this.mobileTopList = res.result
        } else {
          if (res.result.length != 0) {
            _this.loading = false
            _this.allGameList = _this.allGameList.concat(res.result)
          } else {
            _this.listDone = true
          }
        }
      })
    },
    loadMore: function () {
      this.loading = true;
      this.getGameList({ page: ++this.allPageIndex, limit: 6 })
    },
    beginPlay(item) {
      // 如果是手游，检查下是ios还是android
      // 若对应版本的游戏不存在，则弹框提示用户
      if (item.field == '2') {
        let downloadUrl = mallUtils.device.isIOS ? item.iosUrl : item.downloadUrl;
        if (!downloadUrl || !downloadUrl.replace(/^\s+|\s+$/g, '')) {
          this.showDialogTip = true;
          this.tipConent = '您的手机暂不支持此版本游戏下载';
          return;
        }
        location.href = downloadUrl;
        return;
      }

      // 如果是h5游戏直接跳转
      location.href = item.downloadUrl;
    },
    gotoUrl(url, gid) {
      if (typeof gid !== 'undefined') {
        Vue.ClientHttp(this).GET({
          type: 0,
          gid: gid
        }, Vue.ClientUrl.sendGameStatistics)
          .then((res) => {
            if (10000 === res.code) {
              // TODO
              location.href = url;
            }
          })
      } else {
        location.href = url;
      }
    }
  },
  events: {
    'two-btns-dialog-component-left': function (eve) {
      this.showDialog = false
    },
    'two-btns-dialog-component-right': function (eve) {

    },
    'timer-action': function () {
      this.getRecommendGameList()
    }
  },
  components: {
    HeaderComponent,
    FooterComponent,
    Swipe,
    SwipeItem,
    InfiniteScroll,
    GameCenterScrollNotice,
    DialogComponent,
    DialogComponentOne,
    CdComponent,
    DialogComponentTip
  },
  mounted() {
    this.getSwiperList()
    this.getAdObj()
    this.getNotices()
    this.getRecommendGameList()
    this.getGameList({ type: 2 })
    this.getGameList({ type: 3 })
    this.getGameList({ page: this.allPageIndex, limit: 6 });
    localStorage.setItem('originUrl', location.href);

    // 统计使用
    Statistics(this);
  }
}
</script>
