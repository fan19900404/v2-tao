<!-- author:yex -->
<template>
  <app-header :title="title" :type="type"></app-header>
  <section class="container">

    <!-- 活动简介 -->
    <section id="activeIntro">
      <div class="pic-desc"></div>
      <div class="btn-area">
        <a v-show="joined" class="joined" href="javascript:;">&nbsp;</a>
        <a v-else class="unjoined" @click="getQuota">&nbsp;</a>
      </div>
      <div class="text-desc">
        <div class="detail">
          活动时间：12月8日0点-1月28日0点<br/>活动期间内，以下商品的获得用户，即可返还当期消费金额的100%，相当于0元就购！<br/>
          注：单个用户每件商品每期只可参与一次，且最多可购买商品总需参与人次的15%。
        </div>
      </div>
      <div class="rule" @click="showRuleDialog(true)">
        <div class="wrapper">规则</div>
        <div class="circle"></div>
      </div>
    </section>

    <!-- 商品信息 -->
    <section id="goods-info">
      <div class="cloud">&nbsp;</div>
      <ul class="goods-list clearfix">
        <li class="item" v-for="item in goodsList" v-link="'/details/' + item.numberID" ss="'/details/{{item.numberID}}'">
          <div class="oi1">
            <div class="wrapper">
              <img :src="item.image" alt="">
            </div>
            <div class="title overflow-ellipsis">{{ item.name }}</div>
            <div class="btn-buy" v-link="item.link">购买</div>
          </div>
        </li>
      </ul>
    </section>
  </section>

  <!-- 返回首页 -->
  <go-back :path="'/?mID=' + mID"></go-back>

  <!-- 活动 -->
  <ac-get-iphone :show="showRule"></ac-get-iphone>
</template>

<script>
  'use strict';
  import Vue from 'vue';
  import AppHeader from '../../../oldComponents/common/header/app-header';
  import AcGetIphone from '../../../oldComponents/feature/about-activity/ac-get-iphone.component';
  import GoBack from '../../../oldComponents/feature/common/goback.component';

  export default {
    components: {
      AppHeader,
      AcGetIphone,
      GoBack
    },
    data() {
      return {
        title: '0元抢iphone7',
        type: 'back,home',
        joined: false,
        disabled: false,
        goodsList: [],
        // 是否显示规则弹框
        showRule: false,
        actID: this.$route.query.actID,
        mID: this.$route.query.mID || 8
      }
    },
    mounted() {
      this.getJoinStatus();
      this.getGoodsList();
    },
    methods: {

      /*判断用户是否已经参与过*/
      getJoinStatus(){
        Vue.OneMallHttp(this).GET({'actID': this.actID}, Vue.OneMallUrl.get_join_status)
          .then((res) => {
            if(res.code == '10000'){
              this.joined = res.result.isJoined;
              return;
            }
        });
      },

      /*获取商品列表*/
      getGoodsList(){
        Vue.OneMallHttp(this).GET({'pageIndex': 0, 'pageSize': 4, 'actID': this.actID}, Vue.OneMallUrl.get_goods_list)
          .then((res) => {
            if(res.code == '10000'){
              this.goodsList = res.result;
              return;
            }
        });
      },

      /*抢资格*/
      getQuota(){
        if(this.disabled){
          return;
        }
        this.disabled = true;
        Vue.OneMallHttp(this).POST({'actID': this.actID}, Vue.OneMallUrl.get_quota)
          .then((res) => {
            mallUtils.layer.alert(res.msg);
            if(res.code == '10000'){
              this.joined = true;
              return;
            }
        });
      },
      /*显示/隐藏规则*/
      showRuleDialog(flag){
        this.showRule = flag;
      }
    }
  }
</script>

