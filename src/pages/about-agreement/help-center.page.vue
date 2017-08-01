<style scoped>
	.header {
		background-color: #f4f4f4;
		padding-bottom: 1rem;
	}
	.help {
		width: 100%;
		min-height: 5rem;
		display: block;
	}
	.first {
		position: relative;
	}
	.first:after {

		width: 1px;
    	height: 54%;
    	right: 0;
	    top: 23%;

	    content: "";
	    display: block;
	    position: absolute;
	    background-color: #ddd;
	}

	.bar {
		height: 4.2rem;
		line-height: 4.2rem;
		border-bottom: 1px solid #eaeaea;
	}

	.tel {
		height: 2rem;
		line-height: 2rem;
		text-align: center;
		color: #3c3e45;
		font-size: 1.4rem;
	}

</style>

<template>
	<app-header :title="title"></app-header>

	<section class="bg-fff">
		<help-list></help-list>
	</section>

  <go-back></go-back>

  <!-- bottom -->
  <app-bottom-bar></app-bottom-bar>
</template>

<script>
  import {showReview} from '../../vuex/actions';
	import AppHeader from '../../components/common/header/app-header';
	import HelpList from '../../components/feature/about-agreement/help-list';
  import GoBack from '../../components/feature/common/goback.component';

	export default {
		components: {
			AppHeader,
			HelpList,
      GoBack
		},
		data(){
			return {
				title: "常见问题"
			}
		},
		methods:{
			goto(hash){
				location.hash = hash;
			}
		},
    vuex: {
      actions: {
        showReview
      }
    },
    mounted() {
      // 获取是否显示ICP备案
      this.showReview(false);
    }
	}
</script>
