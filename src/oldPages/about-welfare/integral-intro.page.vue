<style scoped>
	.content {
		padding: 1.6rem;
	}

	.paragraph {
		margin-bottom: 1.6rem;
	}

	.paragraph > h4 {
		font-size: 1.6rem;
		line-height: 2rem;
		color: #000;
		font-weight: normal;
	}

	.paragraph > p {
		font-size: 1.4rem;
		line-height: 2rem;
		color: #898989;
	}

	table {
		color: #898989;
	}
</style>

<template>
	<app-header :title="'积分说明'"></app-header>
	<section class="content">
		<div class="paragraph">
			<h4>积分兑换说明</h4>
			<p>1、120氧气电信积分可兑换1淘币；</p>
			<p>2、您可直接凭淘币参与淘游夺宝。</p>
	</section>

  <!-- 底部菜单兰 -->
  <app-bottom-bar></app-bottom-bar>
</template>

<script>
	import Vue from 'vue';
	import AppHeader from '../../oldComponents/common/header/app-header';
  import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';
	export default {
		components: {
			AppHeader,
      AppBottomBar
		}
	}
</script>
