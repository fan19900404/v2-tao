<template>
  <div class="swiper-container__game-detail">
    <div class="swiper-wrapper">
      <div v-for="v in swipeData" class="swiper-slide">
          <img class="swiper-slide__game-detail-img" :src="v" alt="">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
  // 使用swiper
  import 'swiper/dist/css/swiper.min.css';
  import Swiper from 'swiper';
  export default {
    props: {
      swipeData: {
        type: Array
      }
    },
    components: {
      Swiper
    },
    mounted() {

    },
    watch: {
        swipeData() {
          //let html = document.getElementsByTagName('html')[0];
          //let style = window.getComputedStyle(html, null);
          //let currentFontSize = parseInt(style.fontSize)/5;
          let mySwiper = new Swiper('.swiper-container__game-detail', {
          direction: 'horizontal',
          loop: false,
          slidesPerView: 1.8,
          spaceBetween: 10,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0
          });
          console.log(mySwiper);
        }
    }
  };
</script>
