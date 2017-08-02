<style scoped>
	.praise-line {
		line-height: 1.2rem;
		margin-top: .6rem;
	}

	.praise-line .date {
		font-size: 1.4rem;
		color: #cdcdcd;
	}

	.praise-line .praise-num {
		font-size: 1.4rem;
		color: #bbb;
	}

	.icon-heart {
		font-size: 1.4rem;
		color: #ff4a4a;
	}

	.icon-heart1 {
		font-size: 1.4rem;
		color: #ff4a4a;
	}
</style>

<template>
	<!-- 点赞区域 -->
	<div class="praise-line flex-ld">
		<span class="date">{{pDate}}</span>
		<div class="praise-area">
			<i class="one-mall-iconfont" :class="{'icon-heart':isPraise==0,'icon-heart1':isPraise==1}" @touchstart="praise()"></i>
			<span class="praise-num">{{praiseNum}}</span>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default {
		props: ["pDate","isPraise","praiseNum","shareid"],
		methods:{
			praise:function(){
				var _this = this;
				var params = {
					showID:_this.shareid,
					type:_this.isPraise==0?1:0,
				};
				Vue.OneMallHttp().GET(params,'/Show/Index/share_praise').then(function(data){
					if(data.code == 10000){
						_this.isPraise = _this.isPraise==0?1:0;
						_this.praiseNum = data.praiseNum;
					}else{
						mallUtils.layer.err(data.msg);
					}
				})
			}
		}
	}
</script>