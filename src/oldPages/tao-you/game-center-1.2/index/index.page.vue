<template>
<div>
  <!--顶部-->
  <header-component :title="title"></header-component>
  <!--搜索模块-->
  <search @game-center-search="search"></search>
  <!--轮播-->
  <div class="top_slide">
    <div class="swiper-container">
      <div class="swiper-wrapper JS-statistics-swipe-wrapper">
        <div v-for="item in swiperList" class="swiper-slide JS-statistics-swipe">
          <a @click="linkToTarget(item.url,item.name)" class="JS-statistics-swipe-link">
            <img class="swiper-slide__img" :src="item.imgUrl" alt="" style="padding:0">
          </a>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
  <!--选项卡-->
  <tab></tab>
  <!--大家都在玩、分三种状态-->
  <div class="title">
    <span class="title__left" v-if="dataListLogin.length>0">我的游戏</span>
    <span class="title__left" v-else>大家都在玩</span>
  </div>
  <!--未登录显示-->
  <div class="list" v-show="isLogin">
    <div class="list__container">
      <div v-for="item in dataList.slice(0,3)" class="list__context">
        <div class="list__img" @click="open(item.field,item.id,item.gameUrl,item.name,item.direction)">
          <img src="/static/images/tao-you/home/h5.png" id="bg" v-show="1==item.field ">
          <img :src="item.gameIcon">
        </div>
        <span class="list__text">{{item.name.slice(0,4)}}</span>
      </div>
    </div>
    <div class="list__button">
      <div class="list__button--text" @click="button">登录</div>
      <span class="list__button--prize">奖励
        <i>{{taoDou}}</i>淘豆</span>
    </div>
  </div>
  <!--登录玩过-->
  <div class="no" v-show="dataListLogin.length>0">
    <div class="no__container" :class="{'space-between': dataListLogin.slice(0,4).length == 4}">
      <div v-for="(item,index) in dataListLogin.slice(0,4)" class="no__context" :class="{'align-center': dataListLogin.slice(0,4).length == 4}" :key="index">
        <div class="no__img" @click="open(item.field,item.gameID,item.gameUrl,item.gameName,item.direction)">
          <img src="/static/images/tao-you/home/h5.png" id="bg" v-show="1==item.field">
          <img :src="item.imgUrl">
        </div>
        <span style="padding-bottom:.1rem" class="no__text">{{item.gameName.slice(0,4)}}</span>
      </div>
    </div>
    <div class="no__icon" @click="link({name:'TaoYouPersonalCenterMyPage'})">
      <span class="icon-arrow-right"></span>
    </div>
  </div>
  <!--登录未玩过，使用swiper-->
  <div class="list__swiper" v-show="dataListLogin.length==0 && !isLogin">
    <div class="swiper-container__game-icon">
      <div class="swiper-wrapper">
        <div v-for="(v,index) in images" class="swiper-slide" @click="link({name:'TaoYouGameCenterGameDetails',params:{id:v.gameID}})" :key="index">
          <a href="">
            <div class="icon-container">
              <div class="swiper-slide__img">
                <img src="/static/images/tao-you/home/h5.png" id="bg" v-show="1==v.field">
                <img :src="v.gameIcon" alt="">
              </div>
            </div>
            <div class="game-name-container">
              {{v.name.slice(0,4)}}
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  <!--首发推荐模块-->
  <first-recommendation></first-recommendation>
  <!--底部菜单栏-->
  <footer-component :menu-id="menuId"></footer-component>

  <!-- 返回顶部 -->
  <back-top></back-top>
  <!---一个按钮弹窗-->
  <app-dialog :show="isShow" :btn-text="'知道了'" :title="'登陆成功'" :context="dialogContext"></app-dialog>
</div>
</template>
<style lang="scss" scoped>
@import "../../../../assets/tao-you/common.scss";
.top_slide {
  background-color: #FFFFFF;
  overflow: hidden;
  /*height: 1.4rem;*/
  padding: 0 .15rem;
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
}

