<style scoped>
	.countdown {
		line-height: 4rem;
		font-size: 2.2rem;
		color: #ff4a4a;
	}

	.countdown .hm {
		width: 1.8rem;
		height: 1.3rem;
	}

	.countdown .djs-icon {
		font-size: 2.0rem;
		margin: 0 .5rem 0 0;
	}
</style>

<template>
	<div class="countdown">
		<i class="djs-icon icon-alarm"></i><span class="djs">{{minute}}:{{second}}:</span><img class="hm" src="/oldStatic/images/time2.gif">
	</div>
</template>

<script>
	export default {
		props:{
			uniqueId:Number,
			endtime:{}
		},
		mounted(){
			this.praise();
		},
		methods:{
			praise:function(){
				var _this = this;

				_this.second = Math.floor(_this.endtime%60);
				_this.minute = Math.floor((_this.endtime%3600)/60);

				

				if(_this.second < 10){ _this.second = '0'+ _this.second }
				if(_this.minute < 10){ _this.minute = '0'+ _this.minute }

				var t = setInterval(function(){
					if(_this.endtime > 0){
						var s = Math.floor(_this.endtime%60);
						var m = Math.floor((_this.endtime%3600)/60);
						if(s < 10){ s = '0'+ s }
						if(m < 10){ m = '0'+ m }
						_this.second = s;
						_this.minute = m;
						--_this.endtime;
					}else{
						clearInterval(t);
						_this.$dispatch('timer-action', {
							id: _this.uniqueId
						});
					}
					
				},1000);
			}
		},
		data() {
		return {
			second: "00",
			minute: "00" 
		}
	}
	}
</script>