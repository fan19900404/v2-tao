<template>
  <div :style="style">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="(v,index) in swipeData" class="swiper-slide"  @click.prevent="startGame(v)" :key="index">
          <img class="swiper-slide__game-detail-img" :src="v.gameUrl" alt="" >
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<style lang="scss">
  @import "/static/css/swiper.min.css";
  .swiper-container {
    margin: 0 30px;
  }

  .swiper-container-horizontal .swiper-pagination-bullets {
   bottom: 5px;
  }

  .swiper-pagination .swiper-pagination-bullet {
    background-color: #ffffff;
    margin-bottom: 16px;
    width: 16px;
    height: 16px;
    opacity: .5;
  }

  .swiper-pagination .swiper-pagination-bullet-active {
    background-color: #ffffff;
    margin-bottom: 16px;
    width: 16px;
    height: 16px;
    opacity: 1;
  }

  .swiper-container .swiper-pagination {
    opacity: 1;
    -webkit-transition: opacity 0.1s;
    transition: opacity 0.1s;
  }
</style>
<script>
  // 水平轮播图，使用swiper,适用于首页，游戏中心等
  // 根据参数
  // swipeData 轮播列表
  import Swiper from 'swiper';

  export default {
    data() {
      return {
        mySwiper: null,
      };
    },
    props: {
      swipeData: {
        type: Array,
        default: function swipeData() {
          return [];
        },
      },
    },
    computed: {
      style() {
        return { background: '#fff' };
      },
    },
    components: {
      Swiper,
    },
    watch: {
      swipeData() {
        setTimeout(() => {
          this.mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            pagination: '.swiper-pagination',
            autoplay: 3500,
            autoplayDisableOnInteraction: false,
          });
        }, 100);
      },
    },
    methods: {
      startGame(v) {
        this.$emit('swiper-go-game', v);
      },
    },
  };
</script>