.list {
  display: flex;
  padding: 0 0.15rem;
  background: #ffffff;
  justify-content: space-between;
  &__container {
    flex: 1;
    display: flex;
    justify-content: space-between;
  }
  &__context {
    display: flex;
    width: .54rem;
    flex-flow: column nowrap;
    position: relative;
  }
  &__img {
    height: .55rem;
    width: .54rem;
    padding: 0.15rem 0 0.09rem 0;
    img {
      width: 100%;
      height: 100%;
      border-radius: .1rem;
    }
  }
  &__text {
    font-size: .12rem;
    color: #333333;
    text-align: center;
  }
  &__button {
    width: .98rem;
  }
  &__icon {
    width: .29rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  &__button--text {
    width: 0.47rem;
    height: 0.26rem;
    box-sizing: border-box;
    line-height: 0.26rem;
    text-align: center;
    border: 1px solid #E5E5E5;
    font-size: .13rem;
    color: #333333;
    border-radius: 0.04rem;
    margin-top: 0.29rem;
    float: right;
  }
  &__button--prize {
    display: inline-block;
    width: 100%;
    height: .12rem;
    font-size: .12rem;
    float: right;
    text-align: right;
    padding-top: 0.05rem;
    padding-bottom: .36rem;
    color: #333333;
    i {
      color: #ff4a4a;
    }
  }
}

.no {
  display: flex;
  padding: 0 0.15rem;
  background: #ffffff;
  justify-content: space-between;
  &__container {
    flex: 1;
    display: flex;
  }
  &__context:last-child {
    margin-right: 0;
  }
  &__context {
    display: flex;
    width: .54rem;
    flex-flow: column nowrap;
    position: relative;
    margin-right: .15rem;
  }
  &__img {
    height: .55rem;
    width: .54rem;
    padding: 0.15rem 0 0.09rem 0;
    img {
      width: 100%;
      height: 100%;
      border-radius: .1rem;
    }
  }
  &__text {
    font-size: .12rem;
    color: #333333;
    text-align: center;
  }
  &__button {
    width: .98rem;
  }
  &__icon {
    width: .29rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  &__button--text {
    width: 0.47rem;
    height: 0.26rem;
    box-sizing: border-box;
    line-height: 0.26rem;
    text-align: center;
    border: 1px solid #E5E5E5;
    font-size: .13rem;
    color: #333333;
    border-radius: 0.04rem;
    margin-top: 0.29rem;
    float: right;
  }
  &__button--prize {
    display: inline-block;
    width: 100%;
    height: .12rem;
    font-size: .12rem;
    float: right;
    text-align: right;
    padding-top: 0.05rem;
    padding-bottom: .36rem;
    color: #333333;
    i {
      color: #ff4a4a;
    }
  }
}

.list__swiper {
  padding-left: .15rem;
  background: white;
}

.swiper-container__game-icon {
  overflow: hidden;
}

.game-name-container {
  text-align: left;
  font-size: .12rem;
  color: #333333;
  padding-bottom: 0.09rem;
}

.swiper-container__game-icon .swiper-slide {
  width: .54rem;
}

.swiper-slide__img {
  padding: .15rem 0 0.09rem 0;
}

.swiper-slide__img img {
  border-radius: .1rem;
  width: .54rem;
  height: .54rem;
}





/**H5游戏添加图标**/

#bg {
  position: absolute;
  width: .27rem;
  height: .27rem;
  border-radius: 0;
}

.space-between {
  justify-content: space-between;
}

.align-center {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
<script>
import Vue from 'vue';
import { Swipe, SwipeItem, InfiniteScroll } from 'mint-ui';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

import AppDialog from '../../../../oldComponents/tao-you/dialog/one-button-link-dialog.component';
import HeaderComponent from '../../../../oldComponents/tao-you/layout/header.component';
import FooterComponent from '../../../../oldComponents/tao-you/layout/footer.component';
// 统计使用
import Statistics from '../../statistics/game-center/index.statistics';

// 选项卡
import Tab from './component/game-center-tab.component';
import Search from './component/game-center-search.component';
// 首发推荐
import FirstRecommendation from './component/game-center-game.component';

// 添加回到顶部
import BackTop from '../../../../oldComponents/tao-you/button/back-top.component';
import { startGame } from '../../../../oldComponents/tao-you/tools/tools';

export default {
  data() {
    return {
      menuId: 1,
      title: '游戏中心',
      // 是否登录
      isLogin: false,
      swiperList: [],
      // 未登录
      dataList: [],
      // 登录玩过游戏
      dataListLogin: [],
      // 登录未玩过游戏
      images: [],
      // 弹窗的控制,弹窗是否显示
      isShow: false,
      // 奖励的内容
      dialogContext: '奖励10000淘豆',
      // 是否显示登录送淘豆活动
      loginActive: true,
      taoDou: null,
    };
  },
  computed: {

  },
  methods: {
    link(url) {
      this.$router.push(url);
    },
    getSwiperList() {
      var _this = this;
      return Vue.ClientHttp().GET({ type: 3, nologin: 1 }, Vue.ClientUrl.game_center_banner)
        .then((res) => {
          if (10000 !== res.code) {
            return;
          }
          let sliderList = res.result;
          sliderList.forEach((item) => {
            if (item.url.indexOf('/banner_game') != -1 || item.url.indexOf('/to_game') != -1) {
              item.url = localStorage.getItem('runningURl') + item.url + '&nologin=1&from=1&mID=' + localStorage.getItem('mID');
            }
          });
          _this.swiperList = sliderList;
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
    // 获取我的游戏数据，三种情况，要判断登录状态
    getMyGame() {
      Vue.ClientHttp().GET({
        page: 1,
        limit: 8,
        nologin: 1,
      }, Vue.ClientUrl.my_game_list)
        .then((res) => {
          if (res.code === 10000) {
            if (res.result.length != 0) {
              this.dataListLogin = res.result;
            } else {
              this.getImages();
            }
          }
        });
    },
    // 获取已登录推荐的游戏images
    getImages() {
      Vue.ClientHttp().GET({
        limit: 8,
        nologin: 1,
      }, Vue.ClientUrl.game_center_user_recommend)
        .then((res) => {
          if (res.code === 10000) {
            this.images = res.result;
            // 初始化轮播
            setTimeout(() => {
              const mySwiper = new Swiper('.swiper-container__game-icon', {
                direction: 'horizontal',
                // spaceBetween: 14,
                slidesPerView: 4.5,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                // width : 54
              });
            }, 50);
          }
        });
    },
    // 获取未登录推荐的游戏dataList
    getDataList() {
      Vue.ClientHttp().GET({
        limit: 3,
        nologin: 1,
      }, Vue.ClientUrl.game_center_user_recommend)
        .then((res) => {
          if (res.code === 10000) {
            this.dataList = res.result;
            // 初始化轮播
            // setTimeout(function(){
            // let mySwiper = new Swiper('.swiper-container__game-icon', {
            // direction: 'horizontal',
            // spaceBetween: 14,
            // slidesPerView: 4.5,
            // slidesOffsetBefore: 0 ,
            // slidesOffsetAfter: 0
            // width : 54
            // });},50);
          }
        });
    },
    search() {
      this.$router.push({
        name: 'TaoYouSearch',
        query: { type: 1 },
      });
    },
    // 判断登录状态
    getLogin() {
      Vue.ClientHttp().GET({}, Vue.ClientUrl.user_info)
        .then((res) => {
          if (res.code === 10000) {
            this.getMyGame();
          } else {
            // 未登录，推荐
            this.isLogin = true;
            // 获取未登录推荐的游戏
            this.getDataList();
          }
        });
    },
    // 判断用户是否登录
    isUserLogin() {
      // 未登录状态下,已登录本模块已不显示，不需要获取赠送数量
      if (+localStorage.getItem('login') === 0) {
        // 未登录，显示提示弹窗
        Vue.ClientHttp().GET({ nologin: 1, id: 8 }, Vue.ClientUrl.get_login_packs)
          .then((res) => {
            this.taoDou = res.result.taoDou;
            // this.loginActive = 2==1?true:false;
          });
      } else {
        //
      }
    },
    // 点击登录按钮
    button() {
      let nextUrl = window.location.hash.slice(1);
      localStorage.setItem('Q_next_url', nextUrl);
      localStorage.setItem('Q_from_url', window.encodeURIComponent(window.location.href));
      this.$router.push({
        name: 'TaoYouUserLogin',
        query: {
          mID: localStorage.getItem('mID') || 8,
        },
        replace: true,
      });
    },
    // 开始游戏
    open(type, gameID, gameUrl, gameName, direction) {
      startGame(this, {
        gameID,
        gameUrl,
        gameName,
        direction,
        type,
      });
    },
    // 处理轮播图的链接问题
    linkToTarget(url, name) {
      // localStorage.setItem('Q_next_url', url);
      // 判断是否含有http(s)
      if (/^http(s*)/.test(url)) {
        if (url.indexOf('/banner_game') != -1 || url.indexOf('/to_game') != -1) {
          let count = url.indexOf('&');
          let url1 = url.slice(0, count);
          let arr = url1.split('=');
          let gameID = arr[1];
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
  },
  components: {
    HeaderComponent,
    FooterComponent,
    Swipe,
    SwipeItem,
    InfiniteScroll,
    Tab,
    Search,
    FirstRecommendation,
    BackTop,
    AppDialog,
  },
  mounted() {
    this.getSwiperList();
    localStorage.setItem('originUrl', location.href);
    // 统计使用
    Statistics(this);
    this.getLogin();
    this.isUserLogin();
  },
};
</script>
