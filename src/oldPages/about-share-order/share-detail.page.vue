<style scoped>
	.c-ff4a4a {
		font-style: normal;
		color: #ff4a4a;
	}

  .share-detail {
    background-color: #fff;
  }

	.share-detail .l {
		padding: 0 1.6rem;
	}

	.share-detail .title-area {
		padding-top: 1.2rem;
		padding-bottom: .6rem;
		border-bottom: 1px solid #dfdfdf;
	}

	.share-detail .title-area h4 {
		font-size: 1.6rem;
		line-height: 2.0rem;
		word-break: break-word;
	}

	.share-detail .title-area .name-date {
		line-height: 2.0rem;
	}

	.share-detail .title-area .name-date .user-name {
		font-size: 1.4rem;
		color: #329dff;
	}

	.share-detail .title-area .name-date .date {
		font-size: 1.2rem;
		color: #cdcdcd;
	}

	.share-detail .goods-info-area {
		padding-top: .6rem;
		padding-bottom: .6rem;
		border-bottom: 1px solid #dfdfdf;
	}

	.share-detail .goods-info-area .info {
		font-size: 1.4rem;
		color: #666666;
		line-height: 2.0rem;
	}

	.share-detail .content-area {
		padding-top: 1.5rem;
		padding-bottom: 1.5rem;
		background-color: #f8f8f8;
	}

	.share-detail .content-area .share-c {
		font-size: 1.2rem;
		color: #898989;
		line-height: 1.7rem;
		margin-bottom: 1.5rem;
	}

	.share-detail .content-area .share-img-list li {
		margin-bottom: .5rem;
	}

	.share-detail .content-area .share-img-list li img {
		/*width: auto;*/
		width: 100%;
		max-width: 26.8rem;
	}

	.share-detail .content-area .praise-line {
		text-align: right;
		line-height: 1.2rem;
		margin-top: .6rem;
	}

	.share-detail .content-area .praise-line .praise-num {
		font-size: 1.2rem;
		color: #bbb;
	}
</style>

<template>
	<app-header :title="title" :type="type"></app-header>
	<section class="share-detail">
		<section class="l title-area">
			<h4>{{result.shareTitle}}</h4>
			<p class="name-date flex-ld">
				<span class="user-name">{{result.shareUsername}}</span>
				<span class="date">{{result.shareDate}}</span>
			</p>
		</section>
		<section class="l goods-info-area">
			<p class="info">
				{{result.goodsInfo}}
			</p>
			<p class="info">
				夺宝期号：{{result.nums}}
			</p>
			<p class="info">
				本期参与：<em class="c-ff4a4a">{{result.joinNum}}</em>次
			</p>
			<p class="info">
				幸运号码：<em class="c-ff4a4a">{{result.luckyNumber}}</em>
			</p>
			<p class="info">
				揭晓时间：{{result.lotteryDate}}
			</p>
		</section>
		<section class="l content-area">
			<p class="share-c">
				{{result.shareTxt}}
			</p>
			<ul class="share-img-list">
				<li v-for="img in result.shareImgList">
					<img :src="img">
				</li>
			</ul>
			<praise-area :p-date="" :is-praise="result.isPraise" :praise-num="result.praiseNum" :shareid="$route.params.id"></praise-area>
		</section>
	</section>
  <!-- 底部菜单兰 -->
  <app-bottom-bar></app-bottom-bar>
</template>

<script>
	import Vue from 'vue';
	import AppHeader from '../../oldComponents/common/header/app-header';
  import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';
	import PraiseArea from '../../oldComponents/feature/about-share-order/praise-area';
	export default {
		components:{
      AppHeader,
      PraiseArea,
      AppBottomBar
		},
		data:function(){
			return {
				title:"晒单详情",
				result:{}
			}
		},
		ready:function() {
      $("body").css("background-color","#f8f8f8");
			var _this = this;
			/*var url = '/api/shaidan_detail';*/
			Vue.OneMallHttp(this).GET({ id : _this.$route.params.id}, Vue.OneMallUrl.share_order_detail).then(function(data){
				_this.result = data.result;
			})
		}
	}
</script>
