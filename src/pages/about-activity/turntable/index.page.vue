<template>
  <app-header :title="'幸运大转盘'"></app-header>
  <!-- iphone7 大转盘 author: dreamapple -->
  <div :style="ttStyle" class="turntable" style="overflow-x:hidden;">
    <!-- 文字跑马灯部分 -->
    <div :style="luStyle" class="lucky-user flex">
      <div class="rank">幸运榜</div>

      <!--轮播-->
      <div class="lucky-user-wrapper flex-1">
        <div class="content flex">
          <span v-for="item in list" :style="luItemStyle">
            恭喜<span class="user">{{ item.user | substrByChar 4 '**'}}</span>抽中<span class="goods">{{ item.goods }}</span>的机会
          </span>
        </div>
      </div>

      <!--规则-->
      <div class="rule-wrapper">&nbsp;
        <div class="rule" @click="showRuleDialog(true)">
          <div class="wrapper">规则</div>
          <div class="circle flex">
            <div class="arrow"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 文字跑马灯部分 -->

    <!-- 中部的文案 -->
    <div :style="tiStyle" class="turntable-intro"></div>
    <!-- 中部的文案 -->

    <!-- 转盘部分 -->
    <div :style="tcStyle" class="turntable-core" :class="{'rotateBc': running}">
        <div :style="tStyle" class="turntable-inner" :class="{'rotate': running}"></div>
        <div :style="sbcStyle" class="start-btn-container" @touchstart="rotateH"></div>
        <div :style="arrowStyle" class="up-arrow"></div>
    </div>
    <!-- 转盘部分 -->
  </div>

  <about-alert :show-alert="showAlert" @go-index="goIndex"></about-alert>
  <rule :show="show" :is-show="isShow"></rule>

  <!-- 返回首页 -->
  <go-back :path="'/'"></go-back>
</template>

<script>
  'use strict';
  import Vue from 'vue';
  import DrMarquee from '../../../components/feature/about-activity/turntable/marquee.component';
  import AboutAlert from '../../../components/feature/about-activity/turntable/alert-one.component';
  import Rule from '../../../components/feature/about-activity/turntable/marquee-rule';
  import GoBack from '../../../components/feature/common/goback.component';
  export default {
    components: {
      DrMarquee,
      AboutAlert,
      Rule,
      GoBack
    },
    data() {
      return {
        actID: this.$route.query.actID,
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        // turntableNormalUrl: '/static/images/activity/turntable/turntable-core-normal.jpg',
        // turntableActiveUrl: '/static/images/activity/turntable/turntable-core-active.jpg',
        // turntableUrl: '/static/images/activity/turntable/turntable-core-normal.jpg',
        running: false,
        showAlert: false, // 弹框
        show: false,  // 遮罩
        isShow: false,   // 下拉规则
        list:[]
      }
    },
    computed: {
      turntableRadius() {
        return this.width * 290 / 720;
      },
      // 转盘距离顶部的高度
      turntableTop() {
        return this.width * 113 / 720;
      },
      turntableLeft() {
        return this.width * 70 / 720;
      },
      luItemStyle(){
        return {width: this.width - 13 * 10 + 'px'};
      },
      // 中部文案部分的高度
      tiStyle() {
        return {
          height: this.width * 272 / 720 + 'px'
        }
      },
      // 顶部的中奖信息用户
      luStyle() {
        return {
          height: this.width * 80 / 720 + 'px'
        }
      },
      // 页面的高度
      ttStyle() {
        return {
          height: this.height + 'px'
        }
      },
      // 转盘容器的样式
      tcStyle() {
        return {
          height: this.width * 876 / 720 + 'px',
          // backgroundImage: 'url('+ this.turntableUrl +')'
        }
      },
      // 转盘的样式
      tStyle() {
        return {
          width: this.width * 580 / 720 + 'px',
          height: this.width * 580 / 720 + 'px',
          left: this.width * 70 / 720 + 'px',
          top: this.width * 113 / 720 + 'px'
        }
      },
      // 开始按钮的样式
      sbcStyle() {
        return {
          width: this.width * 150 / 720 + 'px',
          height: this.width * 150 / 720 + 'px',
          left: this.width * 286 / 720 + 'px',
          top: this.width * 330 / 720 + 'px'
        }
      },
      // k开始按钮上面的小箭头
      arrowStyle(){
        return {
          width: this.width * 27 / 720 + 'px',
          height: this.width * 25 / 720 + 'px',
          top: this.width * 308 / 720 + 'px'
        }
      }
    },
    created(){
      new Image().src = "/static/images/activity/turntable/turntable-core-active.jpg";
    },
    mounted() {
      let _this = this;
      // 根据窗口变化,改变宽度
      window.onresize = function() {
        _this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      };
      this.getLuckyUsers();
      //
    },
    methods: {
      // 转动的效果,暂时不需要
      // toggleTurntableImg() {
      //   let flag = true;
      //   setInterval(() => {
      //     this.turntableUrl = flag ? this.turntableNormalUrl : this.turntableActiveUrl;
      //     flag = !flag;
      //   }, 360);
      // },
      rotateH(){
        if(this.running){
          return;
        }
        this.running = true;
        setTimeout(()=>{
          // this.running = false;
          this.showAlert = true;
          // this.list.push({user: '王八', goods: 'iphone7' });
          // this.list = this.list.reverse().slice(0, 5);
        }, 3500)
      },

      /* 获取幸运用户列表 */
      getLuckyUsers(){
        Vue.OneMallHttp(this).GET({'limit': 5, 'actID': this.actID}, Vue.OneMallUrl.get_lucky_users)
          .then((res) => {
            if(res.code == '10000'){
              this.list = res.result.slice(0, 5);
            }
        });
      },

      // 心动/想要按钮按下
      goIndex() {
        this.$router.push({
          name: 'home'
        });
      },

      // 显示/隐藏规则弹窗
      showRuleDialog(flag){
        this.isShow = flag;
        this.show = flag;
      }
    }
  }
