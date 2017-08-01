<style scoped>
	.title {
		height: 4.8rem;
		border-bottom: 1px solid #dfdfdf;
		line-height: 4.8rem;
		text-align: center;
		font-size: 1.6rem;
		background: #f8f8f8;
		margin: 0 0 2rem 0;
	}

	.text-box {
		width: 88%;
		margin: 0 0 2rem 2rem;
		border-left: 1px solid #ff4a4a;
		padding: 0 0 0 1.5rem;
		box-sizing: border-box;
	}

	.text-box .text-list {
		font-size: 1.4rem;
		color: #989898;
		line-height: 2rem;
		margin: 0 0 .5rem 0;
		position: relative;
	}

	.text-list .quan-01 {
		display: block;
		width: 1rem;
		height: 1rem;
		border: 1px solid #ff4a4a;
		background: #fff;
		border-radius: 1rem;
		position: absolute;
		left: -2rem;
	}

	.text-list .quan-02 {
		display: block;
		width: .8rem;
		height: .8rem;
		background: #ff4a4a;
		border-radius: .8rem;
		position: absolute;
		top: .1rem;
		left: .1rem;
	}

	.que-q {
		font-size: 1.4rem;
		line-height: 2rem;
		margin: 0 0 0 2rem;
	}

	.que-con {
		font-size: 1.4rem;
		line-height: 2rem;
		margin: 0 0 0 2rem;
		color: #989898;
	}

</style>

<template>
	<app-header :title="title"></app-header>
  	<!--<app-detail-slider :auto="auto"></app-detail-slider>-->
	<p class="title">幸运号码计算公式</p>
	<div class="text-box">
		<p class="text-list">
		<span class="quan-01"><s class="quan-02"></s></span>奖品的最后一个号码认购完毕后，将公示该认购时间点前本站全部商品的最后100个记录的参与时间（包括该商品最后一个参与时间;</p>
		<p class="text-list"><span class="quan-01"><s class="quan-02"></s></span>将这100个记录的参与时间按照时、分、秒、毫秒组合，然后相加，得到数值A(如19:23:54.124则是192354124);</p>
		<p class="text-list"><span class="quan-01"><s class="quan-02"></s></span>数值A除以商品总需人次数，得到一个余数，用这个余数加上原始数10000001，得到幸运号码。拥有该幸运号码者，获得该商品。</p>
	</div>
	<p class="que-q">什么是余数？</p>
	<p class="que-con">当两个整数相除的结果不能以整数商表示时，余数是其“余留下的量”。</p>
	<p class="que-con">举例：22除以3，商为7，余数为1，22=3*7+1。</p>

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
				title:"计算公式"
			}
		}
	}
</script>
