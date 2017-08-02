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
    font-size:2rem;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    display: block;
    position: relative;
    color: #fff;
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
    background: linear-gradient(top, #5dd396, #5dd396);
    background: -webkit-linear-gradient(top, #5dd396, #5dd396);
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
    background: linear-gradient(top, #ffad1e, #ffad1e);
    background: -webkit-linear-gradient(top, #ffad1e, #ffad1e);
  }
</style>

<template>
  <section class="g-nav bb clearfix">
    <!-- 判断物品所属区域 -->
    <a class="item center" v-link="{name:'PersonalFullStatus',params:{index:1}}">
      <div class="icon-container dr-flex bg-c-1to20">
        <div class="icon  icon-1">
        </div>
      </div>
      <h3 class="text">进行中</h3>
    </a>
    <!-- end -->
    <a class="item center"  v-link="{name:'PersonalFullStatus',params:{index:2}}">
      <div class="icon-container dr-flex bg-c-jx">
        <div class="icon  icon-2"></div>
      </div>
      <h3 class="text">已揭晓</h3>
    </a>
    <a class="item center"   v-link="{name:'PersonalFullStatus',params:{index:3}}">
      <div class="icon-container dr-flex bg-c-help">
        <div class="icon  icon-3"></div>
      </div>
      <h3 class="text">幸运记录</h3>
    </a>
    <a class="item center"  v-link="{name:'PersonalFullStatus',params:{index:0}}">
      <div class="icon-container dr-flex bg-c-cz">
        <div class="icon  icon-4">
        </div>
      </div>
      <h3 class="text">参与记录</h3>
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