<style scoped>
  body{
    position: relative;
  }
  .container{
    position: absolute;
    width: 100%;
    min-height: 100%;
    font-size: 1.35rem;
    background-color: #ffdede;
  }

  /*活动介绍*/
  #activeIntro{
    text-align: center;
  }
  #activeIntro .pic-desc, #activeIntro .text-desc {
    margin: 1.5rem 0;
  }
  #activeIntro .pic-desc{
    width: 100%;
    height: 20rem;
    background: url("../../../../oldStatic/images/activity/zero/logo.png") no-repeat;
    background-size: 100% 100%;
  }
  #activeIntro .btn-area .joined, #activeIntro .btn-area .unjoined{
    display: inline-block;
    width: 15rem;
    height: 4rem;
    margin: 0 auto;
    line-height: 4rem;
    color: #fff;
  }
  #activeIntro .btn-area .joined{
    background: url("../../../../oldStatic/images/activity/zero/btn-joined.png") no-repeat;
    background-size: 100% 100%;
  }
  #activeIntro .btn-area .unjoined{
    background: url("../../../../oldStatic/images/activity/zero/btn-join.png") no-repeat;
    background-size: 100% 100%;
  }
  #activeIntro .text-desc .detail{
    text-align: left;
    /*width: 27rem;*/
    max-width: 85%;
    margin: 0 auto;
    padding: 2rem 1rem 2rem 1rem;
    line-height: 2rem;
    color: #333;
    font-size: 1.4rem;
    background: url("../../../../oldStatic/images/activity/zero/text-desc-bg.png") no-repeat;
    background-size: 100% 100%;
  }

  /*规则按钮*/
  #activeIntro .rule{
    position: absolute;
    top: 0;
    right: 1.5rem;
    width: 3.9rem;
    color: #fff;
  }
  #activeIntro .rule .wrapper{
    text-align: center;
    height: 2.7rem;
    font-size: 1.2rem;
    line-height: 3rem;
    background-color: #ff4a4a;
  }
  #activeIntro .rule .circle{
    text-align: center;
    height: 1.7rem;
    border-bottom-left-radius: 3.9rem;
    border-bottom-right-radius: 3.9rem;
    background-color: #ff4a4a;
  }


  /*商品信息*/
  #goods-info{
    background: none;
  }
  #goods-info .cloud{
    height: 3rem;
    background: url("../../../../oldStatic/images/activity/zero/cloud.png") no-repeat;
    background-size: 100% auto;
  }
  #goods-info .goods-list{
    min-height: 10rem;
    background-color: #ffc3c3;
  }
  .goods-list{
    padding-bottom: 7em;
    text-align: center;
  }
  .goods-list .item{
    float: left;
    width: 50%;
    padding: 0;
    margin: 0;
  }
  .goods-list .item .oi1{
    margin: 1rem;
    padding: 1rem;
    border: solid #060001 1px;
    -webkit-border-radius: 0.25rem;
    border-radius: 0.25rem;
    background-color: #fff;
  }
  .goods-list .item .oi1 > div{
    margin-bottom: 1rem;
  }
  .goods-list .item .oi1 > div:last-child{
    margin-bottom: 0.5rem;
  }
  .goods-list .item .title{
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    color: #333;
    text-align: center;
  }
  .goods-list .item .btn-buy{
    width: 9rem;
    max-width: 70%;
    height: 1.8rem;
    line-height: 1.8rem;
    margin: 0 auto;
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    color: #fff;
    background-color: #ff4a4a;
    -webkit-border-radius: 0.35rem;
    border-radius: 0.35rem;
    -webkit-box-shadow: 0rem 0.02rem 0.05rem #000;
    box-shadow: 0rem 0.02rem 0.05rem #000;
  }

  .back-home {
    line-height: 1.5rem;
    padding: .5rem;
    position: fixed;
    width: 3rem;
    height: 3rem;
    bottom: 2rem;
    right: 1.5rem;
    border-radius: 50%;
    background-color: #ff4a4a;
    text-align: center;
    color: #fff;
  }
</style>
