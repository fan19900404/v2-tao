<style scoped>
  .g-slider-box {
    background-color: #fff;
    /*width: 100%;*/
    width: 32rem;
    margin: 0 auto;
    height: 17.4rem;
    overflow: hidden;
    position: relative;
  }

  .g-slider-list {
    position: relative;
    height: 100%;
  }
  .g-slider-list .fix-img-li {
    height: 100%;
  }
  .user-notice {
    position: absolute;
    height: 2.5rem;
    width: 19rem;
    background-color: rgba(0, 0, 0, 0.3);
    top: 7.25rem;
    left: .4rem;
    border-radius: 2.5rem;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
    color: #fff;
  }
  .user-notice .time {
    margin-right:1.5rem;
  }
  .user-notice .username {
    color: #329dff;
  }
  .user-notice .head-pic {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
  }
  .user-notice .head-pic img {
    display: block;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }
  .user-notice .times-color {
    color: #ff4a4a;
  }

  .g-slider-list a {
    /*margin: 2.7rem auto;*/
    /*margin-bottom: 3rem;*/
    /*width: 53%;*/
    width: 100%;
    /*height: 12.3rem;*/
    height: 100%;
    display: block;
    position: relative;
  }
  .g-slider-list img {
    display: block;
    height: 100%;
  }

  .g-slider-point {
    width: 20%;
    justify-content: space-between;
    position: absolute;
    left: 40%;
    bottom: 1.1rem;
  }
  .g-slider-point > li {
    width: .8rem;
    height: .8rem;
    border-radius: 50%;
    background-color: #ccc;

  }
  .g-slider-point .active {
    background-color: #ff4a4a;
  }
  .sub-area{
    width: 4.2rem;
    height: 4.2rem;
    position: absolute;
    /*top: -2.1rem;*/
    /*left: -2.1rem;*/
    top: 1rem;
    left: 1rem;
    background-image: url('/oldStatic/images/new-subarea-icon.png');
    background-size: 100% 100%;
    background-position: center;
  }
  .area-10{
    width: 4.2rem;
    height: 4.2rem;
    position: absolute;
    top: 1rem;
    left: 1rem;
    background-image: url('/oldStatic/images/index/10.png');
    background-size: 100% 100%;
    background-position: center;
  }
  .fenqu {
    color: blue;
    font-size: 4.8rem;
  }
  .fenqu-text {
    position: absolute;
    width: 4.2rem;
    height: 4.2rem;
    display: block;
    color: #fff;
    text-align: center;
    font-size: 1.2rem;
    line-height: 4.2rem;
    top: 0;
    left: 0;
  }
</style>

<template>
  <section id="g-slider-box"  class="g-slider-box">
    <ul id="g-slider-list" class="g-slider-list list flex" style="width:{{ulWidth}};transform:translate3d({{ulTranslateX}}px,0,0); -webit-transform:translate3d({{ulTranslateX}}px,0,0); transition: transform {{ulTransition}}s; -webkit:transition: transform {{ulTransition}}s;">
      <li v-for="v in imgList" class="flex-1 fix-img-li">
        <a>
          <i :class="{
            'sub-area':isSubarea,
            'normal': !isSubarea,
            'area-10':isTen
          }"></i>
          <!--<span class="sub-area">-->
            <!--<i class="fenqu fenqu-tag-bg icon-cuxiaobg"></i>-->
            <!--<span class="fenqu-text">分区</span>-->
          <!--</span>-->
          <img :src="v.imgUrl" alt="">
        </a>
      </li>
    </ul>
    <ul class="g-slider-point flex">
      <li v-for="v in imgList" :class="{'active':(+slider.index === $index)}"></li>
    </ul>

    <div v-show="false" class="user-notice dr-flex">
      <span class="head-pic">
        <img src="/oldStatic/images/slider-4.jpg">
      </span>
      <span class="username">换个**手气</span>
      <div class="times">参与了<span class="times-color">9</span>人次</div>
      <span class="time">1秒前</span>
    </div>
  </section>
</template>

<script>
  export default {
    props: [
      'auto',
      'imgList',
      'isSubarea',
      'isTen'
    ],
    mounted(){
      this.$watch('imgList', function(newValue) {
        if(newValue instanceof Array && newValue.length > 0) {
          this.init();
          !!this.auto && this.autoPlay();
        }
      })
    },
    data(){
      return {
        auto: this.auto || true,
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

        e.preventDefault();
        this.ulTransition = 0;
        this.touchX = e.touches[0].pageX;
      });
        target.addEventListener("touchmove",(e) => {

          e.preventDefault();
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
        this.autoFunc = setInterval(()=>{
            if(this.slider.index <= this.slider.size){
          this.slider.index ++;
        }
        if(this.slider.index === this.slider.size+1) {
          this.slider.index = 0;
        }

        this.goto(this.slider.index);
      },5000);
      }
    }
  }
</script>
