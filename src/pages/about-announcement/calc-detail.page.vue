<style scoped>
	.kj-box {
		border-bottom: 1px solid #dfdfdf;
		margin: 0 0 1rem 0;
		background: #fff;
	}

	.kj-box .kj-guize {
		width: 65%;
		height: 10rem;
		border-right: 1px solid #dfdfdf;
		box-sizing: border-box;
		padding: 1.3rem 0 0 1.5rem;
	}

	h3 .dian {
		display: inline-block;
		width: .4rem;
		height: .4rem;
		background: #ff6709;
		border-radius: .4rem;
		margin: 0 .3rem 0 0;
	}

	h3 {
		font-size: 1.4rem;
		color: #ff6709;
		line-height: 2rem;
	}

	.kj-guize .guize-text {
		color: #898989;
		font-size: 1rem;
		line-height: 1.8rem;
	}

	.kj-guize .guize-link {
		font-size: 1.2rem;
		line-height: 2rem;
		color: #ff6709;
	}

	.kj-box .kj-num {
		width: 34%;
		text-align: center;
		font-size: 1.2rem;
	}

	.kj-box .kj-num .qu-num {
		color: #898989;
	}

	.data-num-box {
		background: #fff;
		border-top: 1px solid #dfdfdf;
		border-bottom: 1px solid #dfdfdf;
		padding: 1rem 1.5rem;
	}

	.data-num-box .data-num-text {
		color: #898989;
		font-size: 1.2rem;
		line-height: 1.7rem;
	}

	.data-num-box .data-num-text .ts {
		font-size: 1rem;
	}

	.data-num-box .data-num-text strong {
		color: #000;
	}

	.data-list {
		background: #fff;
		padding: 1rem 0;
	}

	.data-list .con-left,
	.data-list .title-left {
		display: inline-block;
		width: 65%;
		text-align: center;
		font-size: 1.4rem;
		line-height: 2rem;
	}

	.data-list .con-right,
	.data-list .title-right {
		display: inline-block;
		width: 34%;
		text-align: center;
		font-size: 1.4rem;
		line-height: 2rem;
	}

	.data-list .con-left,
	.data-list .con-right {
		font-size: 1.2rem;
		line-height: 1.7rem;
	}

	.color-red {
		color: #ff6709;
	}

</style>

<template>
	<app-header :title="title"></app-header>
  	<!--<app-detail-slider :auto="auto"></app-detail-slider>-->

	<div class="kj-box flex">
		<div class="kj-guize">
			<h3 class="flex center"><span class="dian"></span>开奖号码</h3>
			<p class="guize-text">=数字A÷商品所需人次(取余) + 10000001</p>
			<p class="guize-text">={{result.take_num1}}÷{{result.take_num2}}(取余) + 10000001</p>
			<a href="#/resultText" class="guize-link">文字描述></a>
		</div>
		<div class="kj-num">={{result.win_num}}
      <!--<br>-->
      <!--<span class="qu-num">({{result.win_qu}}区)</span>-->
    </div>
	</div>
	<div class="data-num-box">
		<h3><span class="dian"></span>数值A</h3>
		<p class="data-num-text">=商品的最后一个号码分配完毕时间点前本站全部商品的最后100个参与时间之和<span class="ts">(包含该商品的最后一人次的参与时间)</span></p>
		<p class="data-num-text">截止该商品的最后参与时间<strong>【{{result.last_time}}】</strong>网站所有商品的最后100条参与时间记录：</p>
	</div>
	<div class="data-list">
		<p clas="title">
			<span class="title-left">参与时间</span>
			<span class="title-right">用户账号</span>
		</p>
		<p clas="con" v-for="item in result.take_list">
			<span class="con-left">{{item.take_time}}<span class="color-red">({{item.deal_time}})</span></span>
			<span class="con-right">{{item.take_name | substr 8 '…'}}</span>
		</p>
	</div>

  <app-bottom-bar></app-bottom-bar>
</template>

<script>
	import AppHeader from '../../components/common/header/app-header';
  import AppBottomBar from '../../components/common/footer/app-bottom-bar';

  export default {
		components: {
			AppHeader,
      AppBottomBar
		},
		data:function(){
			return {
				title:"计算详情",
				type:"account",
				result:{}
			}
		},
		mounted() {
			$("body").css("background","#f8f8f8");

			var _this = this;

			console.log(_this.$route.params);
			Vue.OneMallHttp(this).GET({"numberID": _this.$route.params.goodsNumId},'/Goods/Index/reckon_detail_data_rule').then(function(data){
				_this.result = data.result;
			});
		},
		destroyed() {
			$("body").css("background","#fff");
		}
	}
</script>
