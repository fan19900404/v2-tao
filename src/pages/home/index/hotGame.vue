<template>
  <div class="hot-game-box">
    <homeTitle title="热门游戏" linkTitle="游戏中心" :linkUrl="{name: 'TaoYouGameCenter'}"></homeTitle>
    <div class="swiper-container__game-icon">
      <ul class="swiper-wrapper">
        <li v-for="(v,i) in gameList" class="swiper-slide" @click.stop="beginPlay(v)" :class="{'active':i==0}" :key="i">
          <div class="img-wrapper">
            <img class="swiper-slide__img" :src="v.imgUrl" alt="">
            <img v-if="v.field == 1" class="swiper-slide__img-h5" :src="h5Pic" alt="">
          </div>
          <div class="game-name">{{v.gameName}}</div>
          <div class="game-count">
            <span class="home-people-num">{{ showNum(v.viewNumber) }}</span>人在玩
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper';
import homeTitle from './homeTitle';
import h5Pic from './img/h5.png';
import { getGameList } from '../../../api/home';

export default {
  components: {
    homeTitle,
  },
  data() {
    return {
      h5Pic,
      gameList: [],
      mySwiper: null,
    };
  },
  methods: {
    link(url) {
      this.$router.push(url);
    },
    /**
     * 计算玩家人数，一万以上改为 万
     *
     * @param {number} num 人数
     * @returns {string}
     */
    showNum(num) {
      let n = Number(num);
      if (n > 10000) {
        n = `${(n / 10000).toFixed(2)}万`;
      }
      return n || 0;
    },
    beginPlay(v) {
      console.log(v);
      // TODO 理论上是开始玩游戏了，这里还有业务逻辑，以后处理
    },
  },
  watch: {
    gameList() {
      setTimeout(() => {
        this.mySwiper = new Swiper('.swiper-container__game-icon', {
          direction: 'horizontal',
          // spaceBetween: 25,
          slidesPerView: 'auto',
          // width: 54,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          // width : 54
        });
      }, 50);
    },
  },
  mounted() {
    // 获取列表，并且展示
    getGameList(1).then((res) => {
      if (Number(res.data.code) === 10000) {
        this.gameList = res.data.result || [];
      }
    });
  },
};
</script>
<style lang="scss" scoped>
.hot-game-box {
  background: #fff;
}

.hot-game-box .home-people-num {
  color: #ff4a4a;
}

.hot-game-box .swiper-container__game-icon {
  padding: 30px 0;
  min-height: 206px;
  overflow: hidden;
}

.hot-game-box .active {
  margin-left: 30px;
}

.hot-game-box .swiper-container__game-icon .swiper-slide {
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
  text-align: center;
  font-size: 28px;
  color: #333;
}

.hot-game-box .game-name,
.hot-game-box .game-count {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hot-game-box .game-count {
  font-size: 24px;
}

.hot-game-box .img-wrapper {
  position: relative;
  width: 128px;
  height: 128px;
  margin-bottom: 10px;
  overflow: hidden;
  border-radius: 20px;
}

.hot-game-box .swiper-slide__img-h5 {
  position: absolute;
  top: 0;
  left: 0;
  width: 48%;
}
</style>
