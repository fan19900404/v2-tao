<template>
  <div>

    <app-header :title="title">
    </app-header>

    <search @game-center-search="search"></search>
    <section class="hot-game-first">
      <div class="swiper-container">
        <div class="swiper-wrapper JS-statistics-swipe-wrapper">
          <div v-for="(item,index) in gameHot.slider" class="swiper-slide JS-statistics-swipe" :key="index">
            <a @click="linkToTarget(item.url,item.name)" class="JS-statistics-swipe-link">
              <img class="swiper-slide__img" :src="item.imgUrl" alt="">
            </a>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="tab">
        <div class="tab__con" @click="link({name:'TaoYouPersonalCenterTaodouMatch'})">
          <span class="icon-welfare"></span>
          <div class="tab__text">福利</div>
        </div>
        <div class="tab__con" @click="link({name:'TaoYouWelfareShopWelfare'})">
          <span class="icon-shop"></span>
          <div class="tab__text">商城</div>
        </div>
        <div class="tab__con" @click="link({name:'TaoYouOriginalNews'})">
          <span class="icon-original"></span>
          <div class="tab__text">原创</div>
        </div>
      </div>
    </section>

    <!-- 热门推荐 -->
    <div class="taoyou__carousel__header am-flexbox" @click="link({name: 'TaoYouGameCenter'})">
      <div class="nav-game__left am-flexbox-item am-flexbox">热门推荐</div>
      <div class="nav-game__right am-flexbox-item am-flexbox">
        <a class="nav-game__right__link am-flexbox JS-statistics-enter-game-center">游戏中心</a>
        <span class="nav-game__right__icon am-flexbox">
          <i class="icon icon-arrow-right"></i>
        </span>
      </div>
    </div>
    <!-- 热门游戏 -->
    <section class="hot-game">

      <div class="swiper-container__game-icon">
        <ul class="swiper-wrapper">
          <li v-for="(v,index) in gameHot.gameList" @click.stop="beginPlay(v)" :class="{'swiper-slide':true, 'active':index==0}" :key="index">
            <div class="img-wrapper">
              <img class="swiper-slide__img" :src="v.imgUrl" alt="">
              <img v-if="v.field == 1" class="swiper-slide__img-h5" src="/oldStatic/images/tao-you/home/h5.png" alt="">
            </div>
            <div class="game-name overflow-ellipsis">
              {{v.gameName}}
            </div>
            <div class="game-count overflow-ellipsis">
              <span style="color:#ff4a4a;">{{ parseInt(v.viewNumber)
                <10000?v.viewNumber:(parseInt(v.viewNumber)/10000).toFixed(2) + '万' }}</span>
                  <span>人在玩</span>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <div class="taoyou__carousel__header am-flexbox" @click="link({name: 'TaoYouPacks'})" v-if="hot.length>0">
      <div class="nav-game__left am-flexbox-item am-flexbox">热门礼包</div>
      <div class="nav-game__right am-flexbox-item am-flexbox">
        <a class="nav-game__right__link am-flexbox JS-statistics-enter-game-center">礼包中心</a>
        <span class="nav-game__right__icon am-flexbox">
          <i class="icon icon-arrow-right"></i>
        </span>
      </div>
    </div>
    <section v-if="hot.length>0" class="outer">
      <div @click="link({name: 'TaoYouPacksDetails', params: {id: gift.id}})" class="gift" v-for="(gift,i) in hot.slice(0,3)" :key="i">
        <img class="gift__img" :src="gift.image" alt="">
        <div class="gift__intro">
          <div class="gift__name overflow-ellipsis">{{gift.gameName}}</div>
          <div class="gift__type overflow-ellipsis">{{gift.name}}</div>
          <div class="gift__platform">适用平台:{{gift.typeName}}</div>
        </div>
        <div class="gift__progress">
          <progress-component :progress="gift.usedNumber / gift.totalNumber * 100" :has="gift.uID!=0?true:false"></progress-component>
          <span :class="{'gift__progress-text':true,'gift__progress-text--disabled':gift.uID>0}">{{gift.uID == 0&&gift.taoDou !=0 ? '兑' :gift.uID == 0?'领':'已领' }}</span>
        </div>
      </div>
    </section>

    <!-- 一元购 -->
    <div v-show="showFlag.duoBaoFlag" class="taoyou__oneyuan__header">1元夺宝</div>
    <section v-show="showFlag.duoBaoFlag" class="one-mail" v-if="goods">
      <div class="one-mail-content am-flexbox">
        <div class="pic-introduce">
          <img :src="goods.goodsImg" alt="">
        </div>
        <div class="am-flexbox-item detail-info">
          <div class="goods-name">{{ goods.goodsName }}</div>
          <div class="progress-bar clearfix">
            <div class="progress-bar__wrapper">
              <div class="bar progress-bar__current" v-bind:style="{width: num}">&nbsp;</div>
              <div class="bar progress-bar__rest">&nbsp;</div>
            </div>
            <div class="progress-bar__title fl">总需{{ goods.totalNum }}</div>
            <div class="progress-bar__rest-amount fr">剩余
              <span>{{ goods.leftNum }}</span>
            </div>
          </div>
          <a class="JS-statistics-ad join" :href="'http://1.lly800.com/#/details/' + goods.nowNumberID">立即参与</a>
        </div>
      </div>
    </section>

    <!-- 热门资讯 -->
    <div class="taoyou__news__header">热门资讯</div>
    <section class="hot-news">
      <div>
        <!-- 新闻列表 有4种展示方式 -->
        <div class="news-list" v-infinite-scroll="loadNewsHot" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
          <div class="item JS-statistics-news" v-for="(item,index) in newsList" @click="link({name: 'TaoYouNewsDetail', params: {id: item.id}, query: {type: item.fromType}})" :key="index">

            <!-- 上中下结构 中间大图 -->
            <div v-if="item.type == 1" class="content type1 am-flexbox">
              <div class="content__title overflow-ellipsis">{{ item.title }}</div>
              <div class="content__picture am-flexbox">
                <img :src="item.picPath[0]" alt="">
              </div>
              <div class="content__info am-flexbox">
                <span class="content__info__source overflow-ellipsis">{{ item.source }}</span>
                <span class="content__info__publish-time 1overflow-ellipsis">{{ item.publishTime | formatDateToTimeago }}</span>
              </div>
            </div>

            <!-- 左右结构 左边是图片 右边是描述文字-->
            <div v-if="item.type == 2" class="content type2 am-flexbox">
              <div class="content__left am-flexbox 1content__picture">
                <img :src="item.picPath[0]" alt="">
              </div>
              <div class="content__right am-flexbox-item am-flexbox">
                <div class="content__title overflow-ellipsis-multiline">{{ item.title }}</div>
                <div class="content__info am-flexbox">
                  <span class="content__info__source am-flexbox-1 overflow-ellipsis">{{ item.source }}</span>
                  <span class="content__info__publish-time 1am-flexbox-1 overflow-ellipsis">{{ item.publishTime | formatDateToTimeago }}</span>
                </div>
              </div>
            </div>

            <!-- 上中下结构 只有文字 -->
            <div v-if="item.type == 3" class="content type3 am-flexbox">
              <div class="content__title overflow-ellipsis">{{ item.title }}</div>
              <div class="content__detail overflow-ellipsis-multiline">{{ item.desc }}</div>
              <div class="content__info am-flexbox">
                <span class="content__info__source overflow-ellipsis">{{ item.source }}</span>
                <span class="content__info__publish-time 1overflow-ellipsis">{{ item.publishTime | formatDateToTimeago }}</span>
              </div>
            </div>

            <!-- 上中下结构 中间多图 -->
            <div v-if="item.type == 4" class="content type4 am-flexbox">
              <div class="content__title overflow-ellipsis">{{ item.title }}</div>
              <div class="content__picture am-flexbox">
                <img v-for="(subItem,index) in item.picPathList" :key="index" class="am-flexbox-item" :src="subItem" alt="">
              </div>
              <div class="content__info am-flexbox">
                <span class="content__info__source overflow-ellipsis">{{ item.source }}</span>
                <span class="content__info__publish-time 1overflow-ellipsis">{{ item.publishTime | formatDateToTimeago }}</span>
              </div>
            </div>
          </div>
        </div>
        <p v-show="loading" class="page-infinite-loading">
          <my-spinner type="fading-circle"></my-spinner>加载中
        </p>
      </div>

    </section>

    <!-- 底部 -->
    <app-footer :menu-id="0"></app-footer>

    <!-- 回到顶部 -->
    <back-top></back-top>

    <!--首页消息弹窗-->
    <one-message :show="isShowOneMessage" :title="Title" :img-url="imgUrl"></one-message>
  </div>
