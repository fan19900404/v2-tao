<!-- author:dreamapple -->
<template>
  <app-header :title="title">
  </app-header>

  <!-- main content -->
  <div class="game-center">
    <!-- 每日推荐 -->
    <div class="daily-recommendation normal-border-bottom">
        <div class="daily-recommendation__title">每日推荐</div>
        <!-- 轮播 -->
        <swipe
          :auto="4000"
          :show-indicators="true"
          class="daily-recommendation__carousel carousel">
          <swipe-item
            v-for="v in gameCarousel"
            class="carousel__item">
            <!--<a class="carousel__link" v-link="{name: 'GameIntro', params: {id: v.id}}">-->
            <a class="carousel__link" :href="v.link">
              <img :src="v.imgUrl" class="carousel__img">
            </a>
          </swipe-item>
        </swipe>
        <!-- 推荐的游戏 -->
        <div class="games-gallery flex">
          <div v-for="v in rankData" class="single-game flex-1">
            <div class="single-game__img-container">
              <a class="single-game__link" v-link="{name: 'GameIntro', params: {id: v.gameID}}">
                <img :src="v.imgUrl" class="single-game__img">
              </a>
            </div>
            <div class="single-game__title">
              {{v.gameName | substr 4 '...'}}
            </div>
          </div>
        </div>
    </div>
    <!-- H5游戏 -->
    <div class="game-section normal-border-top normal-border-bottom normal-margin-top">
      <div class="game-section__title">H5游戏 Top5</div>
      <!-- h5游戏列表 -->
      <div v-link="{name: 'GameIntro', params: {id: v.gameID}}" v-for="v in h5RankData" class="flex game-section__single-game normal-border-top game">
        <div class="flex game__container game__badge-container">
          <div v-if="$index + 1 > 3" :class="{
                  normal: $index + 1 > 3
                }" class="game__badge">{{$index+1}}</div>
          <div v-if="$index + 1 <= 3"
               class="game__badge">
            <div :class="{
                  'badge-gold': $index + 1 === 1,
                  'badge-silvery': $index + 1 === 2,
                  'badge-bronze': $index + 1 === 3
                }" class="special-badge"></div>
          </div>
        </div>
        <div class="flex game__container game__img-container">
          <img class="game__img" :src="v.imgUrl">
        </div>
        <div class="flex-1 flex game__container game__intro-container">
          <div class="intro">
            <div class="intro__name">{{v.gameName | substr 7 '...'}}</div>
            <div class="intro__type">类型: {{v.type}}</div>
            <div class="intro__words">{{v.intro | substr 9 '...'}}</div>
          </div>
        </div>
        <div class="flex game__container game__btn-container">
          <a  @click.stop="beginPlay(v)" class="game__btn">开始</a>
        </div>
      </div>
    </div>

    <!-- 游戏海报 -->
    <div class="game-poster">
      <a class="game-poster__link" :href="gameAd[0][0].link">
        <img class="game-poster__img" :src="gameAd[0][0].imgUrl">
      </a>
    </div>

    <!-- 手游游戏 -->
    <div class="game-section normal-border-top normal-border-bottom">
      <div class="game-section__title">手游游戏 Top5</div>
      <!-- 游戏列表 -->
      <div v-link="{name: 'GameIntro', params: {id: v.gameID}}" v-for="v in mobileRankData" class="flex game-section__single-game normal-border-top game">
        <div class="flex game__container game__badge-container">
          <div v-if="$index + 1 > 3" :class="{
                    normal: $index + 1 > 3
                  }" class="game__badge">{{$index+1}}</div>
          <div v-if="$index + 1 <= 3"
               class="game__badge">
            <div :class="{
                    'badge-gold': $index + 1 === 1,
                    'badge-silvery': $index + 1 === 2,
                    'badge-bronze': $index + 1 === 3
                  }" class="special-badge"></div>
          </div>
        </div>
        <div class="flex game__container game__img-container">
          <img class="game__img" :src="v.imgUrl">
        </div>
        <div class="flex-1 flex game__container game__intro-container">
          <div class="intro">
            <div class="intro__name">{{v.gameName | substr 7 '...'}}</div>
            <div class="intro__type">类型: {{v.type}}</div>
            <div class="intro__words">{{v.intro | substr 9 '...'}}</div>
          </div>
        </div>
        <div class="flex game__container game__btn-container">
          <a  @click.stop="beginPlay(v)" class="game__btn">下载</a>
        </div>
      </div>
    </div>

    <!-- 游戏海报 -->
    <div class="game-poster">
      <a class="game-poster__link" :href="gameAd[1][0].link">
        <img class="game-poster__img" :src="gameAd[1][0].imgUrl">
      </a>
    </div>

    <!-- 所有游戏 -->
    <div class="game-section normal-border-top" id="J_top_fixed">
      <div class="game-section__all-game-title flex" :class="{'header-active': !showHeader}">
        <div class="title-words flex-1">分类</div>
        <div @click="changeGameType(0)" class="btn-all" :class="{'btn-selected': 0 === gameType, 'btn-normal': 0 != gameType}">所有</div>
        <div @click="changeGameType(1)" class="btn-h5" :class="{'btn-selected': 1 === gameType, 'btn-normal': 1 != gameType}">H5</div>
        <div @click="changeGameType(2)" class="btn-mg" :class="{'btn-selected': 2 === gameType, 'btn-normal': 2 != gameType}">手游</div>
      </div>
      <!-- 替代上面的头部 -->
      <div v-if="!showHeader" class="game-section__all-game-title">
      </div>
      <!-- 替代上面的头部 -->
      <div class="page-loadmore-wrapper">
        <!-- 游戏列表 -->
        <!--<loadmore v-if="true" class="all-game-list" :bottom-method="loadBottom" :bottom-status="bottomStatus" :bottom-all-loaded="allLoaded">-->
          <!-- 所有游戏 -->
          <div v-link="{name: 'GameIntro', params: {id: v.gameID}}" v-if="0 === gameType" v-for="v in allGameList"
               :class="{'normal-border-bottom': $index + 1 === allGameList.length}"
               class="flex game-section__single-game normal-border-top game">
            <div v-link="{name: 'GameIntro', params: {id: v.gameID}}" class="flex game__container game__all-img-container">
              <img class="game__img" :src="v.imgUrl">
            </div>
            <div class="flex-1 flex game__container game__intro-container">
              <div class="intro">
                <div class="intro__name">{{v.gameName | substr 7 '...'}}</div>
                <div class="intro__type">类型: {{v.type}}</div>
                <div class="intro__words">{{v.intro | substr 9 '...'}}</div>
              </div>
            </div>
            <div class="flex game__container game__btn-container">
              <a class="game__btn" @click.stop="beginPlay(v)"> {{v.field == '1'?'开始':'下载'}}</a>
            </div>
          </div>
          <!-- h5游戏 -->
          <div v-link="{name: 'GameIntro', params: {id: v.gameID}}" v-if="1 === gameType" v-for="v in h5GameList"
               :class="{'normal-border-bottom': $index + 1 === h5GameList.length}"
               class="flex game-section__single-game normal-border-top game">
            <div v-link="{name: 'GameIntro', params: {id: v.gameID}}" class="flex game__container game__all-img-container">
              <img class="game__img" :src="v.imgUrl">
            </div>
            <div class="flex-1 flex game__container game__intro-container">
              <div class="intro">
                <div class="intro__name">{{v.gameName | substr 7 '...'}}</div>
                <div class="intro__type">类型: {{v.type}}</div>
                <div class="intro__words">{{v.intro | substr 9 '...'}}</div>
              </div>
            </div>
            <div class="flex game__container game__btn-container">
              <a class="game__btn" @click.stop="beginPlay(v)">开始</a>
            </div>
          </div>
          <!-- mobile游戏 -->
          <div v-link="{name: 'GameIntro', params: {id: v.gameID}}" v-if="2 === gameType" v-for="v in mobileGameList"
               :class="{'normal-border-bottom': $index + 1 === mobileGameList.length}"
               class="flex game-section__single-game normal-border-top game">
            <div v-link="{name: 'GameIntro', params: {id: v.gameID}}" class="flex game__container game__all-img-container">
              <img class="game__img" :src="v.imgUrl">
            </div>
            <div class="flex-1 flex game__container game__intro-container">
              <div class="intro">
                <div class="intro__name">{{v.gameName | substr 7 '...'}}</div>
                <div class="intro__type">类型: {{v.type}}</div>
                <div class="intro__words">{{v.intro | substr 9 '...'}}</div>
              </div>
            </div>
            <div class="flex game__container game__btn-container">
              <a class="game__btn" @click.stop="beginPlay(v)">下载</a>
            </div>
          </div>

          <!-- loading -->
          <div slot="bottom" class="bottom-status">
            <p class="bottom-status__one" v-show="bottomStatus !== 'loading' && allLoaded">没有更多的数据了</p>
            <p class="bottom-status__one" v-show="bottomStatus !== 'loading' && !allLoaded">上拉加载更多</p>
            <p class="bottom-status__one" v-show="bottomStatus === 'loading'">正在拼命加载中...</p>
          </div>
        <!--</loadmore>-->
      </div>
    </div>
  </div>

  <!-- common alert -->
  <common-alert :type="alertType" :show-alert="showAlert" :alert-msg="alertMsg" :alert-status="alertStatus"></common-alert>

  <app-footer></app-footer>
