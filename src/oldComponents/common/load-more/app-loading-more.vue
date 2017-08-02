<template>
  <!-- dreamapple -->
  <div v-touch:swipe="swipeAction"
       v-touch:pan="panAction"
       v-touch-options:pan="panConfig"
       v-touch-options:pinch="pinchConfig"
       v-touch-options:press="pressConfig"
       v-touch-options:rotate="rotateConfig"
       v-touch-options:swipe="swipeConfig"
       v-touch-options:tap="tapConfig"
    class="loading-more-container">
      <!-- content -->
      <slot name="content"></slot>
      <!-- content -->
      <p v-show="(1 === status) && includeLoadingImg" class="loading"></p>
      <p v-show="1 === status" class="loading-more-msg msg">{{loadingMoreMsg || innerLoadingMoreMsg}}</p>
      <p v-show="2 === status" class="no-more msg">{{noMoreMsg || innerNoMoreMsg}}</p>
  </div>
</template>

<style scoped>
.loading {
  background-image: url('/oldStatic/images/loading.gif');
  height: 3rem;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #fff;
}
.msg {
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  background-color: #fff;
  color: #898989;
}
</style>

<script>
  export default {
    props:[
      'noMoreMsg',
      'loadingMoreMsg',
      'includeLoadingImg',
      'panConfig',
      'pinchConfig',
      'pressConfig',
      'rotateConfig',
      'swipeConfig',
      'tapConfig'
    ],
    data() {
      return {
        status: 0,
        innerNoMoreMsg: '没有更多了...',
        innerLoadingMoreMsg: '正在加载更多...'
      }
    },
    methods: {
      swipeAction(e) {
        this.status = 1;
        this.$dispatch('load-more-data', e);
      }
    },
    mounted() {
      this.$on('loaded-more-data', function() {
        this.status = 2;
      })
    }
  }
</script>
