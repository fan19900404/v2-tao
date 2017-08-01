<style scoped>
  .flex-center {
    display:box;
    display:-webkit-box;
    display: flex;
    display: -webkit-flex;

    align-items: center;
    justify-content: center;
  }

  .payreturn-info {
    padding: 0 3rem;
  }

  .payreturn-info .load {
    font-size: 2rem;
    text-align: center;
    line-height: 4rem;
  }

  .payreturn-info .s-tips {
    font-size: 2.3rem;
    color: #e94d39;
    text-align: center;
    font-weight: bold;
  }

  .payreturn-info .gift-tips {
    font-size: 1.2rem;
    color: #7d291e;
    text-align: center;
    line-height: 1.7rem;
    margin: 1.5rem 0;
  }

  .payreturn-info  .ps-tips {
    font-size: 1rem;
    color: #7d291e;
    text-align: center;
    line-height: 1.7rem;
  }

  .btn-box {
    margin: 1.5rem 0 0 0;
  }

  .btn-box .btn {
    display: block;
    width: 9.2rem;
    height: 4.6rem;
    margin: 0 1rem;
  }

  .btn-box .btn.continue {
    background: url(/static/images/newbgift/payreturn_btn1.png) no-repeat center center;
    background-size: cover;
  }

  .btn-box .btn.snatch {
    background: url(/static/images/newbgift/payreturn_btn2.png) no-repeat center center;
    background-size: cover;
  }
</style>

<template>
  <app-header :title="'购买壕礼'"></app-header>
  <div class="top-bg">
    <img src="/static/images/newbgift/payreturn_bg.jpg">
  </div>
  <div class="payreturn-info">
    <template v-if="payStatus==0">
      <p class="load">支付请求中。。。</p>
    </template>
    <template v-else>
      <template v-if="payStatus==1">
        <p class="s-tips">恭喜您！<br/>{{giftName}}购买成功！</p>
        <p class="gift-tips">{{giftInfo}}<br/>请在个人中心的淘豆界面点击“查看夺宝券”</p>
        <p class="ps-tips">
          ps：后续奖励会在每天凌晨由系统直接发到您的账户中如有疑问请联系客服。
        </p>
      </template>
      <template v-else>
        <p class="gift-tips">尊敬的用户，很抱歉，购买失败！<br/>请尝试重新支付一次，如有疑问请联系客服！</p>
      </template>
    </template>
    <div class="btn-box flex-center">
      <a class="btn continue" v-link="'/newbgift'"></a>
      <a class="btn snatch" v-link="'/'"></a>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import AppHeader from '../../../components/common/header/app-header';
  export default {
    components: {
      AppHeader
    },
    data() {
      return {
        payStatus:0,
        giftName:"",
        giftInfo:""
      }
    },
    mounted() {
      $("body").css("background-color","#ffb818");
      this.getGiftPayInfo();
    },
    methods: {
      //获取礼包购买情况
      getGiftPayInfo(){
        var _this = this;
        Vue.OneMallHttp(this).GET({id:_this.$route.params.id},Vue.OneMallUrl.newb_gift_check).then(function(data){
          if(data.code == 10000){
            _this.payStatus = 1;
            _this.giftName = data.name,
            _this.giftInfo = data.desc;
          }else{
            _this.payStatus = 2
          }
        })
      }
    },
    destroyed(){
        $("body").css({"background-color":"#fff"});
      }
  }
</script>