</template>

<script>
  'use strict';
  import Vue from 'vue';
  import AppHeader from '../../oldComponents/common-layout/header.component';
  import AppFooter from '../../oldComponents/common-layout/footer.component';
  import CommonAlert from '../../oldComponents/common-alert/common-alert.component';
  import { Swipe, SwipeItem } from 'mint-ui';
  import { Loadmore } from 'mint-ui';
  import { InfiniteScroll } from 'mint-ui';
  export default {
    components: {
      AppHeader,
      AppFooter,
      CommonAlert,
      Swipe,
      SwipeItem,
      Loadmore,
      InfiniteScroll
    },
    data() {
      return {
        title: '游戏中心',
        hasAction: true,
        // 游戏排行的数据
        rankData: [],
        // h5游戏排行
        h5RankData: [],
        // 手游游戏排行
        mobileRankData: [],
        // 所有游戏的类型 0:表示所有游戏 1:表示h5游戏 2:表示手游
        gameType: 0,
        // 分页使用页码
        allPage: 1,
        h5Page: 1,
        mobilePage: 1,
        limit: 6,
        // 数据是否全部加载完成
        allLoaded: false,
        // h5游戏列表
        h5GameList: [],
        // 手游游戏列表
        mobileGameList: [],
        // 所有游戏列表
        allGameList: [],
        // 初始的游戏数目条数
        initGameNum: 0,
        // 下拉加载的状态
        bottomStatus: null,
        // 页面的轮播图 type=3
        gameCarousel: [],
        // 游戏广告1 type='ad'
        gameAd: [],
        // infinite scroll
        loading: false,

        initHeight: 40,
        allH: 0,
        mobile: 0,
        h5H: 'auto',

        waypoint:null,
        showHeader: true,
        // 控制高度
        loadMoreHeight: false,
        // 弹框
        alertType: 0,
        showAlert: false,
        alertMsg: '',
        alertStatus: ''
      }
    },
    computed: {
      // 游戏列表的样式
      gameListStyle() {
        let height;
        let list = [];
        if(0 === this.gameType) {
          list = this.allGameList;
        }
        else if(1 === this.gameType) {
          list = this.h5GameList;
        }
        else if(2 === this.gameType) {
          list = this.mobileGameList;
        }
        else {
          // TODO
        }
        if(list.length > 0){
          if(list.length * 8 > this.initHeight){
            height = this.initHeight;
          }
          else{
            height = list.length * 8;
          }
        }
        else{
          height = 0;
        }
//        return {
//          height: height + 'rem'
//        }
        if(this.loadMoreHeight) {
          return {
            height: height + 'rem'
          }
        }
        else {
          return {
          }
        }
      },
      // 请求数据的查询参数
      query() {
        if(!this.gameType) {
          return {
            page: this[this.queryType],
            limit: this.limit
          }
        }
        else {
          return {
            field: this.gameType,
            page: this[this.queryType],
            limit: this.limit
          }
        }
      },
      queryType() {
        let type = 'allPage';
        if(0 === this.gameType) {
          type = 'allPage';
        }
        else if(1 === this.gameType) {
          type = 'h5Page';
        }
        else if(2 === this.gameType) {
          type = 'mobilePage';
        }
        else {
          // TODO
        }
        return type;
      }
    },
    methods: {
      // 获取游戏中心的banner
      getGameBanner(type) {
        let query = {
          type: type
        };
        return Vue.ClientHttp().GET(query, Vue.ClientUrl.game_center_banner)
          .then((res) => {
            // 游戏广告1
            if('ad' === query.type) {
                this.gameAd = res.result;
            }
            else if(3 === query.type) {
                this.gameCarousel = res.result;
            }
            else {
              // TODO
            }
          })
      },
      // 获取游戏首页的推荐游戏数据; 使用slice只需要前5条数据
      gameRank(query) {
        return Vue.ClientHttp().GET(query, Vue.ClientUrl.game_center_list)
          .then((res) => {
            if(10000 === res.code) {
              if(1 === query.type) {
                this.rankData = res.result.slice(0, 4);
              }
              else if(2 === query.type) {
                this.h5RankData = res.result.slice(0, 5);
              }
              else if(3 === query.type) {
                this.mobileRankData = res.result.slice(0, 5);
              }
              else {
                // TODO
              }
            }
            else {
              // TODO
            }
          });
      },
      initAllGame() {
        console.log(2);
        Vue.ClientHttp().GET(this.query, Vue.ClientUrl.game_center_list)
          .then((res) => {
            if(10000 === res.code) {
              // 计算返回数据的条目
              if(1 === this.query.page) {
                this.initGameNum = res.result.length;
              }

              if((0 === this.gameType) && (0 === this.allGameList.length)) {
                this.allGameList = res.result;
              }
              else if((1 === this.gameType) && (0 === this.h5GameList.length)) {
                this.h5GameList = res.result;
              }
              else if((2 === this.gameType) && (0 === this.mobileGameList.length)) {
                this.mobileGameList = res.result;
              }
              else {
                // TODO
              }
          }
          else {
              // TODO
          }
        })
      },
      // 所有的游戏
      allGame(id) {
        Vue.ClientHttp().GET(this.query, Vue.ClientUrl.game_center_list)
          .then((res) => {
            if(10000 === res.code) {

              this.loading = false;

              // 计算返回数据的条目
              if(1 === this.query.page) {
                this.initGameNum = res.result.length;
              }
              console.log(this.limit +'|' +res.result.length);
              // 没有更多数据可以加载了
              if(res.result.length < this.limit) {
                this.allLoaded = true;
                this.$broadcast('onBottomLoaded', id);
              }
              // 加载更多数据
              if(0 === this.gameType) {
                this.allGameList = this.allGameList.concat(res.result);
              }
              else if(1 === this.gameType) {
                this.h5GameList = this.h5GameList.concat(res.result);
              }
              else if(2 === this.gameType) {
                this.mobileGameList = this.mobileGameList.concat(res.result);
              }
              else {
                // TODO
              }
              this.$broadcast('onBottomLoaded', id);
            }
            else {
              // TODO
            }
          })
      },
      // 游戏种类的切换
      changeGameType(type) {
        this.allLoaded = false;
        this.gameType = type;
        if(1 === this.query.page) {
          this.initAllGame();
        }
      },
      // 翻页
      loadBottom(id) {
        this.loading = true;
        this[this.queryType]++;
        this.allGame(id);
      },
      touchLoading(){
        //滚动加载 滚到底部加载数据
        var scrollTop = document.body.scrollTop,
          bodyHeight = document.body.offsetHeight,
          screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
          triggerDistance = 20,
          triggerStatus = (bodyHeight - (scrollTop + screenHeight)) < (triggerDistance - 12) ? true : false;
        if(triggerStatus && !this.loading) {
          this.fetchMoreData();
        }
      },
      fetchMoreData(e) {
        if(this.loading || this.allLoaded) {
          console.log('不能够加载更多的数据了...');
        }
        else {
          this.loadBottom();
        }
      },
      beginPlay(item){

        // 如果是手游，检查下是ios还是android
        // 若对应版本的游戏不存在，则弹框提示用户
        if(item.field == '2'){
          let downloadUrl = mallUtils.device.isIOS? item.iosUrl: item.downloadUrl;
          if(!downloadUrl || !downloadUrl.replace(/^\s+|\s+$/g,'')){
            this.showAlert = true;
            this.alertMsg = '消息提示';
            this.alertStatus = '您的手机暂不支持此版本游戏下载';
            return;
          }
          location.href = downloadUrl;
          return;
        }

        // 如果是h5游戏直接跳转
        location.href = item.downloadUrl;
      }
    },
    mounted() {
      // // 获取banner图
      // this.getGameBanner(3);
      // this.getGameBanner('ad');
      // // 获取首页轮播图下面的游戏推荐
      // this.gameRank({type: 1, limit: 4});
      // this.gameRank({type: 2});
      // this.gameRank({type: 3});

      // 获取所有的游戏

      // this.initAllGame();

      // // 选项卡地方滚动到头部固定
      // 必须等到页面完全渲染且J_top_fixed这个元素的位置固定后再监听位置变动才有效
      // 否则，可能出现J_top_fixed未触碰顶部就触发handler回调的bug
      // setTimeout(() => {
      //   this.waypoint = new Waypoint({
      //     element: document.getElementById('J_top_fixed'),
      //     handler: () => this.showHeader = !this.showHeader
      //   })
      // }, 1000);

      Promise.all([
        this.getGameBanner(3),
        this.getGameBanner('ad'),
        this.gameRank({type: 1,limit: 4}),
        this.gameRank({type: 2}),
        this.gameRank({type: 3})
      ]).then(() => {
        this.initAllGame();
        //      滑动加载
        mallUtils.funs.scroll(this.touchLoading);

        let that = this;
        this.waypoint = new Waypoint({
          element: document.getElementById('J_top_fixed'),
          handler: (direction) => {
            if('down' === direction) {
              that.loadMoreHeight = true;
            }
            else {
              that.loadMoreHeight = false;
            }
            // toggle
            this.showHeader = !this.showHeader;
          }
        })
      });
      $('body').css({'background-color': '#f8f8f8'});
      $('.page-loadmore-wrapper').css('minHeight', ($(window).height() / 10 - 3.9 - 5.6) + 'rem');
    },
    destroyed() {
      if(this.waypoint){
        this.waypoint.destroy();
      }
      mallUtils.funs.unscroll(this.touchLoading);
    }
  }
