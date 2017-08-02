<template>
  <div>
    <!--头部-->
    <app-header title="游戏中心"></app-header>
    <!--搜索-->
    <div class="search">
      <link-search></link-search>
    </div>
    <!--轮播图-->
    <horizontal-swiper :swipe-data="swipeData" @swiper-go-game="startGame"></horizontal-swiper>
    <!--选项卡-->
    <div class="home-tab">
      <router-link tag="div" class="home-tab__icon" :to="{name: 'gameRank'}">
        <i class="icon-gamelists"></i>
        <div class="home-tab__text">排行</div>
      </router-link>
      <router-link tag="div" class="home-tab__icon" :to="{name: 'openServer'}">
        <i class="icon-new"></i>
        <div class="home-tab__text">开服</div>
      </router-link>
      <router-link tag="div" class="home-tab__icon" :to="{name: 'gamePacks'}">
        <i class="icon-gamegift"></i>
        <div class="home-tab__text">礼包</div>
      </router-link>
    </div>
    <!--大家都在玩 分三种状态-->
    <recommend-game></recommend-game>
    <!--首发推荐-->
    <recommend-first></recommend-first>
    <!--底部菜单栏-->
    <tm-footer selected="game"></tm-footer>
    <!--回到顶部-->
    <backTop></backTop>
  </div>
</template>
<script>
import AppHeader from '../../components/header/header';
import linkSearch from '../../components/linkSearch/linkSearch';
import horizontalSwiper from '../../../components/horizontalSwiper/horizontalSwiper';
import recommendGame from './recommendGame';
import recommendFirst from './recommendFirst';
import tmFooter from '../../components/footer/footer';
import backTop from '../../components/backTop/backTop';
import { getSwiperList } from '../../../api/home';

export default {
  data() {
    return {
      msg: '游戏中心',
      swipeData: [],
    };
  },
  components: {
    AppHeader,
    linkSearch,
    horizontalSwiper,
    recommendGame,
    recommendFirst,
    tmFooter,
    backTop,
  },
  methods: {
    getSwiperlist() {
      getSwiperList().then((res) => {
        if (res.data.code === 10000) {
          res.data.result.forEach((v) => {
            const item = v;
            item.gameUrl = item.imgUrl;
          });
          this.swipeData = res.data.result;
        }
      });
    },
    startGame(v) {
      console.log(v);
    },
  },
  mounted() {
    this.getSwiperlist();
  },
};
</script>
<style lang="scss" scoped>
.search{
  background: #ffffff;
  padding: 20px 30px;
}

.home-tab {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 40px 30px 30px;
  background: #ffffff;
}

.home-tab .home-tab__icon {
  flex-grow: 1;
  flex-shrink: 0;
  text-align: center;
  font-size: 26px;
  color: #333333;
  letter-spacing: -0.63px;
  line-height: 26px;
}

.home-tab .home-tab__icon i {
  display: block;
  font-size: 42px;
  margin-bottom: 10px;
}

.home-tab__icon .icon-gamelists,
.home-tab__icon .icon-gamelists:before {
  color: #00C1B3;
}

.home-tab__icon .icon-new,
.home-tab__icon .icon-new:before {
  color: #B370FF;
  font-size: 42px;
}

.home-tab__icon .icon-gamegift,
.home-tab__icon .icon-gamegift:before {
  color: #FF7272;
}
</style>
