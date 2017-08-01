<template>
  <app-header :title="title"></app-header>
  <div class="top_wrapper">
    <div class="top_left">
      <span class="val">{{user.taoBi | moneyWidthComma}}</span>
      <a v-link="'/recharge/explain'" class="help_link"></a>
      <p class="val_explain">我的淘币（1RMB=1淘币）</p>
    </div>
    <div class="top_right">
      <span class="val">{{user.taoDou | moneyWidthComma}}</span>
      <a v-link="{name:'/welfare/taodou-explain'}" class="help_link"></a>
      <p class="val_explain">我的淘豆</p>
    </div>
  </div>
  <a v-link="{name:'pay-recharge'}" class="btn_topup">充值</a>
  <div class="structure_wrapper">
    <p :class="taobiBannerClassObj" @click="getTaobiList()">
      淘币消费明细
    </p>
    <p :class="taodouBannerClassObj" @click="getTaodouList()">
      淘豆消费明细
    </p>
  </div>
  <ul class="taobi_list" v-if="currentList==='taobi'&& taobiList.length!=0"  v-infinite-scroll="scrollTaobi()" infinite-scroll-distance="10" infinite-scroll-disabled="loadingtaobi" infinite-scroll-immediate-check="false">
    <li v-for="item in taobiList">
      <p class="item_top">
        <span class="item_active">{{item.desc}}</span>
        <span class="item_time">{{item.cDate | formatDate 'YYYY/MM/DD'}}</span>
      </p>
      <p class="item_bottom">
        <span class="item_val">
          <templete v-if="item.doType=='1'">
            +
          </templete>
          <templete v-else>
            -
          </templete>
          {{item.money}}淘币
        </span>
      </p>
    </li>
  </ul>
  <p v-show="loadingtaobi && !listDonetaobi" class="page-infinite-loading">
    <my-spinner type="fading-circle"></my-spinner>加载中
  </p>
  <ul class="taodou_list" v-if="currentList==='taodou'&& taodouList.length!=0"  v-infinite-scroll="scrollTaodou()" infinite-scroll-distance="10" infinite-scroll-disabled="loadingtaodou" infinite-scroll-immediate-check="false">
    <li v-for="item in taodouList">
      <p class="item_top">
        <span class="item_active">{{item.desc}}</span>
        <span class="item_time">{{item.cDate | formatDate 'YYYY/MM/DD'}}</span>
      </p>
      <p class="item_bottom">
        <span class="item_val">
          <templete v-if="item.doType=='1'">
            +
          </templete>
          <templete v-else>
            -
          </templete>
          {{item.money}}淘豆
        </span>
      </p>
    </li>
  </ul>
  <p v-show="loadingtaodou && !listDonetaodou" class="page-infinite-loading">
    <my-spinner type="fading-circle"></my-spinner>加载中
  </p>
  <div class="empty_wrapper" v-show="taobiisEmpty && currentList==='taobi'">
    <img src="/static/images/tao-you/personal-center/withourecord.png">
    <p>您还没有淘币支出记录哦！</p>
  </div>
  <div class="empty_wrapper" v-show="taodouisEmpty && currentList==='taodou'">
    <img src="/static/images/tao-you/personal-center/withourecord.png">
    <p>您还没有淘豆支出记录哦！</p>
  </div>

  <!-- 返回按钮 -->
  <go-back></go-back>
</template>
<style lang="scss" scoped>

  .top_wrapper {
    background-color:#ff4a4a;
    overflow: hidden;
    position: relative;
    padding-top: .5rem;
    padding-bottom: 4rem;
  }

  .top_left {
    float: left;
    text-align: center;
    width: 50%;
    border-right:1px solid #ff9292;
    box-sizing: border-box;
  }

  .top_right {
    width: 50%;
    float: right;
    text-align: center;
  }

  .btn_topup {
    display: block;
    background-color:#ff4a4a;
    color: #FFFFFF;
    border: .3rem solid #FFFFFF;
    margin: -7% auto 0 auto;
    width: 62%;
    text-align: center;
    height: 4.2rem;
    line-height: 4.2rem;
    border-radius: 2.3rem;
    position: relative;
    z-index: 2;
    font-size: 1.8rem;
  }

  .top_wrapper .val {
    font-size:2rem;
    color: #FFFFFF;
    position: relative;
    line-height: 1.2;
    padding-right: 1.6rem;
    background-repeat:no-repeat;
    background-size:1.3rem;
    background-position:right .5rem;
  }
  .top_left .val{
    background-image:url('/static/images/personal/gold2.png');
  }
  .top_right .val{
    background-image:url('/static/images/personal/gold1.png');
  }

  .help_link{
    font-family: icons;
    color: #FFFFFF;
    font-size:2rem;
    margin-left: .2rem;
    position: relative;
    top: .2rem
  }
  .help_link:after{
    content: "\e8fd";
  }
  .val_explain{
    color: #fffffe;
    font-size: 1rem;
  }
  .structure_wrapper{
    background-color:#FFFFFF;
    overflow: hidden;
    margin-top: 1.4rem;
  }
  .banner_title{
    width: 50%;
    float: left;
    border-top: 1px solid #dfdfdf;
    box-sizing:border-box;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.4rem;
    text-align: center;
    border-bottom: 1px solid #dfdfdf;
  }
  .banner_title.active{
    border-bottom:2px solid #ff4a4a;
    color:#ff4a4a;
  }

  .empty_wrapper{
    position: relative;
  }
  .empty_wrapper img{
    width: 72%;
    display: block;
    margin: 4rem auto;
  }
  .empty_wrapper p{
    position: absolute;
    color: #898989;
    font-size:1.2rem;
    text-align: center;
    bottom: 1rem;
    margin: 0 auto;
    left: 0;
    right: 0;
  }

  .taobi_list,taodou_list{

  }
  .taobi_list li,.taodou_list li{
    border-bottom: 1px solid #dfdfdf;
    position: relative;
    overflow: hidden;
    background-color:#FFFFFF;
  }
  .item_active{
    color: #111111;
    font-size:1.6rem;
    line-height: 2rem;
    position: absolute;
    overflow: hidden;
    right: 7rem;
    left: 0;
  }
  .item_name{
    color:#898989;
    font-size:1.4rem;
  }
  .item_time{
    line-height: 1.8rem;
    color:#898989;
    font-size:1.4rem;
    float: right;
  }
  .item_val{
    color:#ff4a4a;
    font-size:1.4rem;
    float: right;
  }
  .item_top{
    margin:1rem 1.5rem 0 1.5rem;
    position: relative;
  }
  .item_bottom{
    margin:3rem 1.5rem 1rem 1.5rem;
    overflow: hidden;
  }

  .taodou_list .val{
    color: #111111;
  }

  .page-infinite-loading{
    margin: 1rem;
  }