</template>

<script>

import $ from 'jquery';
import { InfiniteScroll, Spinner, Swipe, SwipeItem } from 'mint-ui';
import Swiper from 'swiper';
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

import AppHeader from '../../../oldComponents/tao-you/layout/header.component';
import AppFooter from '../../../oldComponents/tao-you/layout/footer.component';
import Slider from '../../../oldComponents/common-slider/simple-slider.component';
import welcomeAlert from '../../../oldComponents/tao-you/reg/regcomplete.component';
import Search from '../game-center-1.2/index/component/game-center-search.component';
import ProgressComponent from '../../../oldComponents/tao-you/svg-progress/svg-progress.component';

import DrHomeSlider from '../../../oldComponents/common-slider/vue-dr-home-slider.component';
import ScrollNotice from '../../../oldComponents/tao-you/notice/game-center-scroll-notice.component';
import Toast from '../../../oldComponents/about-user-action/toast.component';
import S1LoginUsePhone from '../../../oldComponents/about-user-action/s1-login-use-phone.component';
import S2LoginWithPassword from '../../../oldComponents/about-user-action/s2-login-with-password.component';
import S3GetVerificationCode from '../../../oldComponents/about-user-action/s3-get-verification-code.component';
import S4SetPassword from '../../../oldComponents/about-user-action/s4-set-password.component';

