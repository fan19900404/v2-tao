<style scoped>
	.countdown {
		display: inline-block;
	}
</style>

<template>
	<div class="countdown">
		<span class="J_timeCountDown" data-endTime="">{{minute}}:{{second}}</span>
	</div>
</template>

<script>
  export default {
	props: {
		uniqueId: Number,
		endtime:{},
		tcallback:{
			type: Function
		}
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