</script>

<style scoped>
  .turntable {
    background-color: #ee1e1f;
  }
  .turntable-intro {
    background-image: url('/static/images/activity/turntable/turntable-intro.jpg');
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .turntable-core {
    position: relative;
    background-image: url('/static/images/activity/turntable/turntable-core-normal.jpg');
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .lucky-user {
    background-color: #ad0000;
  }
  .lucky-user .rank{
    width: 7.5rem;
    align-items: center;
    text-align: center;
    color: #fffcad;
    font-size:1.8rem;
  }
  .lucky-user-wrapper{
    position: relative;
    height: 100%;
    overflow: hidden;
    background-color: #ad0000;
    font-size: 1.2rem;
    color: #fff;
  }
  .lucky-user-wrapper .content{
    height: 100%;
    line-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: absolute;
    overflow: hidden;
    animation: sliderAnimation 8s ease forwards infinite;
  }
  .lucky-user .goods{
    color: #fffcad;
  }
  /* 轮播动画 */
  @keyframes sliderAnimation {
    0% { left: 0; }
    25% { left: -100%; }
    50% { left: -200%; }
    75% { left: -300%; }
    100% { left: -400%; }
  }

  /*规则按钮*/
  .rule-wrapper{
    z-index: 3;
    width:5.5rem;
  }
  .rule{
    position: absolute;
    top: 0;
    right: 1rem;
    width: 3.9rem;
    color: #fff;
  }
  .rule .wrapper{
    text-align: center;
    height: 2.7rem;
    font-size: 1.2rem;
    line-height: 3rem;
    background-color: #ff8a00;
  }
  .rule .circle{
    text-align: center;
    height: 1.7rem;
    border-bottom-left-radius: 3.9rem;
    border-bottom-right-radius: 3.9rem;
    background-color: #ff8a00;
    justify-content: center;
    align-items: center;
  }
  .rule .circle .arrow{
    width: 1.65rem;
    height: 0.85rem;
    background-image: url('/static/images/activity/turntable/arrow-down.png');
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: cover;
  }


  .turntable-inner {
    position: absolute;
    border-radius: 50%;
    background-image: url('/static/images/activity/turntable/lucky-gift.png');
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .start-btn-container {
    position: absolute;
    height: 100%;
    width: 100%;
    background-image: url('/static/images/activity/turntable/start.png');
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 2;
  }
  .up-arrow{
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    background-image: url('/static/images/activity/turntable/arrow.png');
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 1;
  }
  .rotate{
    animation:rotateAnimation 0.5s linear forwards 5 normal;
  }
  /* 转啊转 */
  @keyframes rotateAnimation{
    0%{transform:rotate(0deg);}
    25%{transform:rotate(90deg);}
    50%{transform:rotate(180deg);}
    75%{transform:rotate(270deg);}
    100%{transform:rotate(360deg);}
  }
  /* 背景闪烁、暂时注释 */
  .rotateBc{
    // animation: bcAnimation 0.5s linear forwards 5 normal;
  }
  @keyframes bcAnimation{
    0 { background-image: url('/static/images/activity/turntable/turntable-core-normal.jpg'); }
    50% { background-image: url('/static/images/activity/turntable/turntable-core-active.jpg'); }
    100% { background-image: url('/static/images/activity/turntable/turntable-core-normal.jpg'); }
  }
</style>