import AppHomeCd from '../../../oldComponents/common-cd/app-home-cd';

// 添加回到顶部
import BackTop from '../../../oldComponents/tao-you/button/back-top.component';
// 首页消息弹窗
import OneMessage from '../../../oldComponents/tao-you/dialog/one-message-dialog.component';

// 统计代码
import Statistics from '../statistics/home/index.statistics';

import { startGame } from '../../../oldComponents/tao-you/tools/tools';

Vue.component('my-spinner', Spinner);
Vue.use(InfiniteScroll);

export default {
  components: {
    AppHeader,
    AppFooter,
    Slider,
    Search,
    Spinner,
    DrHomeSlider,
    ScrollNotice,
    Toast,
    S1LoginUsePhone,
    S2LoginWithPassword,
    S3GetVerificationCode,
    S4SetPassword,
    AppHomeCd,
    Swipe,
    SwipeItem,
    welcomeAlert,
    ProgressComponent,
    BackTop,
    OneMessage,
  },
  data() {
    return {
      // 轮播的一些配置
      gapWidth: '.1rem',
      rightGapWidth: '.16rem',
      drCarouselItemStyle: {
        width: '1.66rem',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
      },
      drCarouselWrapperStyle: {
        height: '1rem',
        backgroundColor: '#ffffff',
      },
      // 轮播配置结束
      title: '淘游助手',
      // 游戏轮播配置
      sliderStyle: {
        // height: '20rem'
      },
      sliderinit: {
        currentPage: 1,
        start: {},
        end: {},
        tracking: false,
        thresholdTime: 360, // 滑动判定距离
        thresholdDistance: 100, // 滑动判定时间
      },
      notices: [],
      // 顶部轮播和游戏列表
      gameHot: {
        slider: [],
        gameList: [],
      },
      goods: null,
      // 进度条
      num: 0,
      // 新闻列表
      loading: false, // 加载中
      allLoaded: false, // 已全部加载
      pageIndex: 1, // 当前第几页
      pageSize: 4, // 一页数据条数
      newsList: [],
      // 登录注册部分是下面的
      mID: 8,
      // // 关于toast
      isShowToast: false,
      toastText: null,
      toastTime: 2000,
      // // 关于登录注册
      // 记录组件显示的历史记录
      stepHistory: [1],
      // 显示那个组件
      step: 1,
      // 是否显示组件
      show: false,
      // 按钮是否可用
      isBtnActive: true,
      // 手机号码
      phone: null,
      // 验证码
      verificationCode: null,
      // 密码
      password: null,
      // 注册密码还是重置密码
      setActionType: null,
      // truth
      truth: false,
      // 玩游戏赢淘豆数据集合
      playGameList: [],
      // 图片的高度
      carouselImgHeight: 0,
      hot: {},
      // 是否展示消息弹窗
      isShowOneMessage: false,
      // 消息弹窗标题
      Title: '方块游戏何方神圣 引大',
      // 弹窗的图片地址
      imgUrl: 'http://image.lly800.com/goods/20170508/1494248357182654.jpg',
    };
  },
  computed: {
    ...mapGetters(['user', 'showFlag']),
    carouselStyle() {
      return {
        height: `${this.carouselImgHeight}px`,
      };
    },
  },
  mounted() {
    $('body').css('background-color', '#f8f8f8');
    this.getUserInfo();
    this.loadBanner();
    this.loadGameHot();
    this.loadOneMailHot();
    this.getGifts();
    this.loadNewsHot();
    // this.loadPlayGameList();
    this.getFooterFlag();

    setTimeout(() => {
      this.truth = true;
    }, 360);

    this.getNotices();
    localStorage.setItem('originUrl', location.href);
    // 统计
    Statistics(this);
  },
  methods: {
    ...mapActions(['getUserInfo', 'getFooterFlag']),
    link(url) {
      this.$router.push(url);
    },
    // 处理轮播图的链接问题
    linkToTarget(url, name) {
      // 判断是否含有http(s)
      if (/^http(s*)/.test(url)) {
        if (url.indexOf('/banner_game') !== -1 || url.indexOf('/to_game') !== -1) {
          const count = url.indexOf('&');
          const url1 = url.slice(0, count);
          const arr = url1.split('=');
          const gameID = arr[1];
          startGame(this, {
            gameID,
            gameUrl: url1,
            gameName: name,
            type: 1,
          });
        } else {
          location.href = url;
        }
      } else {
        this.$router.push(url);
      }
    },
    search() {
      this.$router.push(
        { name: 'TaoYouSearch', query: { type: 1 } },
      );
    },
    // 获取热门礼包列表
    getGifts() {
      const query = {
        page: 1,
        limit: 4,
        hot: 1,
        nologin: 1,
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.gifts_list)
        .then((res) => {
          if (res.code === 10000) {
            this.hot = res.result;
          }
        });
    },
    getProgress(used, total) {
      const left = used;
      const progress = parseInt((left / total) * 100);
      return progress;
    },
    // 获取当前用户的信息
    welcomeUser() {
      const query = {

      };
      Vue.ClientHttp().GET(query, Vue.ClientUrl.personal_userinfo)
        .then((res) => {
          if (res.code === 10000) {
            // TODO
          }
        });
    },
    // 判断用户是否登录,如果没有登录,强制登录
    goMorePage(url) {
      if (this.user.userId) {
        this.$router.push(url);
      } else {
        this.$router.push(url);
      }
    },
    gotoUrl(url, gid) {
      if (this.user.userId) {
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
      } else {
        const nextUrl = window.location.hash.slice(1);
        localStorage.setItem('Q_next_url', nextUrl);
        localStorage.setItem('Q_from_url', window.encodeURIComponent(window.location.href));
        this.$router.push({
          name: 'TaoYouUserLogin',
          query: {
            mID: localStorage.getItem('mID') || 8,
          },
          replace: true,
        });
      }
    },
    // fix image layout
    fixImageLayout(e, index) {
      if (index === 0) {
        const carouselWidth = $('.swipe-items-wrap').width();
        const rate = e.target.naturalHeight / e.target.naturalWidth;
        const realHeight = carouselWidth * rate;
        this.carouselImgHeight = realHeight;
      }
    },
    getNotices() {
      const _this = this;
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
    /* 获取轮播列表 */
    loadBanner() {
      Vue.ClientHttp(this).GET({
        type: 4,
        page: 1,
        limit: 8,
        nologin: 1,
      }, Vue.ClientUrl.game_center_banner)
        .then((res) => {
          if (res.code === 10000) {
            const sliderList = res.result;
            sliderList.forEach((item) => {
              if (item.url.indexOf('/banner_game') != -1 || item.url.indexOf('/to_game') != -1) {
                item.url = `${localStorage.getItem('runningURl') + item.url}&nologin=1&from=1&mID=${localStorage.getItem('mID')}`;
                // localStorage.setItem('Q_next_url', item.url);
              }
            });
            // let itemStyle = {
            //   width: '60%',
            //   marginRight: '.15rem',
            //   position: 'relative'
            // };
            // sliderList.forEach(function(item, index) {
            //   item.style = itemStyle;
            // });
            this.gameHot.slider = sliderList;
            setTimeout(() => {
              new Swiper('.swiper-container', {
                direction: 'horizontal',
                loop: true,
                pagination: '.swiper-pagination',
                autoplay: 3500,
                autoplayDisableOnInteraction: false,
              });
            }, 100);
          } else {
            this.show = true;
            console.log('获取热门游戏数据失败');
          }
        });
    },

    /* 获取热门游戏列表 */
    loadGameHot() {
      Vue.ClientHttp(this).GET({
        type: 4,
        page: 1,
        limit: 8,
        nologin: 1,
      }, Vue.ClientUrl.game_center_list)
        .then((res) => {
          if (res.code === 10000) {
            this.gameHot.gameList = res.result.slice(0, 8);
            setTimeout(() => {
              const mySwiper = new Swiper('.swiper-container__game-icon', {
                direction: 'horizontal',
                // spaceBetween: 25,
                slidesPerView: 'auto',
                // width: 54,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                // width : 54
              });
            }, 50);
            return;
          }
          console.log('获取热门游戏数据失败');
        });
    },

    /* 获取玩游戏赢淘豆数据列表 */
    loadPlayGameList() {
      Vue.ClientHttp(this).GET({
        nologin: 1,
      }, Vue.ClientUrl.get_index_game_list)
        .then((res) => {
          if (res.code === 10000) {
            this.playGameList = res.result;
            return;
          }
          console.log('获取玩游戏赢取淘豆数据失败');
        });
    },

    /* 获取一元购相关数据 */
    loadOneMailHot() {
      const query = {
        numberID: 6,
        nologin: 1,
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.one_mail)
        .then((res) => {
          if (res.code === 10000) {
            if (res.result.code == 10001) {
              return;
            }
            this.goods = res.result;
            const result = res.result;
            this.num = `${(result.totalNum - result.leftNum) / result.totalNum * 100}%`;
          } else {
            console.log(res);
          }
        });
    },

    /* 获取新闻列表 */
    loadNewsHot() {
      if (this.allLoaded) {
        return;
      }
      this.loading = true;
      Vue.ClientHttp(this).GET({
        page: this.pageIndex,
        limit: this.pageSize,
        nologin: 1,
      }, Vue.ClientUrl.news_list)
        .then((res) => {
          setTimeout(() => { this.loading = false; }, 1500);
          if (res.code === 10000) {
            this.newsList = this.newsList.concat(res.result);
            const length = res.result.length;
            if (length > 0) {
              this.pageIndex++;
            }
            if (length < this.pageSize) {
              this.allLoaded = true;
            }
          }
        });
    },

    /* 开始游戏 */
    beginPlay(game) {
      startGame(this, {
        gameID: game.gameID,
        gameUrl: game.downloadUrl,
        gameName: game.gameName,
        direction: game.direction,
        type: game.field,
      });
    },

    // // 关于登录注册部分
    // toast提示
    toast(msg) {
      this.isShowToast = true;
      this.toastText = msg;
    },
    // 监测用户的手机 看是新用户还是老用户
    checkUserPhone() {
      const query = {
        phone: this.phone,
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.common_check_phone)
        .then((res) => {
          if (res.code === 10000) {
            const isOldUser = res.result.isUsed;
            if (isOldUser) {
              this.step = 2;
              // 重置密码
              this.setActionType = 'resetPassword';
            } else {
              // 注册参数
              this.setActionType = 'reg';
              this.step = 3;
              this.sendVerificationCode();
            }
            // 记录顺序
            this.stepHistory.push(this.step);
          }
        });
    },
    // 发送验证码
    sendVerificationCode() {
      // TODO 发送验证码
      const query = {
        phone: this.phone,
        type: this.setActionType,
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.common_send_code)
        .then((res) => {
          if (res.code === 10000) {
            const isDone = res.result.isDone;
            if (isDone) {
              this.toast('验证码成功发送');
              this.step = 3;
              this.stepHistory.push(this.step);
            } else {
              // TODO 验证码发送失败
              this.toast('验证码发送失败');
            }
          } else {
            // TODO code不是10000
            this.toast(res.msg);
          }
        });
    },
    // 检验验证码
    checkVerificationCode() {
      const query = {
        phone: this.phone,
        code: this.verificationCode,
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.common_check_code)
        .then((res) => {
          if (res.code === 10000) {
            this.toast('验证码验证成功');
            this.step = 4;
            this.stepHistory.push(this.step);
          } else {
            // TODO
            this.toast(res.msg);
          }
        });
    },
    // 设置密码
    setUserPassword() {
      const that = this;
      let query;
      let requestUrl;
      // 判断用户是老用户还是新用户
      if (this.setActionType == 'reg') {
        query = {
          phone: this.phone,
          mID: this.mID,
          code: this.verificationCode,
          password: this.password,
        };
        requestUrl = Vue.ClientUrl.common_set_password;
      } else if (this.setActionType == 'resetPassword') {
        query = {
          phone: this.phone,
          code: this.verificationCode,
          password: this.password,
        };
        requestUrl = Vue.ClientUrl.common_update_password;
      } else {
        // TODO
      }
      Vue.ClientHttp(this).GET(query, requestUrl)
        .then((res) => {
          if (res.code === 10000) {
            window.location.href = '/#/tao-you/';
            that.getUserInfo();
            that.loadBanner();
            that.loadGameHot();
            that.loadOneMailHot();
            that.loadNewsHot();
            this.toast('密码设置成功!');
            this.show = false;
          } else {
            // TODO
            this.toast(res.msg);
          }
        });
    },
    // 用户登录
    userLogin() {
      const that = this;
      const query = {
        username: this.phone,
        password: this.password,
        mID: this.mID,
      };
      Vue.ClientHttp(this).GET(query, Vue.ClientUrl.common_user_login)
        .then((res) => {
          if (res.code === 10000) {
            window.location.href = '/#/tao-you';
            that.getUserInfo();
            that.loadBanner();
            that.loadGameHot();
            that.loadOneMailHot();
            that.loadNewsHot();
            this.show = false;
            this.toast('登陆成功!');
          } else {
            // TODO
            this.toast(res.msg);
          }
        });
    },
    // 底部按钮
    bottomBtnAction() {
      // 手机登录
      if (this.step === 1) {
        this.checkUserPhone();
      }
      // 老用户登录
      else if (this.step === 2) {
        this.userLogin();
      }
      // 获取验证码
      else if (this.step === 3) {
        this.checkVerificationCode();
      }
      // 重新设置密码
      else if (this.step === 4) {
        this.setUserPassword();
      }
    },
    // 返回
    backStep() {
      // 删除当前的状态
      this.stepHistory.pop();
      // 获取前一个状态
      const preStep = this.stepHistory.pop();
      this.step = preStep;
      this.stepHistory.push(preStep);
    },
    // 忘记密码
    forgetPassword() {
      this.sendVerificationCode();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/tao-you/common.scss';

.swiper-container {
  /*height: 1.4rem;*/
}

.icon.icon-arrow-right {
  margin-right: -.02rem;
  font-size: $font-size-sm;
  color: #a5a5a5;
}

.recommend-game,
.one-mail {
  background-color: #fff;
  padding: .14rem .15rem;
  margin-bottom: .15rem;
  border-top: solid $primary-border 1px;
  border-bottom: solid $primary-border 1px;
}

.hot-game-first {
  background-color: #fff;
  padding: 0 .15rem 0 .15rem;
  /*margin-bottom: .15rem;*/
  /*border-top: solid $primary-border 1px;*/
}

.hot-game {
  background-color: #fff;
  padding-top: .15rem;
  padding-bottom: .15rem;

  margin-bottom: .15rem;
  /*border-top: solid $primary-border 1px;*/
  // border-bottom: solid $primary-border 1px;
}

.hot-news {
  background-color: #fff;
  padding: 0 .15rem .14rem .15rem; // margin-bottom: .15rem;
  border-top: solid $primary-border 1px; // border-bottom: solid $primary-border 1px;
}






/* 各部分头部*/

.nav {
  margin-bottom: .14rem;

  &__left,
  &__right {
    align-items: center;
  }
  &__left {
    justify-content: flex-start;
    font-size: $font-size-lg;
  }
  &__right {
    justify-content: flex-end;

    &__link {
      align-items: center;
      color: #a5a5a5;
      font-size: $font-size-sm;
    }
    &__icon {
      justify-content: flex-end;
      width: .15rem;
    }
  }
}






/* 热门游戏*/

.hot-game {
  .list {
    justify-content: space-between;
    flex-wrap: wrap;

    &__item {
      padding-top: .15rem;

      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      &__name {
        width: .545rem;
        font-size: $font-size-xs;
        text-align: center;
      }
    }
    &__img {
      position: relative;
      width: 100%;
      width: .545rem;
      height: .545rem;
      overflow: hidden;
      border-radius: .10rem;

      &__h5 {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 60%;
      }
    }
  }
}

.notice-area-container {
  background-color: #ffffff;
}

.notice-area {
  margin-left: .15rem;
  padding-right: .15rem;
}






/* 推荐游戏*/

.recommend-game {
  padding: 0 0 .14rem 0;

  .nav {
    padding-left: .14rem;
    padding-right: .14rem;
  }
  .list {
    padding-left: .15rem;
    padding-right: .15rem;
    /*border-top: solid $primary-border 1px;*/
    &__item {
      padding-top: .1rem;
      padding-bottom: .095rem;
      border-bottom: solid $primary-border 1px;

      &:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }
      &__img {
        width: .43rem;
        height: .43rem;
        margin-right: .1rem;
        margin-bottom: .16rem;

        img {
          width: 100%;
          height: 100%;
          border-radius: .06rem;
        }
      }
      &__content {
        margin-left: .55rem;
      }

      .title {
        font-size: $font-size-lg;

        &__sub {
          font-size: $font-size-sm;
        }
      }
      .detail {
        &__left {
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          color: $hint;

          &__starttime,
          &__reward {
            height: .14rem;
            line-height: .14rem;
            overflow: hidden;
            font-size: $font-size-md;
            color: #a5a5a5;
          }
          &__starttime {
            margin-top: .04rem;
            margin-bottom: .07rem;
          }
          &__reward {
            &__amount {
              color: #ff4a4a;
            }
          }
        }
        &__right {
          width: .59rem;
          justify-content: flex-end;
          align-items: center;

          .link {
            padding: 0 .09rem;
            color: #333;
            font-size: .13rem;
            text-align: center;
            border: 1px solid #ccc;
            border-radius: .04rem;
            height: .23rem;
            line-height: .23rem;
          }
        }
      }
    }
  }
}

.hot-news {
  padding-left: 0;
  padding-right: 0;

  .nav {
    padding-left: .14rem;
    padding-right: .14rem;
  }
  .one-mail-header {
    border-top: solid $primary-border 1px;
    padding-top: .14rem;
    margin-bottom: .14rem;
    padding-left: .15rem;
    padding-right: .15rem;
  }
}

.one-mail {
  background-color: #fff;

  .nav {
    padding-bottom: .14rem;
    border-bottom: solid $primary-border 1px;
  }
}






/* 一元购*/

.one-mail-content {
  align-items: center;
  justify-content: center;
  padding-left: .15rem;
  padding-right: .15rem;

  .pic-introduce {
    width: 1rem;
    padding-right: .2rem;
    margin-right: .12rem;
    border-right: solid $primary-border 1px;
  }
  .detail-info {
    .goods-name {
      margin-bottom: .105rem;
      height: .2rem;
      line-height: .2rem;
      overflow: hidden;
      font-size: $font-size-sm;
    }
    .progress-bar {
      &__wrapper {
        margin-bottom: .0875rem;
      }
      .bar {
        height: 0.05rem;
        border-radius: 0.05rem;
      }
      &__rest {
        background-color: #dfdfdf;
      }
      &__current {
        position: absolute;
        background-color: #ff695a;
      }
      &__title,
      &__rest-amount {
        color: $hint;
        margin-bottom: .12rem;
        height: .12rem;
        line-height: .12rem;
        font-size: $font-size-xs;
      }
      &__rest-amount {
        span {
          color: #ff4a4a;
        }
      }
    }
    .join {
      display: inline-block;
      width: 100%;
      padding: 0.05rem 0;
      color: #fff;
      background-color: #ff4a4a;
      text-align: center;
      border-radius: 0.05rem;
    }
  }
}






/* 新闻*/

.news-list {
  padding: 0 0 0 .15rem;

  .item {
    padding-right: .15rem;
    border-bottom: solid $primary-border 1px;

    /*&:first-child {*/
    /*border-top: solid $primary-border 1px;*/
    /*}*/
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
      color: $hint;

      &__source {
        max-width: 1rem;
        margin-right: .095rem;
      }
      &__publish-time {
        // max-width: .5rem;
      }
    }
  }
  .type1.content,
  .type3.content,
  .type4.content {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    .content__title {
      width: 100%;
      margin-bottom: .14rem;
    }
  }
  .type2 {
    align-items: stretch;

    .content__left {
      width: 1.08rem;
      margin-right: .08rem;
      align-items: center;
    }
    .content__right {
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: flex-start;
      justify-content: space-between;
    }
  }
  .type3 {
    .content__detail {
      color: #666;
      font-size: $font-size-md;
    }
  }
  .type4 {
    img:not(:first-child) {
      margin-left: .1rem;
    }
  }
}

.ranking {
  margin: .15rem 0;
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

.red {
  color: #ff4a4a;
}






/* 修复2.1 */

.taoyou__home__slider {
  height: 1.4rem;
}

.taoyou__home__slider-img {
  display: block;
  height: 100%;
}

.taoyou__carousel__header,
.taoyou__oneyuan__header,
.taoyou__game__header,
.taoyou__news__header {
  height: .44rem;
  background-color: #fff;
  line-height: .44rem;
  padding-left: .15rem;
  font-size: .16rem;
  color: #333; // border-top: 1px solid #e5e5e5;
}

.taoyou__game__header,
.taoyou__carousel__header {
  display: flex;
  justify-content: space-between;
  padding-right: .15rem;
}

.taoyou__carousel__header {
  margin-top: .15rem;
  border-bottom: solid #e5e5e5 1px;
}

.nav-game {
  &__left,
  &__right {
    align-items: center;
  }
  &__left {
    justify-content: flex-start;
    font-size: $font-size-lg;
  }
  &__right {
    justify-content: flex-end; // margin-right: .15rem;
    &__link {
      align-items: center;
      color: #a5a5a5;
      font-size: $font-size-sm;
    }
    &__icon {
      justify-content: flex-end;
      width: .15rem;
    }
  }
}

.taoyou-h5-game-show {
  display: flex;
  .list__item__img {
    margin-top: .04rem;
  }
  .list__item__content {
    margin-left: 0;
    /*margin-right: .15rem;*/
    flex: 1;
  }
}






/* fix 轮播图的指示点 */

.swipe-indicator.active {
  background-color: red;
}



.list__swiper {
  padding-top: .15rem;
  padding-bottom: .15rem;
  padding-left: .15rem;
  background: white;
}

.swiper-container__game-icon {
  overflow: hidden;
}

.active {
  margin-left: 0.075rem;
}

.swiper-container__game-icon .swiper-slide {
  width: .79rem!important;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: .10rem;
  text-align: center;
  font-size: .12rem;
  color: #333;
}

.game-name,
.game-count {
  max-width: 100%;
}

.img-wrapper {
  position: relative;
  width: .64rem;
  height: .64rem;
  margin-bottom: .05rem;
  overflow: hidden;
  border-radius: .10rem;
}

.swiper-slide__img-h5 {
  position: absolute;
  top: 0;
  left: 0;
  width: 48%;
}


.tab {
  display: flex;
  justify-content: space-around;
  background: white;
  padding: .15rem 0;
  &__con {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .icon-welfare {
      color: #ffbd37;
      font-size: .27rem;
    }
    .icon-shop {
      color: #ff9220;
      font-size: .27rem;
    }
    .icon-original {
      color: #0cc8ba;
      font-size: .27rem;
    }
    span {
      text-align: center;
      padding-bottom: 0.05rem;
      font-size: .26rem;
    }
  }
  &__text {
    font-size: .13rem;
    color: #333333;
    height: .13rem;
    text-align: center;
  }
}


.gift {
  margin-left: .15rem;
  height: .77rem;
  background-color: #fff;
  display: flex;
  &:not(:last-child) {
    border-bottom: 1px solid #e5e5e5;
  }
  &__img {
    display: block;
    width: .42rem;
    height: .42rem;
    margin-top: .1rem;
    border-radius: .06rem;
  }
  &__intro {
    flex: 1;
    margin-top: .1rem;
    margin-left: .1rem;
  }
  &__name {
    width: 2rem;
    height: .16rem;
    line-height: .16rem;
    font-size: .16rem;
    color: #333333;
  }
  &__type,
  &__platform {
    width: 2.02rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: .07rem;
    height: .14rem;
    line-height: .14rem;
    font-size: .14rem;
    color: #a5a5a5;
  }
  &__progress {
    position: relative;
    width: .39rem;
    height: .39rem;
    margin-top: .15rem;
    margin-right: .15rem;
  }
  &__progress-text {
    position: absolute;
    font-size: .11rem;
    color: #00c1b3;
    width: .24rem;
    height: .12rem;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    line-height: .12rem;

    &--disabled {
      color: #ccc;
    }
  }
}

.header1 {
  background: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
}

.outer {
  background: #ffffff;
  margin-bottom: .15rem;
}
</style>
