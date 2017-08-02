<!-- author: dreamapple -->
<template>
  <app-header :title="'积分兑换'"></app-header>
  <div class="score-container">
    <div class="score-inner dr-flex">
      <div class="score-text flex-1">
        我的积分:<span class="score-number">{{score}}</span>
      </div>
      <div v-link="'exchange-record'" class="exchange">兑换记录</div>
    </div>
  </div>
  <!-- 使用说明 -->
  <p class="sy-tips" v-link="'/welfare/jifen_explain'"><i class="one-mall-iconfont icon-info_outline"></i>使用说明</p>
  <!-- v-for -->
  <div v-for="v in pd.taoBiList" track-by="$index" class="coupon-container dr-flex">
    <div class="coupon-info flex-1">
      <div class="coupon-left">
        <div class="coupon-left-value">
          <span class="coupon-how-many">{{v.num}}个淘币</span>
          <span class="left-many">剩余<span class="light-red">{{v.left}}</span>张</span>
        </div>
        <div class="coupon-left-text">
          需要<span class="stress-red">{{v.needScore}}</span>积分
        </div>
      </div>
      <div class="coupon-need"></div>
    </div>
    <div class="btn-exchange-container dr-flex">
      <!--<div @click="exchange(v.id)" class="btn-exchange">兑换</div>-->
      <button :disabled="fix_integral_exchange_home" @click="exchange(v.id)" class="btn-exchange">兑换</button>
    </div>
  </div>

  <!-- 底部菜单兰 -->
  <app-bottom-bar></app-bottom-bar>

  <!-- popup -->
  <two-btns-popup :content="popupContent"
                  :btn-style-type="btnStyleType"
                  :show="showPopup"
                  @left-btn-action="leftBtnAction"
                  @right-btn-action="rightBtnAction"
                  :with-title="withTitle"
                  :right-btn-text="rightBtnText"
                  :left-btn-text="leftBtnText">
  </two-btns-popup>

  <!-- toast -->
  <toast :show="toastShow" :title="toastTitle" :content="toastContent"></toast>

  <!-- 加载更多的 -->
  <p v-show="isLoading" class="loading"></p>
  <p v-show="isLoading" class="msg">正在加载中...</p>
  <p v-show="isAllData" class="no-more msg">没有更新的数据了</p>
</template>

