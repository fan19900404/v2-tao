<template>
  <div class="home-first-box">
    <div class="home-search">
      <linkSearch :text="searchText"></linkSearch>
    </div>
    <div class="home-swiper-container">
      <tmHorizontalSwiper :swipe-data="swipeData" @swiper-go-game="gotoBanner"></tmHorizontalSwiper>
    </div>
    <div class="home-tab">
      <div class="home-tab__icon" @click="link({name:'TaoYouPersonalCenterTaodouMatch'})">
        <i class="icon-welfare"></i>
        <div class="home-tab__text">福利</div>
      </div>
      <div class="home-tab__icon" @click="link({name:'TaoYouWelfareShopWelfare'})">
        <i class="icon-shop"></i>
        <div class="home-tab__text">商城</div>
      </div>
      <div class="home-tab__icon" @click="link({name:'TaoYouOriginalNews'})">
        <i class="icon-original"></i>
        <div class="home-tab__text">原创</div>
      </div>
    </div>
  </div>
</template>
<script>
import linkSearch from '../../components/linkSearch/linkSearch';
import tmHorizontalSwiper from '../../../components/horizontalSwiper/horizontalSwiper';
import { getSwiperList } from '../../../api/home';

export default {
  components: {
    linkSearch,
    tmHorizontalSwiper,
  },
  data() {
    return {
      /** 搜索的提示文案 */ // TODO 理论上，这里应该由后端提供
      searchText: '天龙八部',
      swipeData: [],
    };
  },
  methods: {
    /**
     * 跳转到路径
     *
     * @param {any} url 这是路径跳转对象
     * @returns {void}
     */
    link(url) { // TODO 福利、商城、原创  跳转地址未定
      this.$router.push(url);
    },
    /**
     * 跳转到相应广告处
     *
     * @param {ang} v banner自带的数据
     * @property {string} v.gameUrl banner的图片地址
     * @property {string} v.url 跳转的完整链接
     * @returns {void}
     */
    gotoBanner(v) {
      console.log(v);
      // TODO 此处跳转方式不明，到时候问叶鑫
    },
  },
  mounted() {
    // 请求banner轮播图，并且显示
    getSwiperList(1).then((res) => {
      if (Number(res.data.code) === 10000) {
        this.swipeData = res.data.result.map((v) => {
          const val = { ...v, gameUrl: v.imgUrl };
          return val;
        });
      }
    });
  },
};
</script>
<style lang="scss" scoped>
.home-first-box {
  background: #fff;
  overflow: hidden;
}

.home-search {
  padding: 15px 30px 20px;
}

.home-swiper-container {
  margin: 20px 0 30px;
  min-height: 334px;
}

.home-tab {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 40px 30px 30px;
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

.home-tab__icon .icon-welfare,
.home-tab__icon .icon-welfare:before {
  color: #FFBD37;
}

.home-tab__icon .icon-shop,
.home-tab__icon .icon-shop:before {
  color: #FF9220;
}

.home-tab__icon .icon-original,
.home-tab__icon .icon-original:before {
  color: #00C1B3;
}
</style>
