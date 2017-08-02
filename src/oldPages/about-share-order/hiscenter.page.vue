<style scoped>

  .flex-ld-end {
    display:box;
    display:-webkit-box;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .flex-col-end {
    display:box;
    display:-webkit-box;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .a-cgn {
    display: inline-block;
    width: 5.4rem;
    height: 2.9rem;
    background: url(/static/images/cgn.png) no-repeat center center;
    background-size: cover;
  }

  .his-userbox {
    padding: 1.5rem 1.6rem;
    background-color: #f8f8f8;
  }

  .avator {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    margin: 0 1.2rem 0 0;
  }

  .user-info .user-name {
    font-size: 1.6rem;
    color: #329dff;
    line-height: 2.2rem;
  }

  .user-info .user-id {
    font-size: 1.4rem;
    color: #000;
    line-height: 2.2rem;
  }

  .tab {
    height: 4.7rem;
    line-height: 4.7rem;
  }

  .tab .tab-a {
    color: #000;
    font-size: 1.6rem;
    line-height: 4.6rem;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    position: relative;
  }
  .tab .tab-a.active {
    color: #ff4a4a;
  }

  .tab .tab-a.active:before {
    content: " ";
    font-size: 0;
    height: 2px;
    background-color: #ff4a4a;
    display: inline-block;
    width: 8.4rem;
    position: absolute;
    bottom: -1px;
    left: 50%;
    margin: 0 0 0 -4.2rem;
  }

  .record-box {
    background-color: #f8f8f8;
    /* min-height: 29.8rem; */
    overflow-y: scroll;
  }

  /* .record-box .mint-loadmore {
    overflow-y: scroll;
  } */

  .record-list .list-li {
    /* height: 17.2rem; */
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
    background-color: #fff;
    margin-bottom: 1.2rem;
    padding: 0 0 0 1.6rem;
  }

  .record-list .list-li .goods-c {
    padding: 1.6rem 1.6rem 1.6rem 0;
    border-bottom: 1px solid #dfdfdf;
  }

  .record-list .list-li .goods-c .goods-img {
    width: 9.2rem;
    height: 9.2rem;
    margin-right: 1.5rem;
  }

  .record-list .list-li .goods-c .info-name {
    font-size: 1.2rem;
    line-height: 1.7rem;
    color: #000;
  }

  .record-list .list-li .goods-c .info-name {
    margin-bottom: 1.4rem;
  }

  .record-list .list-li .goods-c .qihao li {
    font-size: 1.2rem;
    line-height: 1.7rem;
    color: #898989;
  }

  .record-list .list-li .goods-c .a-cyxq {
    font-size: 1.2rem;
    line-height: 1.7rem;
    color: #329dff;
  }

  .record-list .list-li .l-bottom-box {
    height: 5rem;
    padding-right: 1.6rem;
  }

  .record-list .list-li .l-bottom-box .bottom-btn {
    display: inline-block;
    width: 6.3rem;
    height: 2.4rem;
    font-size: 1.2rem;
    line-height: 2.4rem;
    text-align: center;
    color: #ff6709;
    border: 1px solid #ff6709;
    border-radius: .4rem;
  }

  .record-list .list-li .l-bottom-box .lottery-info {
    width: 70%;
    height: 2.5rem;
    font-size: 1.2rem;
    color: #898989;
  }

  .record-list .list-li .l-bottom-box .lottery-info .unlottery-info {
    font-size: 1rem;
  }

  /*晒单列表*/
  .share-list .share-list-li {
    background-color: #fff;
    padding: 1.2rem 1.5rem;
    border-top: 1px solid #dfdfdf;
  }

  .share-list .share-list-li .date li {
    width: 4.0rem;
    font-size: 1.6rem;
    color: #000;
    font-weight: bold;
    text-align: center;
  }

  .share-list .share-list-li .date li:first-child {
    font-size: 2.4rem;
  }

  .share-list .share-list-li .date li:first-child.today {
    font-size: 2.0rem;
    text-align: left;
  }

  .share-list .share-list-li .share-box {
    margin-left: 1.2rem;
  }

  .share-list .share-list-li .s-title {
    font-size: 1.4rem;
    color: #666;
    line-height: 1.8rem;
  }

  .share-list .share-list-li .s-goods-name {
    font-size: 1.4rem;
    line-height: 2.0rem;
    color: #cdcdcd;
  }

  .share-list .share-list-li .s-num {
    font-size: 1.2rem;
    line-height: 2.0rem;
    color: #cdcdcd;
    margin-bottom: 0.7rem;
  }

  .share-list .share-list-li .s-text {
    font-size: 1.4rem;
    line-height: 1.7rem;
    color: #898989;
    margin-bottom: 1.0rem;
  }

  .share-list .share-list-li .four {
    width: 20rem;
  }

  .share-list .share-list-li .s-img {
    width: 8.6rem;
    height: 8.6rem;
    margin: 0 .5rem .6rem 0;
  }

  .share-list .share-list-li .praise-line {
    text-align: right;
    line-height: 1.2rem;
    margin-top: .6rem;
  }

  .share-list .share-list-li .praise-line .praise-num {
    font-size: 1.2rem;
    color: #bbb;
  }
</style>

<template>
  <!-- <div class="wrap" id="wrap">
    <div id="scroller"> -->
    <app-header :title="title" :type="type"></app-header>
    <section class="his-userbox flex bb">
      <img class="avator" :src="result.avatar" alt="头像">
      <ul class="user-info">
        <li class="user-name">{{result.username}}</li>
        <li class="user-id">淘游ID:{{result.userId}}</li>
      </ul>
    </section>
    <section class="flex bg-fff tab bb">
      <a href="javascript:void(0)" class="tab-a flex-1" :class="{'active':tabIndex == 0}" @click="tabChange(0)">夺宝记录</a>
      <a href="javascript:void(0)" class="tab-a flex-1" :class="{'active':tabIndex == 1}" @click="tabChange(1)">幸运记录</a>
      <a href="javascript:void(0)" class="tab-a flex-1" :class="{'active':tabIndex == 2}" @click="tabChange(2)">晒单记录</a>
    </section>
    <section class="record-box" v-show="tabIndex == 0">
      <ul class="record-list">
        <li class="list-li" v-for="snatch in snatchRecordList">
          <div class="goods-c flex">
            <img class="goods-img flex-1" :src="snatch.goodsImg" alt="商品" v-link="'/dr-subarea-detail/'+ snatch.numberID" v-if="snatch.goodsType==1">
            <img class="goods-img flex-1" :src="snatch.goodsImg" alt="商品" v-link="'/details/'+ snatch.numberID" v-else>
            <div class="goods-info flex-2">
              <p class="info-name"  v-link="'/dr-subarea-detail/'+ snatch.numberID" v-if="snatch.goodsType==1">
                {{snatch.goodsInfo}}
              </p>
              <p class="info-name"  v-link="'/details/'+ snatch.numberID" v-else>
                {{snatch.goodsInfo}}
              </p>
              <div class="join-box flex-ld-end">
                <ul class="qihao">
                  <li>期号：{{snatch.nums}}</li>
                  <li>本期参与：<span class="c-ff5656">{{snatch.joinNum}}</span>人次</li>
                </ul>
                <!-- 好友获奖时的恭喜按钮 暂时没有分区的-->
                <a href="javascript:;" class="a-cgn" v-if="snatch.isHis == 1" v-link="'/details/'+snatch.numberID"></a>
                <!-- 好友没获奖时的情况 -->
                <a class="a-cyxq" v-link="'/dr-participate-detail/'+ snatch.numberID+'?userid='+snatch.userId" v-else>参与详情</a>
              </div>
            </div>
          </div>
          <div class="l-bottom-box flex-ld">
            <!-- 未开奖情况 -->
            <template v-if="snatch.status !== 4">
              <div class="lottery-info flex-col-end">
                <goods-progress :all="snatch.needAll" :last="snatch.needAll - snatch.needSurplus" ></goods-progress>
                <p class="unlottery-info flex-ld">
                  <span>总需人次：{{snatch.needAll}}</span>
                  <span>剩余：<em class="c-ffa46b">{{snatch.needSurplus}}</em></span>
                </p>
              </div>
              <a v-link="'/dr-subarea-detail/'+snatch.numberID" class="bottom-btn" v-if="snatch.goodsType==1">我也买</a>
              <a class="bottom-btn" v-link="'/details/'+snatch.numberID" v-else>我也买</a>
            </template>
            <!-- 已开奖情况 -->
            <template v-else>
              <div class="lottery-info flex-ld">
                <span>获得者：{{snatch.getter}}</span>
                <span><em class="c-ffa46b">{{snatch.getterJoin}}</em>人次</span>
              </div>
              <a v-link="'/dr-subarea-detail/'+snatch.goodsNextId" class="bottom-btn" v-if="snatch.goodsType==1">立即参与</a>
              <a v-show="snatch.goodsNextId != 0" class="bottom-btn" v-link="'/details/'+snatch.goodsNextId" v-else>立即参与</a>
            </template>
          </div>
        </li>
      </ul>
    </section>
    <section class="record-box" v-show="tabIndex == 1">
      <ul class="record-list">
        <template v-for="lucky in lukcyRecordList">
          <li class="list-li">
            <div class="goods-c flex">
              <img class="goods-img flex-1" :src="lucky.goodsImg" alt="商品" v-link="'/dr-subarea-detail/'+ lucky.numberID" v-if="lucky.goodsType==1">
              <img class="goods-img flex-1" :src="lucky.goodsImg" alt="商品" v-link="'/details/'+ lucky.numberID" v-else>
              <div class="goods-info flex-2">
                <p class="info-name"  v-link="'/dr-subarea-detail/'+ lucky.numberID" v-if="lucky.goodsType==1">
                  {{lucky.goodsInfo}}
                </p>
                <p class="info-name"  v-link="'/details/'+ lucky.numberID" v-else>
                  {{lucky.goodsInfo}}
                </p>
                <div class="join-box flex-ld-end">
                  <ul class="qihao">
                    <li>期号：{{lucky.nums}}</li>
                    <li>本期参与：<span class="c-ff5656">{{lucky.joinNum}}</span>人次</li>
                  </ul>
                  <!-- 好友获奖时的恭喜按钮 暂时没有分区的链接-->
                  <a href="javascript:;" class="a-cgn" v-if="lucky.isHis == 1"  v-link="'/details/'+lucky.numberID"></a>
                  <!-- 好友没获奖时的情况 -->
                  <a class="a-cyxq" v-link="'/dr-participate-detail/'+ lucky.numberID+'?userid='+lucky.userId" v-else>参与详情</a>
                </div>
              </div>
            </div>
            <div class="l-bottom-box flex-ld">
              <!-- 未开奖情况 -->
              <template v-if="lucky.isLottery == 0">
                <div class="lottery-info flex-col-end">
                  <goods-progress :all="lucky.needAll" :last="lucky.needAll - lucky.needSurplus" ></goods-progress>
                  <p class="unlottery-info flex-ld">
                    <span>总需人次：{{lucky.needAll}}</span>
                    <span>剩余：<em class="c-ffa46b">{{lucky.needSurplus}}</em></span>
                  </p>
                </div>
                <a v-link="'/dr-subarea-detail/'+lucky.numberID" class="bottom-btn" v-if="lucky.goodsType==1">我也买</a>
                <a class="bottom-btn" v-link="'/details/'+lucky.numberID" v-else>我也买</a>
              </template>
              <!-- 已开奖情况 -->
              <template v-else>
                <div class="lottery-info flex-ld">
                  <span>获得者：{{lucky.getter}}</span>
                  <span><em class="c-ffa46b">{{lucky.getterJoin}}</em>人次</span>
                </div>
                <a v-link="'/dr-subarea-detail/'+lucky.goodsNextId" class="bottom-btn" v-if="lucky.goodsType==1">立即参与</a>
                <a v-show="lucky.goodsNextId != 0" class="bottom-btn" v-link="'/details/'+lucky.goodsNextId" v-else>立即参与</a>
              </template>
            </div>
          </li>
        </template>
      </ul>
    </section>
    <section class="record-box" v-show="tabIndex == 2">
      <ul class="share-list">
        <template v-for="s in shareRecordList">
          <li class="share-list-li flex-top">
            <ul class="date">
              <li v-if="s.isToday == 1" class="today">今天</li>
              <template v-else>
                <li>{{s.dateDay}}</li>
                <li>{{s.dateMonth}}月</li>
              </template>
            </ul>
            <div class="share-box flex-1">

              <p class="s-goods-name"><span>获得商品：</span>{{s.shareGoodsInfo}}</p>
              <h4 class="s-title" v-link="'/shaidandetail/' + s.shareId">{{s.shareTitle}}</h4>
              <!--<p class="s-num">期号：{{s.nums}}</p>-->
              <p class="s-text">
                {{s.shareTxt}}
              </p>
              <div class="s-img-box" :class="{'four':s.shareImgList.length == 4}">
                <img class="s-img" v-bind:src="img" v-for="img in s.shareImgList" >
              </div>
              <praise-area :p-date="" :is-praise="s.isPraise" :praise-num="s.praiseNum" :shareid="s.shareId"></praise-area>
            </div>
          </li>
        </template>
      </ul>
    </section>
    <!-- </div>
      </div> -->

    <!-- 底部菜单兰 -->
    <app-bottom-bar></app-bottom-bar>
</template>

<script>
  import 'mint-loadmore/lib/index.css';
  import Vue from 'vue';
  import AppHeader from '../../oldComponents/common/header/app-header';
  import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';
  import GoodsProgress from '../../oldComponents/common/progress/goods-progress';
  import PraiseArea from '../../oldComponents/feature/about-share-order/praise-area';
  export default {
    components:{
      AppHeader,
      AppBottomBar,
      GoodsProgress,
      PraiseArea
    },
    data(){
      return {
        title:"Ta的个人中心",
        tabIndex:0,
        result:{},
        upDataStatus:0,
        snatchRecordList:[],
        snatchAllLoaded:false, //夺宝记录数据是否加载完全
        snatchNextPage:1, //夺宝记录数据加载更多的页码
        lukcyRecordList:[], //
        luckyAllLoaded:false, //幸运记录数据是否加载完全
        luckyNextPage:1, //幸运记录数据加载更多的页码
        shareRecordList:[],
        shareAllLoaded:false, //分享记录数据是否加载完全
        shareNextPage:1,//分享记录数据加载更多的页码
        isShow:false,//图片是否放大
        url:{}//点击选中图片的路径
      }
    },
    mounted() {
      $("body").css("background-color","#f8f8f8");
      //当前他的个人中心页面切换时触发滚动事件发现，在先绑定滚动事件，在给页面加载初始数据的时候不会触发滚动

      //绑定滚动
      mallUtils.funs.scroll(this.bindScrollData);
      //绑定页面数据
      this.bindData();
    },
    methods:{
      bindData(){
        //vue对象
        /*'/api/hiscenter_data'*/
        this.getPageRecordData(Vue.OneMallUrl.personal_his_center,true);
      },
      getPageRecordData(url,first){
        var _this = this,
          params = {uID:_this.$route.params.id};
        //触发滚动事件的时候先解绑之前的滚动事件，否则会在上一次滚动异步还没执行完时会再触发一次异步
        mallUtils.funs.unscroll(_this.bindScrollData);
        switch(_this.tabIndex){
          case 0:
            if(!_this.snatchAllLoaded){
              params.type = 1;
              params.page = _this.snatchNextPage;
              Vue.OneMallHttp(this).GET(params,url).then(function(data){
                if(params.page == 1){
                  _this.snatchRecordList = data.result.list;
                }else{
                  _this.snatchRecordList = _this.snatchRecordList.concat(data.result.list);
                }
                _this.snatchAllLoaded = (data.result.isLast == 1);
                _this.snatchNextPage++;
                mallUtils.funs.scroll(_this.bindScrollData);
                if(first){_this.result = data.result}
              })
            }
            break;
          case 1:
            if(!_this.luckyAllLoaded){
              params.type = 2;
              params.page = _this.luckyNextPage;
              Vue.OneMallHttp(this).GET(params,url).then(function(data){
                if(params.page == 1){
                  _this.lukcyRecordList = data.result.list;
                }else{
                  _this.lukcyRecordList = _this.lukcyRecordList.concat(data.result.list);
                }
                _this.luckyAllLoaded = (data.result.isLast == 1);
                _this.luckyNextPage++;
                mallUtils.funs.scroll(_this.bindScrollData);
                if(first){_this.result = data.result}
              })
            }
            break;
          case 2:
            if(!_this.shareAllLoaded){
              params.type = 3;
              params.page = _this.shareNextPage;
              Vue.OneMallHttp(this).GET(params,url).then(function(data){
                if(params.page == 1){
                  _this.shareRecordList = data.result.list;
                }else{
                  _this.shareRecordList = _this.shareRecordList.concat(data.result.list);
                }
                _this.shareAllLoaded = (data.result.isLast == 1);
                _this.shareNextPage++;
                mallUtils.funs.scroll(_this.bindScrollData);
                if(first){_this.result = data.result}
              })
            }
            break;
        }
      },
      tabChange(i){
        var _this = this;
        _this.tabIndex = i;
        /*
        *应章潮涌要求每次tab切换就重新请求数据，
        第一次进来页面时接口只返回了他的夺宝记录
        20160827 mjh
        */
        switch(_this.tabIndex){
          case 0:
            _this.snatchNextPage = 1;
            _this.snatchAllLoaded = false;
            break;
          case 1:
            _this.luckyNextPage = 1;
            _this.luckyAllLoaded = false;
            break;
          case 2:
            _this.shareNextPage = 1;
            _this.shareAllLoaded = false;
            break;
        }
        _this.getPageRecordData(Vue.OneMallUrl.personal_his_center_more_list);
      },
      bindScrollData(){
        if(mallUtils.screen.height + document.body.scrollTop + 50 >= document.body.offsetHeight){
          this.getPageRecordData(Vue.OneMallUrl.personal_his_center_more_list);
        }
      }
    },
    destroyed() {
      mallUtils.funs.unscroll(this.bindScrollData);
    }
  }
</script>
