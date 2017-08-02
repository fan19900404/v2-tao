<template>
  <div>
    <div style="font-size:24px;padding:10px 0">首页以及游戏中心轮播</div>
    <horizontal-swiper :swipe-data="swipeData" @swiper-go-game="startGame"></horizontal-swiper>
    <div style="font-size:24px;padding:10px 0">游戏中心推荐游戏轮播图</div>
  </div>
</template>
<style lang="scss" scoped>

</style>
<script>
  import horizontalSwiper from '../../components/horizontalSwiper/horizontalSwiper';

  export default {
    data() {
      return {
        swipeData: [],
      };
    },
    components: {
      horizontalSwiper,
    },
    methods: {
      startGame(v) {
        console.log(v);
      },
    },
    mounted() {
      this.swipeData = [
        { gameUrl: 'http://image.lly800.com/goods/20170707/1499426416384724.jpg' },
        { gameUrl: 'http://image.lly800.com/goods/20170703/1499076410587908.jpg' }];
    },
  };
</script>
