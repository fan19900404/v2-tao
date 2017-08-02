<style scoped>


  /*晒单列表*/
  .share-list .share-list-li {
    background-color: #fff;
    padding: 1.2rem 1.5rem;
    border-top: 1px solid #dfdfdf;
  }

  .share-list .share-list-li .avator {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }

  .share-list .share-list-li .share-box {
    margin-left: 1.2rem;
    overflow-x: hidden;
  }

  .share-list .share-list-li .s-user-name {
    font-size: 1.6rem;
    color: #329dff;
    margin-bottom: .6rem;
  }

  .share-list .share-list-li .share-box .s-title {
    font-size: 1.4rem;
    color: #666;
    line-height: 1.8rem;
    word-break: break-word;
  }

  .share-list .share-list-li .s-goods-name {
    font-size: 1.4rem;
    line-height: 2.0rem;
    color: #cdcdcd;
    font-weight: bold;
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

  .share-list .share-list-li .praise-line .date {
    font-size: 1.4rem;
    color: #cdcdcd;
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
    background: url(/static/images/norecord_bg.png) no-repeat top center;
    padding-top: 20rem;
    background-size: cover;
  }
</style>

<template>
  <!--<app-header :title="title" :type="type" :isprev="0"></app-header>-->
  <!-- <app-header :title="title" :type="type"></app-header> -->
  <section v-show="noData" class="record-box">
    <div class="no-record">
      暂时还没有晒单记录哟!
    </div>
  </section>

  <ul v-show="!noData" class="share-list">
    <template  v-for="item in 10">
      <li class="share-list-li flex-top">
        <img class="avator" v-bind:src="item.avatar" alt="头像" v-link="'/hiscenter/' + item.userId">
        <div class="share-box flex-1">
          <p v-link="'/hiscenter/' + item.userId" class="s-user-name">{{item.username}}</p>

          <p class="s-goods-name clearfix"><span class="w95 overflow-ellipsis">获得商品：{{item.shareGoodsInfo}}</span></p>
          <h4 class="s-title" v-link="'/shaidandetail/'+item.shareId">{{item.shareTitle}}</h4>
          <!--<p class="s-num">期号：{{item.nums}}</p>-->
          <p class="s-text">
            {{item.shareTxt}}
          </p>
          <div class="s-img-box" :class="{'four':item.shareImgList.length == 4}">
            <candy-carousel v-if="$index === parentIndex" :item-index="$index" :img-list="a"></candy-carousel>
            <img @click="show($parent.$index, $index)" class="s-img" v-bind:src="img" v-for="img in a">
          </div>
          <praise-area :p-date="item.shareDate" :is-praise="item.isPraise" :praise-num="item.praiseNum" :shareid="item.shareId"></praise-area>
        </div>
      </li>
    </template>
  </ul>

  <!-- 底部菜单兰 -->
  <app-bottom-bar></app-bottom-bar>
</template>

<script>
  import Vue from 'vue';
  import CandyCarousel from '../../oldComponents/common/wechat-carousel/candy-carousel.component';
  import AppHeader from '../../oldComponents/common/header/app-header';
  import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';
  import PraiseArea from '../../oldComponents/feature/about-share-order/praise-area';
  import {showReview} from '../../vuex/actions';
  export default {
    components:{
      AppHeader,
      PraiseArea,
      AppBottomBar,
      CandyCarousel
    },
    data:function(){
      return {
        title:"晒单分享",
        shareList:[],
        shareDataAll:false, //是否已经加载全部晒单数据
        sharePage:1,
        // 没有数据
        noData: false,
        // 仿照微信的轮播
        a: [
          '/static/images/step-4.png',
          '/static/images/step-1.png',
          '/static/images/step-2.png',
          '/static/images/step-3.png'
        ],
        parentIndex: -1,
        isShow: false
      }
    },
    ready:function() {

      this.sharePage = 1;
      //绑定滚动
      mallUtils.funs.scroll(this.bindScrollData);
      this.getPageShareData();

    },
    methods:{
      show(parentIndex, index) {
        this.parentIndex = parentIndex;
        this.$broadcast('show-index', {
          parentId: parentIndex,
          id: index
        });
      },
      //获取晒单分享列表分页数据
      getPageShareData(){
        if(!this.shareDataAll){
          var _this = this,
            params = { page : _this.sharePage};
          //解除滚动绑定
          mallUtils.funs.unscroll(_this.bindScrollData);
          /*var url = '/api/shaidan_list';*/
          Vue.OneMallHttp().GET(params, Vue.OneMallUrl.share_order_list).then(function(data){
            if(params.page == 1){
              _this.shareList = data.result.list;
              // 判断是否有数据
              _this.noData = _this.shareList.length > 0 ? false : true;
            }else{
              _this.shareList = _this.shareList.concat(data.result.list);
            }
            _this.shareDataAll = (data.result.isLast == 1);
            _this.sharePage++;
            mallUtils.funs.scroll(_this.bindScrollData);

//            _this.shareList = _this.shareList.slice(1, 3);
//            _this.shareList = _this.shareList.slice(1, 2);
          })
        }
      },
      //绑定上拉加载事件
      bindScrollData() {
        if(mallUtils.screen.height + document.body.scrollTop + 50 >= document.body.offsetHeight){
          this.getPageShareData();
        }
      }
    },
    destroyed(){
      //关闭页面时解绑下拉
      mallUtils.funs.unscroll(this.bindScrollData);
    }
  }
</script>
