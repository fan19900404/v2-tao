<style scoped>
  .goods-list li {
    padding: 1rem 1.6rem;
    border-bottom: 1px solid #dfdfdf;
  }

  .goods-list li .img-box {
    width: 10rem;
    height: 10rem;
    margin: 0 1.2rem 0 0;
    position: relative;
  }

  .goods-list li .img-box .fq-icon {
    display: block;
    width: 2.2rem;
    height: 2.2rem;
    background: url(/oldStatic/images/new-subarea-icon.png) no-repeat center center;
    background-size: cover;
    position: absolute;
    left: 0;
    top: .5rem;
  }

  .goods-list li .right-box .goods-name {
    font-size: 1.2rem;
    color: #000;
    line-height: 2rem;
  }

  .goods-list li .right-box .p1 {
    font-size: .9rem;
    color: #898989;
    line-height: 1.8rem;
  }

  .goods-list li .right-box .p2 {
    font-size: 1rem;
    color: #898989;
    line-height: 1.8rem;
  }

  .lucky-icon {
    color: #ff4a4a;
    font-size: .9rem;
    margin: 0 .2rem 0 0;
  }

  /* 没有数据 */
  .record-box {
    padding-top: 1.2rem;
  }

  .record-box .no-record {
    height: 10rem;
    text-align: center;
    font-size: 1.3rem;
    color: #898989;
    background: url(/oldStatic/images/norecord_bg.png) no-repeat top center;
    padding-top: 20rem;
    background-size: cover;
  }
</style>

<template>
  <app-header :title="'最新揭晓'"></app-header>

  <section v-show="noData" class="record-box">
    <div class="no-record">
      暂时还没有揭晓的记录哟!
    </div>
  </section>

  <seciton v-show="!noData" class="goods-list-box">
    <ul class="goods-list">
      <li class="flex" v-for="item in waitList" v-link="getGoodsLink(item._type,item.numberID)">
        <div class="img-box">
          <img :src="item._img" width="100%" heigth="100%">
          <i class="fq-icon" v-if="item._type==10"></i>
        </div>
        <div class="right-box">
          <p class="goods-name">{{item._title}}</p>
          <p class="p1">期号：{{item.lssue_num}}</p>
          <template v-if="item.last_time>0">
            <p class="p2">揭晓倒计时：</p>
            <app-cd-new :unique-id="$index" :endtime="item.last_time" @timer-action="triggerCd"></app-cd-new>
          </template>
          <template v-else>
            <p class="p2">幸运号码：<span class="color-red">{{item.win_num}}</span></p>
            <p class="p2">获得者：<span class="color-red">{{item.win_name}}</span></p>
            <p class="p1">本期参与：<span class="color-red">{{item.luck_buy_um}}</span>人次</p>
            <p class="p2">揭晓时间：{{getFormatterDate(item.win_time)}}</p>
          </template>
        </div>
      </li>
      <li class="flex" v-for="item in readyList" v-link="getGoodsLink(item._type,item.numberID)">
        <div class="img-box">
          <img :src="item._img" width="100%" heigth="100%">
          <i class="fq-icon" v-if="item._type==10"></i>
        </div>
        <div class="right-box">
          <p class="goods-name">{{item._title}}</p>
          <p class="p1">期号：{{item.lssue_num}}</p>
          <p class="p2">幸运号码：<span class="color-red">{{item.win_num}}</span></p>
          <p class="p2">获得者：<span class="color-red">{{item.win_name}}</span></p>
          <p class="p1">本期参与：<span class="color-red">{{item.luck_buy_um}}</span>人次</p>
          <p class="p2">揭晓时间：{{getFormatterDate(item.win_time)}}</p>
        </div>
      </li>
    </ul>
  </seciton>
  <app-bottom-bar></app-bottom-bar>
</template>

<script>
  import Vue from 'vue';
  import AppHeader from '../../oldComponents/common/header/app-header';
  import AppCdNew from '../../oldComponents/feature/about-announcement/app-cd-new';
  import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';
  import {showReview} from '../../vuex/actions';
  export default {
    components: {
      AppHeader,
      AppCdNew,
      AppBottomBar
    },
    data:function(){
      return {
        waitList:[],
        readyList:[],
        readyListAllLoaded:true,
        readyListNextPage:1,
        // 没有数据
        noData: false
      }
    },
    mounted() {
      $("body").css("background","#fff");
      var _this = this;
      Vue.OneMallHttp(this).GET({type:'wait'},Vue.OneMallUrl.jiexiao_index_rule).then(function(res){
        if(res.code == 10000){
          _this.waitList = res.result;
        }
      })

      mallUtils.funs.scroll(this.bindScrollData);
      //默认进来页面的时候不能触发滚动事件防止上一个页面滚动后点击进来触发当前页面的滚动事件，故在这里绑定滚动事件之后再设置为可以触发滚动事件
      this.readyListAllLoaded = false;
      this.getReadyData();
    },
    destroyed() {
      mallUtils.funs.unscroll(this.bindScrollData);
    },
    methods: {
      getReadyData() {
        var _this = this;
        if(_this.readyListAllLoaded){
          return;
        }
        mallUtils.funs.unscroll(_this.bindScrollData);
        Vue.OneMallHttp(this).GET({type:'ready',page:_this.readyListNextPage},Vue.OneMallUrl.jiexiao_index_rule).then(function(res){
          if(res.code == 10000){
            if(res.result.length == 0){
              _this.readyListAllLoaded=true;
              // 修复没有数据时候什么也不显示
//              _this.noData = true;
            }else{
              if(_this.readyListNextPage == 1){
                _this.readyList = res.result;
                // 判断是否有数据
                _this.noData = _this.readyList.length > 0 ? false : true;
              }else{
                _this.readyList = _this.readyList.concat(res.result);
              }
              _this.readyListNextPage++;
              _this.readyListAllLoaded = false;
              mallUtils.funs.scroll(_this.bindScrollData);
            }
          }
        })
      },
      bindScrollData() {
        if(mallUtils.screen.height + document.body.scrollTop + 50 >= document.body.offsetHeight){
          this.getReadyData();
        }
      },
      //倒计时结束后触发
      triggerCd(args){
        this.waitList[args.id].last_time=0;
      },
      getFormatterDate(date) {
        return mallUtils.date.format(date*1000,'yyyy-MM-dd hh:mm')
      },
      getGoodsLink(type,numberId){
        var link = '';
        if(type == 0){
          link = '/details/'+numberId;
        }else{
          link = '/dr-subarea-detail/'+numberId;
        }
        return link;
      }
    },
    destroyed() {
      mallUtils.funs.unscroll(this.bindScrollData);
    }
  }
</script>
