<style lang="scss" scoped>
.tips {
  padding: 0 1.6rem;
  text-align: center;
}

.tips .t {
  font-size: 1.8rem;
  color: #000;
  line-height: 3rem;
}

.tips .order-name {
  font-size: 1.8rem;
  color: #898989;
  margin: 0 0 3rem 0;
}

.tips .go-check {
  display: block;
  height: 4.3rem;
  color: #fff;
  text-align: center;
  line-height: 4.3rem;
  font-size: 1.6rem;
  background-color: #ff4a4a;
  border-radius: .5rem;
}

.success {
  display: block;
  font-size: 6rem;
  color: #2dcb74;
  line-height: 10rem;
}

.error {
  display: block;
  font-size: 6rem;
  color: #ffa216;
  line-height: 10rem;
}

.loading {
  width: 5rem;
  height: 5rem;
  margin: 40px 0 0 0;
}

.pay-callback {
  margin: 0 1.6rem;
}

.pay-icon {
  text-align: center;
}

.icon-pay-success {
  display: inline-block;
  font-size: 6rem;
  color: #2dcb74;
  line-height: 12rem;
}

.icon-pay-fail {
  display: inline-block;
  font-size: 6rem;
  color: #ff4a4a;
  line-height: 12rem;
}

.pay-status-info {
  text-align: center;
  font-size: 1.8rem;
  line-height: 3rem;
}

.pay-goods-name {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 3rem;
  color: #898989;
}

.go-see {
  width: 100%;
  display: block;
  height: 4.3rem;
  color: #fff;
  text-align: center;
  line-height: 4.3rem;
  font-size: 1.6rem;
  background-color: #ff4a4a;
  border-radius: .5rem;
  /*@include border-radius(10px);*/
}
</style>

<template>
  <div>
    <app-header :title="'支付状态'"></app-header>
    <!-- 支付成功 -->
    <div class="pay-callback">
      <div class="pay-icon">
        <i v-show="1 === +$route.query.status" class="icon-pay-success"></i>
        <i v-show="0 === +$route.query.status" class="icon-pay-fail"></i>
      </div>
      <p v-show="1 === +$route.query.status" class="pay-status-info">支付成功</p>
      <p v-show="0 === +$route.query.status" class="pay-status-info">支付失败</p>
      <p class="pay-goods-name"></p>
      <a v-link="{name: 'personal'}" class="go-see">去查看</a>
    </div>
    <!-- 支付失败 -->
    <app-footer></app-footer>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import $ from 'jquery';
import AppHeader from '../../oldComponents/common-layout/header.component';
import AppFooter from '../../oldComponents/common-layout/footer.component';

// import { user } from '../../vuex/getters';
// import { getUserInfo, updateUserInfo } from '../../vuex/actions';

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      order: {},
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  mounted() {
    $('body').css({ 'background-color': '#ffffff' });

    this.getUserInfo(() => {
      const count = parseInt(this.$route.query.taoBi);
      if (!isNaN(count)) {
        this.updateUserInfo({ taoBi: parseInt(this.user.taoBi) + count });
      }
    });
  },
  methods: {
    ...mapActions(['getUserInfo', 'updateUserInfo']),
    // 获取订单信息
    getOrderInfo() {
      const query = {

      };
      Vue.ClientHttp().GET(query, Vue.ClientUrl.pay_callback)
        .then((res) => {
          if (res.code === 10000) {
            this.order = res.result;
          } else {
            // TODO
          }
        });
    },
  },
};
</script>