</style>
<script>
  import Vue from 'vue';
  import AppHeader from '../../components/common/header/app-header';
  import {InfiniteScroll,Spinner} from 'mint-ui';
  import GoBack from '../../components/feature/common/goback.component';
  Vue.component('my-spinner', Spinner);
  export default {
    data(){
      return {
        loadingtaobi:false,
        loadingtaodou:false,
        user:{
         taoBi:null,
         taoDou:null
        },
        ajaxIng:false,
        title: '消费明细',
        taobiList: [],
        taodouList: [],
        taodouBannerClassObj:{
          banner_title:true,
          active:false
        },
        taobiBannerClassObj:{
          banner_title:true,
          active:false
        },
        currentList:'',
        taobiisEmpty:false,
        taodouisEmpty:false,
        taobiIsLoaded:false,
        taodouIsLoaded:false,
        taobiPageIndex:1,
        taodouPageIndex:1,
        listDonetaobi:false,
        listDonetaodou:false
      }
    },
    components: {
      AppHeader,
      InfiniteScroll,
      GoBack
    },
    methods: {
      getTaobiList(){
        if(this.currentList==='taobi'){
          return;
        }

        if(this.taobiIsLoaded===false){
          var _this=this
          this.getTaobiAjax(function(){
            console.log('加载淘币')
            if(_this.taobiList.length==0){
              _this.taobiisEmpty=true
            }
          })
        }

        this.taobiBannerClassObj.active=true
        this.taodouBannerClassObj.active=false


        this.currentList='taobi'
        this.taobiIsLoaded=true
      },
      getTaodouList(){
        if(this.currentList==='taodou'){
          return;
        }

        if(this.taodouIsLoaded===false){
          var _this=this
          this.getTaodouAjax(function(){
            console.log('加载淘豆')
            if(_this.taodouList.length==0){
              _this.taodouisEmpty=true
            }
          })
        }

        this.taobiBannerClassObj.active=false
        this.taodouBannerClassObj.active=true


        this.currentList='taodou'
        this.taodouIsLoaded=true
      },
      getTaobiAjax(callBack){
        if(this.ajaxIng){
          return
        }
        this.ajaxIng=true
        var _this=this
        Vue.ClientHttp(this).GET({
          moneyType:1,
          page:this.taobiPageIndex
        }, Vue.ClientUrl.one_taodou_detail).then(res=>{
          _this.ajaxIng=false;
          if(10000 !== res.code) {
            return;
          }
          if(res.result&&res.result.length>0){
            this.taobiList=this.taobiList.concat(res.result)
            ++this.taobiPageIndex
          }else{
            _this.listDonetaobi=true
          }

          if(typeof callBack != 'undefined'){
            callBack(res)
          }
        })
      },
      getTaodouAjax(callBack){
        if(this.ajaxIng){
          return
        }
        this.ajaxIng=true
        var _this=this
        //type=2减 =1加
        Vue.ClientHttp(this).GET({
          moneyType:2,
          page:this.taodouPageIndex
        }, Vue.ClientUrl.one_taodou_detail).then(res=>{
          _this.ajaxIng=false;
          if(10000 !== res.code) {
            return;
          }
          if(res.result&&res.result.length>0){
            _this.taodouList=this.taodouList.concat(res.result)
            ++_this.taodouPageIndex
          }else{
            _this.listDonetaodou=true
          }

          if(typeof callBack != 'undefined'){
            callBack(res)
          }
        })
      },
      getUserInfo:function() {
        Vue.ClientHttp(this).GET('', Vue.ClientUrl.user_info).then(res=>{
          if(10000 !== res.code) {
            return;
          }
          this.user=res.result
        })
      },
      scrollTaobi(){
        var _this=this
        _this.loadingtaobi = true;
        _this.getTaobiAjax(function(res){
          if(res.result.length&&res.result.length>0){
            _this.loadingtaobi=false
          }else{
            console.log('没有了淘币')
          }
        })
      },
      scrollTaodou(){
        var _this=this
        _this.loadingtaodou = true;
        _this.getTaodouAjax(function(res){
          if(res.result.length&&res.result.length>0){
            _this.loadingtaodou=false
          }else{
            console.log('没有了淘豆')
          }
        })
      }
    },
    ready:function(){
      $("body").css({"background-color":"#f8f8f8"});
      this.getUserInfo()
      this.getTaobiList()
    }
  }
</script>