</script>

<style lang="scss" scoped>
  $red: #fa4a4a;
  $white: #fff;
  $black: #000;
  $active: #f67b29;
  $font-size-big: 1.6rem;
  $font-size-enter-btn: 1.4rem;
  $font-size-middle: 1.2rem;
  $title-height: 3.9rem;
  $gray: #898989;
  $poster: #f8f8f8;

  .header-active {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 1.6rem;
    z-index: 100;
    border-bottom: 1px solid #dfdfdf;
    background-color: #fff;
  }

  .page-loadmore-wrapper{
  }

  .bottom-status {
    height: 4rem;
    &__one {
      margin-right: 1.6rem;
      line-height: 4rem;
      font-size: 1.2rem;
      text-align: center;
    }
  }

  .normal-border-top {
    border-top: 1px solid #dfdfdf;
  }
  .normal-border-bottom {
    border-bottom: 1px solid #dfdfdf;
  }
  .normal-margin-top {
    margin-top: 1.7rem;
  }

  .game-center {

  }
  .daily-recommendation {
    padding: 0 1.6rem;
    background-color: $white;
    &__title {
      font-size: $font-size-big;
      color: $black;
      height: $title-height;
      line-height: $title-height;
    }
    &__carousel {
      height: 12rem;
    }
    .carousel {
      &__link,
      &__img {
        display: block;
        height: 100%;
      }
    }
    .games-gallery {
      margin-top: 1.2rem;
      padding-bottom: .2rem;
      .single-game {
        &__img-container {
          height: 5.2rem;
        }
        &__link,
        &__img {
          display: block;
          height: 5.2rem;
          width: 5.2rem;
        }
        &__link {
          margin: auto;
        }
        &__img {
          border-radius: 1rem;
        }
        &__title {
          height: 3.2rem;
          line-height: 3.2rem;
          font-size: $font-size-middle;
          text-align: center;
        }
      }
    }
  }
  .game-poster {
    background-color: $poster;
    padding: 1.2rem 1.6rem;
    &__link {
      display: block;
      height: 7.2rem;
    }
    &__img {
      height: 100%;
    }
  }
  .game-section {
    background-color: $white;
    padding-left: 1.6rem;
    &__title {
      height: $title-height;
      line-height: $title-height;
      color: $red;
      font-size: $font-size-big;
    }
    &__all-game-title {
      height: $title-height;
      align-items: center;
      padding-right: 1.6rem;
      .title-words {
        height: $title-height;
        line-height: $title-height;
        color: $black;
        font-size: $font-size-big;
      }
      .btn-h5, .btn-mg, .btn-all {
        width: 5.9rem;
        height: 2.4rem;
        line-height: 2.4rem;
        border-radius: .5rem;
        text-align: center;
        font-size: $font-size-enter-btn;
      }
      .btn-mg, .btn-h5 {
        margin-left: .6rem;
      }
      .btn-selected {
        position: relative;
        color: $active;
        border: 1px solid $active;
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url('/static/images/game-center/h5-btn-active.png');
      }
      .btn-normal {
        color: $black;
        background-color: #f8f8f8;
        border: 1px solid #dfdfdf;
      }
    }
    &__single-game {
      height: 7.9rem;
      padding-right: 1.6rem;
    }
    .game {
      &__container {
        flex-direction: column;
        justify-content: center;
      }
      &__badge-container {
        width: 2.1rem;
        .normal {
          width: 2.1rem;
          height: 2.1rem;
          line-height: 2.1rem;
          border-radius: 50%;
          background-color: #dfdfdf;
          color: $gray;
          text-align: center;
        }
        .special-badge {
          height: 3.2rem;
          width: 2.1rem;
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
        }
        /* 游戏排名的样式 */
        .badge-gold {
          background-image: url('/static/images/game-center/badge-gold.png');
        }
        .badge-silvery {
          background-image: url('/static/images/game-center/badge-silvery.png');
        }
        .badge-bronze {
          background-image: url('/static/images/game-center/badge-bronze.png');
        }
      }
      &__all-img-container {
        margin-right:1.2rem;
      }
      &__img-container {
        margin: auto 1.2rem;
      }
      &__img {
        width: 5.4rem;
        height: 5.4rem;
        border-radius: 1rem;
      }
      &__btn {
        width: 6rem;
        height: 3rem;
        line-height: 3rem;
        border-radius: .5rem;
        border: 1px solid $red;
        font-size: $font-size-enter-btn;
        color: $red;
        text-align: center;
      }
    }
    .game__intro-container {
      .intro {
        &__name {
          height: 2rem;
          line-height: 2rem;
          font-size: $font-size-enter-btn;
        }
        &__type,
        &__words {
          height: 1.5rem;
          line-height: 1.5rem;
          font-size: $font-size-middle;
          color: $gray;
        }
      }
    }
  }
</style>
