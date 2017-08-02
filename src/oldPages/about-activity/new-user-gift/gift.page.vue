<style scoped>
	.top-bg {
		position: relative;
	}

	.top-bg .cd-tips {
		width: 21.8rem;
		height: 2.2rem;
		text-align: center;
		line-height: 2.2rem;
		font-size: 1rem;
		color: #fff600;
		position: absolute;
		bottom: 15px;
		left: 50%;
		margin: 0 0 0 -10.2rem;
	}

	.gift-box {
	}

	.gift-box ul li {
		position: relative;
		margin-bottom: 1.5rem;
	}

	.gift-box ul li > img {
		display: block;
		width: 90%;
		margin: 0 auto;
	}

	.gift-box ul li .buy-btn {
		display: block;
		width: 9.1rem;
		height: 4.2rem;
		position: absolute;
		bottom: 1.4rem;
		left: 50%;
		margin: 0 0 0 -5rem;
	}

	.gift-box ul li .buy-btn.btn1 {
		background: url(/static/images/newbgift/buy_btn5.png) no-repeat center center;
		background-size: cover;
	}

	.gift-box ul li .buy-btn.btn2 {
		background: url(/static/images/newbgift/buy_btn10.png) no-repeat center center;
		background-size: cover;
	}

	.gift-box ul li .buy-btn.btn3 {
		background: url(/static/images/newbgift/buy_btn20.png) no-repeat center center;
		background-size: cover;
	}

	.gift-box ul li .buy-btn.no-btn {
		background: url(/static/images/newbgift/no_buy_btn.png) no-repeat center center;
		background-size: cover;
		font-size: 1.2rem;
		color: #979797;
		text-align: center;
		line-height: 3.8rem;
	}

	.rule-box {
		width: 90%;
		height: 17.5rem;
		margin: 0 auto;
		border-top: 4px solid #b47816;
		position: relative;
	}

	.rule-box .rule-content {
		padding: 2rem 0 0 2.5rem;
	}

	.rule-box .title {
		display: block;
		width: 7.9rem;
		text-align: center;
		line-height: 1.8rem;
		font-size: 1.5rem;
		color: #824d14;
		background-color: #ffb818;
		position: absolute;
		top: -0.9rem;
		left: 50%;
		margin: 0 0 0 -4rem;
	}

	.rule-box .rule-content li {
		font-size: 1.2rem;
		color: #824d14;
		line-height: 2.8rem;
	}
</style>
<template>
	<app-header :title="'新人享壕礼'"></app-header>
	<div class="top-bg">
		<img src="/static/images/newbgift/bg.jpg">
		<p class="cd-tips">
			壕礼将于<span class="hour">{{hour}}</span>小时<span class="min">{{minute}}</span>分<span class="second">{{second}}</span>秒后消失
		</p>
	</div>
	<div class="gift-box">
		<ul>
			<li v-for="item in giftList">
				<img src="/static/images/newbgift/gift_bg{{item.id}}.png">
				<a href="javascript:void(0)" class="buy-btn btn{{item.id}}" data-id="item.id" v-if="item.isShow==0" @click="giftBuy(item.id)"></a>
				<template v-else>
					<a href="javascript:void(0)" class="buy-btn no-btn" v-if="item.isShow==1">已购买</a>
					<a href="javascript:void(0)" class="buy-btn no-btn" v-else>已下线</a>
				</template>
			</li>
		</ul>
	</div>
	<div class="rule-box">
		<span class="title">规则说明</span>
		<ul class="rule-content">
			<li>
				1.新用户可在账号注册内24小时之内购买礼包；
			</li>
			<li>
				2.每种礼包仅限购买一次；
			</li>
			<li>
				3.夺宝券可用于夺宝时的支付抵扣；
			</li>
			<li>
				4.夺宝券将发至个人中心，请注意查收；
			</li>
			<li>
				5.本活动最终解释权归淘游夺宝所有；
			</li>
		</ul>
	</div>

  <!-- 返回首页 -->
  <go-back :path="'/'"></go-back>
</template>

<script>
	import Vue from 'vue';
	import AppHeader from '../../../oldComponents/common/header/app-header';
  import GoBack from '../../../oldComponents/feature/common/goback.component';
	export default {
		components: {
			AppHeader,
      GoBack
		},
		data() {
			return {
				hour:"00",
				minute:"00",
				second:"00",
				endtime:0,
				giftList:[]
			}
		},
		mounted() {
			$("body").css("background-color","#ffb818");
			this.getData();
		},
		methods: {
			getData() {
				var _this = this;
				Vue.OneMallHttp(this).GET({},Vue.OneMallUrl.newb_gift_index).then(function(data){
					if(data.code == 10000){
						_this.giftList = data.list;
						_this.endtime = data.countDown;
					}
				});
				_this.countDown();
			},
			countDown() {
				var _this = this;

				var t = setInterval(function() {
					if(_this.endtime > 0){
						var h = Math.floor((_this.endtime%86400)/3600);
						var m = Math.floor((_this.endtime%3600)/60);
						var s = Math.floor(_this.endtime%60);
						if(h < 10){ h = '0'+h }
						if(m < 10){ m = '0'+m }
						if(s < 10){ s = '0'+s }
						_this.hour = h;
						_this.minute = m;
						_this.second = s;
						--_this.endtime;
					}else{
						clearInterval(t);
						_this.status = [2,2,2];
					}
				},1000)
			},
			giftBuy(id) {
				console.log(id);
				var _this = this;
				Vue.OneMallHttp(this).GET({id:id},Vue.OneMallUrl.newb_gift_buy).then(function(data){
					console.log(data);
					if(data.code == 10000){
						if(data.url){
							window.location.href = data.url;
						}
					}else{
						mallUtils.layer.alert(data.msg);
					}
				})
			}
		},
		destroyed(){
    		$("body").css({"background-color":"#fff"});
    	}
	}
</script>
