<style>
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
  .mallfail {
    padding:1rem 0;
    line-height:2rem;
    color:red;
  }
</style>

<template>
	<app-header :title="'支付成功'"></app-header>
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
				<p class="t" v-if = "orderPayInfo.payStatus == 99">购买失败</p>
        <p v-else class="t">支付失败</p>
			</template>
		</template>
		<p class="order-name">{{orderPayInfo.orderName}}</p>
    <p class="mallfail" v-show = "orderPayInfo.payStatus == 99">抱歉，您购买的商品人次不足。已将购买失败的{{orderPayInfo.number}}淘币退还到您的账户中。如有疑问请联系客服QQ:3058308211。</p>
		<!--<a class="go-check" href="{{orderPayInfo.backUrl}}">去查看</a>-->
    <a class="go-check" v-link="{name: 'personal'}">去查看</a>

    <app-bottom-bar></app-bottom-bar>
	</section>
</template>

<script>
	import Vue from 'vue';
	import AppHeader from '../../components/common/header/app-header';
  import AppBottomBar from '../../components/common/footer/app-bottom-bar';
  export default {
		components: {
			AppHeader,
      AppBottomBar
		},
		data() {
			return {
				orderPayInfo:{
					payStatus : -1
				}
			}
		},
		mounted(){
			this.getOrderPayInfo();
		},
		methods: {
			//获取订单支付信息
			getOrderPayInfo(){
				var _this = this;
				Vue.OneMallHttp(this).GET({orderID:_this.$route.params.id},Vue.OneMallUrl.order_pay_info).then(function(data){
					if(data.code == 10000){
						_this.orderPayInfo = data.result;
					}
				});
			}
		}
	}
</script>
