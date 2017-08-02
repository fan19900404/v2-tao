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

</style>

<template>
  <app-header :title="'登录失效'"></app-header>
  <section class="tips">
    <i class="icon-warning error"></i>
    <p class="t">登录失效</p>
  </section>
  <app-bottom-bar></app-bottom-bar>
</template>

<script>
	import AppHeader from '../../oldComponents/common/header/app-header';
  import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';

  export default {
		components: {
			AppHeader,
      AppBottomBar
		}
	}
</script>
