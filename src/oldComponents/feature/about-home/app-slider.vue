<style scoped>
	.g-slider-box {
		width: 100%;
		overflow: hidden;
		position: relative;
	}

	.g-slider-list .list {
		/*width: 400% */
	}

	.g-slider-list img {
		display: block;
	}

	.g-slider-point {
		width: 20%;
		justify-content: space-between;
		position: absolute;
		left: 40%;
		bottom: 8%;
	}
	.g-slider-point > li {
		width: .6rem;
		height: .6rem;

		border-radius: 100%;
		background-color: #000;
		opacity: 0.35;

	}
	.g-slider-point .active {
		background-color: #fff;
	}
  .fix-slider,
  .fix-link {
    display: block;
    width: 100%;
    height: 100%;
  }

</style>

<template>
	<section id="g-slider-box"  class="g-slider-box">
		<ul id="g-slider-list" class="g-slider-list list flex" style="width:{{ulWidth}};transform:translate3d({{ulTranslateX}}px,0,0); -webit-transform:translate3d({{ulTranslateX}}px,0,0); transition: transform {{ulTransition}}s; -webkit:transition: transform {{ulTransition}}s;">
			<li v-for="v in collection" class="flex-1 fix-slider">
				<a class="fix-link" :href="v.linkUrl">
					<img :src="v.imgUrl" alt="图片">
				</a>
			</li>
		</ul>
		<ul class="g-slider-point flex">
			<li v-for="v in collection" :class="{'active':(+slider.index === $index)}"></li>
		</ul>
	</section>
</template>

<script>
  import Vue from 'vue';
	export default {
    props: [
      'collection'
    ],
		mounted(){
      // 使用$wacth监测collection的值的变化
      this.$watch('collection', function(newValue) {
        if(newValue instanceof Array && newValue.length > 0) {
          this.init();
          !!this.auto && this.autoPlay();
        }
      })
		},
    mounted() {
        // 编译阶段进行
    },
    computed() {

    },
		data(){
			return {
        collection:[],
				auto: true,
				autoFunc: null,
				ulWidth: "100%", //轮播盒子初始化宽度
				ulTranslateX: 0, //水平方向位移
				ulTransition: 0, //过度时间
				ulGapWidth: 30,	//拖动位移标准
				touchWidth:0, 	//水平方向拖动宽度
				touchX:0, 		//触屏数据
				slider: {		//轮播状态
					index:0,
					size: 0
				}
			}
		},
		methods: {
      init(){
        var _ul = document.querySelector("#g-slider-list"),
          _lis = document.querySelectorAll("#g-slider-list > li");

        this.ulWidth = _lis.length * mallUtils.screen.width + "px";

        this.slider.size = (_lis.length > 0) ? (_lis.length -1) : 0;
        this.touchHandler(_ul)

      },
      touchHandler(target){
        target.addEventListener("touchstart",(e) => {
          //关闭自动播放
          clearInterval(this.autoFunc);

        // e.preventDefault();
        this.ulTransition = 0;
        this.touchX = e.touches[0].pageX;
      });
        target.addEventListener("touchmove",(e) => {

         // e.preventDefault();
        var _touch = e.touches[0];
        this.touchWidth = _touch.pageX - this.touchX;
        this.transformHander(target, this.touchWidth);

      });
        target.addEventListener("touchend",(e) => {
          //开启自动播放
          this.autoPlay();

        var _width = mallUtils.screen.width;
        if(Math.abs(this.touchWidth) >= this.ulGapWidth) {
          if(this.touchWidth < 0) {
            this.showNext();
          }
          else {
            this.showPre();
          }
        }
        else{
          this.ulTranslateX = -this.slider.index * _width;
        }
        this.touchX = 0;
        this.touchWidth = 0;
        return false;
      });
      },
      transformHander(target, touchWidth){
        var _width = mallUtils.screen.width,
          _index = this.slider.index;

        if(_index === 0 && this.touchWidth > 0) {
          return false;
        }
        if(_index === this.slider.size && this.touchWidth < 0){
          return false;
        }
        this.ulTranslateX = ( 0 - _index * _width) + touchWidth;
      },
      showNext(){
        //显示下一张
        if(this.slider.index === this.slider.size) {
          return false;
        }
        this.slider.index += 1;
        this.goto(this.slider.index);
      },
      showPre(){
        //显示上一张
        if(this.slider.index === 0) {
          return false;
        }
        this.slider.index -= 1;
        this.goto(this.slider.index);
      },
      goto(index){
        var _width = mallUtils.screen.width;
        this.ulTransition = 0.5;
        this.ulTranslateX = 0 - this.slider.index * _width;
      },
      autoPlay(){
//        this.autoFunc = setInterval(()=>{
//            if(this.slider.index <= this.slider.size){
//          this.slider.index ++;
//        }
//        if(this.slider.index === this.slider.size+1) {
//          this.slider.index = 0;
//        }
//
//        this.goto(this.slider.index);
//      },5000);
      }
		}
	}
</script>