<script>
  'use strict';
  import Vue from 'vue';
  import AppHeader from '../../oldComponents/common/header/app-header';
  import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';
  import TwoBtnsPopup from '../../oldComponents/feature/about-welfare/two-btns-popup.component';
  import Toast from '../../oldComponents/feature/about-user-action/toast.component';
  // component
  export default {
    components: {
      AppHeader,
      TwoBtnsPopup,
      Toast,
      AppBottomBar
    },
    data() {
      return {
        /* popup config */
        withTitle: false,
        popupContent: '恭喜您成功兑换100淘币!',
        leftBtnText: '立即查看',
        rightBtnText: '继续兑换',
        btnStyleType: 3,
        showPopup: false,
        /* toast config */
        toastShow: false,
        toastTitle: '兑换失败',
        toastContent: '您的淘币不足',
        /* page data */
        pd: {},
        score: 0,
        /* 关于分页 */
        page: 1,
        isLoading: false,
        isAllData: false,
        /* 关于跳转 */
        url: '',
        // 接口重复调用修复
        fix_integral_exchange_home: false
      }
    },
    methods: {
      leftBtnAction() {
        window.location.href = this.url;
      },
      // 继续兑换
      rightBtnAction() {
        this.showPopup = false;
        this.getIntegralInfo();
      },
      getIntegralInfo() {
        this.fix_integral_exchange_home = true;
        let query = {};
        Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.integral_exchange_home)
          .then((res) => {
          if(10000 == res.code) {
            this.fix_integral_exchange_home = false;
            this.pd = res;
            this.score = this.pd.score;
          }
        })
      },
      exchange(id) {
        let query = {
          id: id
        };
        Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.integral_exchange)
          .then((res) => {
          if(10000 == res.code) {
            this.score = res.point;
            // this.showPopup = true;
            this.url = res.url
            window.location.href = this.url;
          }
          else {
            // 出错了,显示toast
            this.toastShow = true;
            this.toastContent = res.msg;
          }
        })
      },
      touchLoading(){
        //滚动加载 滚到底部加载数据
        var scrollTop = document.body.scrollTop,
          bodyHeight = document.body.offsetHeight,
          screenHeight = mallUtils.screen.height,
          triggerDistance = 60,
          triggerStatus = (bodyHeight - (scrollTop + screenHeight)) < (triggerDistance - 12) ? true : false;
        if(triggerStatus && !this.isLoading) {
          this.fetchMoreData();
        }
      },
      fetchMoreData(e) {
        if(this.isLoading || this.isAllData) {
          console.log('不能够加载更多的数据了...', this.isLoading, this.isAllData);
          // TODO
        }
        else {
          this.isLoading = true;
          this.page++;
          var query = {
            page: this.page
          };
          this.fetchRecords(query);
        }
      },
      fetchRecords(query){
        var that = this;
        Vue.OneMallHttp(this).GET(query, Vue.OneMallUrl.integral_exchange_home)
          .then(function(res) {
            if(10000 == res.code) {
              that.isLoading = false;
              that.pd = res.result;
              var temp = res.result.taoBiList;
              if(0 === temp.length) {
                that.isAllData = true;
              }
              else {
                that.records = that.records.concat(temp);
                that.isAllData = false;
              }
            }
          });
      }
    },
    mounted() {
      this.getIntegralInfo();
      $("body").css({"background-color":"#f8f8f8"});
//      mallUtils.funs.scroll(this.touchLoading);
//      this.fetchRecords({
//        page: this.page
//      });
    },
    destroyed() {
//      mallUtils.funs.unscroll(this.touchLoading);
      $("body").css({"background-color":"#fff"});
    }
  }

</script>

<style scoped>
  .loading {
    background-image: url('/static/images/loading.gif');
    height: 3rem;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #fff;
  }
  .msg {
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    background-color: #fff;
    color: #898989;
  }
  .sy-tips {
    width: 86%;
    padding-top: 1.6rem;
    margin: 0 auto;
    line-height: 1.0rem;
    text-align: right;
    color: #bbbbbb;
  }

  .one-mall-iconfont {
    vertical-align: text-bottom;
    margin: 0 .2rem 0 0;
  }

  .score-container {
    padding: 1.1rem 1.6rem 1.6rem 1.6rem;
    background-color: #ff4a4a;
  }
  .score-inner {
    height: 3rem;
  }
  .exchange {
    background-color: #ffff00;
    color: #ff4a4a;
    text-align: center;
    height: 100%;
    line-height: 3rem;
    border-radius: .5rem;
    font-size: 1.2rem;
    width: 7rem;
  }
  .score-text {
    font-size: 1.8rem;
    color: #fff;
    line-height: 3rem;
  }
  .score-text .score-number {
    color: #ffff00;
  }
  /* 兑换券 */
  .coupon-container {
    margin: 1.6rem;
    height: 9.4rem;
    background-image: url('/static/images/integral-exchange/coupon-bg.png') !important;
    background-size: 100% 100%;
    background-position: center;
    box-sizing: border-box;
    padding: 2.8rem 2.1rem;
  }
  .btn-exchange-container {
    height: 100%;
    width: 6rem;
    flex-direction: column;
    justify-content: center;
  }
  .btn-exchange {
    border: none;
    height: 3rem;
    background-color: #ff4a4a;
    border-radius: .5rem;
    text-align: center;
    color: #fff;
    line-height: 3rem;
    font-size: 1.2rem;
  }
  .coupon-left-value {
    height: 2rem;
    line-height: 2rem;
  }
  .coupon-left-text {
    height: 1.8rem;
    font-size: 1.2rem;
    line-height: 1.8rem;
  }
  .coupon-how-many {
    font-weight: 500;
    color: #000;
    font-size: 1.8rem;
  }
  .light-red {
    color: #ff4a4a;
  }
  .stress-red {
    color: #ff4a4a;
    font-weight: 500;
  }
</style>
