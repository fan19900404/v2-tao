<style scoped>
	.content {
		padding-top: .5rem;
	}
	h2,p {
		text-indent: 2rem;
		color: #5d5d5d;

	}

	h2 {
		line-height: 2.5rem;
		font-size: 1.6rem;
	}

	p {
		line-height: 2rem;
		font-size: 1.4rem;
	}

</style>

<template>
	<!--<app-header :title="title" :type="type"></app-header>-->
	<section class="content pd-lr-10">
		<h2>1.什么是淘币？</h2>
		<p>淘币是您在淘游夺宝参与购买商品时的虚拟货币。</p>
		<h2>2.淘币如何获得？</h2>
		<p>淘币通过充值获得。每充值1元获得1个淘币，充值N元获得N个淘币。</p>
		<h2>3.淘币支持哪些充值方式？</h2>
		<p>目前支持支付宝充值方式。</p>
		<h2>4.充值的款项是否可以退回？</h2>
		<p>充值的款项无法退回。</p>
	</section>

  <!-- 返回按钮 -->
  <!--<go-back></go-back>-->

  <app-bottom-bar></app-bottom-bar>
</template>

<script>
	import AppHeader from '../../components/common/header/app-header';
  import AppBottomBar from '../../components/common/footer/app-bottom-bar';
  import GoBack from '../../components/feature/common/goback.component';

	export default {
		components: {
			AppHeader,
      AppBottomBar,
      GoBack
		},
		data(){
			return {
				title: "充值说明",
				type: "back"
			}
		},
		methods:{
			goto(hash){
				location.hash = hash;
			}
		},
    mounted() {
      $("body").css({"background-color":"#f8f8f8"});
    }
	}
</script>
