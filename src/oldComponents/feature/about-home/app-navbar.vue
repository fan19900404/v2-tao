<style scoped>
  .g-nav {
    background-color: #fff;
    padding: 1rem 0;
  }

  .g-nav .item {
    width: 25%;
    display: block;
    float: left;
  }

  .icon {
    width: 2.3rem;
    height: 2.3rem;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    display: block;
    position: relative;
  }

  .icon-cz {
    background-image: url(/oldStatic/images/nav-cz.png);
  }

  .icon-to20 {
    background-image: url(/oldStatic/images/nav-1to20.png);
  }

  .icon-zxjx {
    background-image: url(/oldStatic/images/index/jiexiao.png);
  }

  .icon-bzzx {
    background-image: url(/oldStatic/images/nav-help.png);
  }

  .g-nav .text {
    margin-top: 1rem;
    font-size: 1.2rem;
    font-weight: 500;
    color: #000;
    line-height: 1.2rem;
  }
  .icon-container {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
  }
  .bg-c-cz {
    background: linear-gradient(top, #feaf4c, #fc981a);
    background: -webkit-linear-gradient(top, #feaf4c, #fc981a);
  }
  .bg-c-1to20 {
    background: linear-gradient(top, #ff8181, #ff5959);
    background: -webkit-linear-gradient(top, #ff8181, #ff5959);
  }
  .bg-c-jx {
    background: linear-gradient(top, #84d9fe, #5bc2ef);
    background: -webkit-linear-gradient(top, #84d9fe, #5bc2ef);
  }
  .bg-c-help {
    background: linear-gradient(top, #b4adfc, #9a92fc);
    background: -webkit-linear-gradient(top, #b4adfc, #9a92fc);
  }
  /* 10.8 update */
  .hot{
    position: absolute;
    top: -.5rem;
    right: -2rem;
    width: 2rem;
    height: 1.1rem;
    background-image: url('/oldStatic/images/index/hot.png');
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .rob {
    position: absolute;
    top: -.5rem;
    right: -2rem;
    width: 1.8rem;
    height: 1.1rem;
    background-image: url('/oldStatic/images/index/rob.png');
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
</style>

<template>
  <section class="g-nav bb clearfix">
    <!-- 判断物品所属区域 -->
    <a class="item center" v-link="{name:'goods-detail', params: {id: ott.numberID}}">
      <div class="icon-container dr-flex bg-c-1to20">
        <div class="icon icon-to20">
          <span class="rob"></span>
        </div>
      </div>
      <h3 class="text">1元变30</h3>
    </a>
    <!-- end -->
    <a class="item center" href="/#/publish">
      <div class="icon-container dr-flex bg-c-jx">
        <div class="icon icon-zxjx"></div>
      </div>
      <h3 class="text">最新揭晓</h3>
    </a>
    <a class="item center"  v-link="{name: 'shaidanshare'}">
      <div class="icon-container dr-flex bg-c-help">
        <div class="icon icon-bzzx"></div>
      </div>
      <h3 class="text">晒单</h3>
    </a>
    <a class="item center" v-link="{name: 'pay-recharge'}">
      <div class="icon-container dr-flex bg-c-cz">
        <div class="icon icon-cz">
          <span class="hot"></span>
        </div>
      </div>
      <h3 class="text">充值</h3>
    </a>
  </section>
</template>

<script>
  import Vue from 'vue';
  export default {
    data() {
      return {
        ott: {}
      }
    },
    mounted() {
      var that = this;
      var query = {
        goodsID: 200,
        type: 2
      };
      Vue.OneMallHttp().GET(query, Vue.OneMallUrl.one_to_twenty)
        .then(function(res) {
          if (10000 === res.code) {
            that.ott = res.result;
          }
          // 处理异常的请求
          else {
            //  TODO
          }
        })
    }
  }
</script>
