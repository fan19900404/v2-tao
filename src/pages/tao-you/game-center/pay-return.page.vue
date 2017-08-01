<style>
.tips {
  padding: 0 .142rem;
  text-align: center;
}

.tips .t {
  font-size: .16rem;
  color: #000;
  line-height: .266rem;
}

.tips .order-name {
  font-size: .16rem;
  color: #898989;
  margin: 0 0 .266rem 0;
}

.tips .go-check {
  display: block;
  height: .382rem;
  color: #fff;
  text-align: center;
  line-height: .382rem;
  font-size: .142rem;
  background-color: #00c1b3;
  border-radius: .04rem;
}

.success {
  display: block;
  font-size: .53rem;
  color: #2dcb74;
  line-height: .885rem;
}

.error {
  display: block;
  font-size: .53rem;
  color: #ffa216;
  line-height: .885rem;
}

.loading {
  width: .444rem;
  height: .444rem;
  margin: .355rem 0 0 0;
}

.mallfail {
  padding: .088rem 0;
  line-height: .1777rem;
  color: red;
}
</style>

<template>
  <div>
    <app-header :title="支付成功"></app-header>
    <section class="tips">
      <template v-if="orderPayInfo.payStatus == -1">
        <img src="/static/images/loading.gif" class="loading">
        <p class="t">支付请求中</p>
      </template>
      <template v-else>
        <template v-if="orderPayInfo.payStatus == 1 || orderPayInfo.payStatus == 4 || orderPayInfo.payStatus == 5">
          <i class="one-mall-iconfont one-mall-icon-xuanzhong success"></i>
          <p class="t">支付成功</p>
        </template>
        <template v-else>
          <i class="icon-warning error"></i>
          <p class="t" v-if="orderPayInfo.payStatus == 99">购买失败</p>
          <p v-else class="t">支付失败</p>
        </template>
      </template>
      <p class="order-name">{{orderPayInfo.orderName}}</p>
      <!-- <p class="mallfail" v-show = "orderPayInfo.payStatus == 99">抱歉，您购买的商品人次不足。已将购买失败的{{orderPayInfo.number}}淘币退还到您的账户中。如有疑问请联系客服QQ:3058308211。</p> -->
      <a class="go-check" @click="link({name: 'TaoYouPersonalCenterTaoBi'})">去查看</a>
    </section>
  </div>
</template>

<script>
import Vue from 'vue';
import AppHeader from '../../../components/tao-you/layout/header.component';

export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      orderPayInfo: {
        payStatus: -1,
      },
    };
  },
  methods: {
    link(url) {
      this.$router.push(url);
    },
    // 获取订单支付信息
    getOrderPayInfo() {
      let _this = this;
      Vue.OneMallHttp(this).GET({ orderID: _this.$route.params.id }, Vue.OneMallUrl.order_pay_info).then((data) => {
        if (data.code == 10000) {
          _this.orderPayInfo = data.result;
        }
      });
    },
  },
  mounted() {
    this.getOrderPayInfo();
  },
};
</script>
