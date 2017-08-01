<style scoped>
	.flex-ld-bottom {
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

	.userinfo-area {
		height: 11.5rem;
		background: url(/static/images/personal_bg.jpg) no-repeat top center;
		background-size: cover;
	}

	.user-info-box {
    position: relative;
		height: 5.3rem;
		padding: 0 1.6rem;
		/* background: url(/static/images/user_box_bg.jpg) no-repeat top center; */
		background-size: cover;
	}

	.user-info-box .name-id {
		padding: 0 0.5rem;
	}

	.user-info-box .check-jf {
		display: block;
		width: 7.6rem;
		height: 2.5rem;
		border: 1px solid #fff;
		border-radius: .3rem;
		color: #fff;
		text-align: center;
		line-height: 2.5rem;
		font-size: 1.2rem;
		margin: 0 0 0 0.5rem;
	}
  .user-info-box .temp{
    width:7rem;
  }

	.user-info-box .avator {
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
	}

	.user-info-box .user-name {
		font-size: 1.6rem;
		color: #fff;
	}

	.user-info-box .user-id {
		font-size: 1.2rem;
		color: #fff;
	}

  .quick-link{
    margin-left: 0.5rem;
  }

  .quick-link i:first-child{
    margin-right: 0.5rem;
  }

	.money-box {
		height: 6.2rem;
		padding: 0 1.6rem;
		/* background-color: #ff3d3d; */
	}

	.money-box .sep {
		height: 3.2rem;
		border-left: 1px solid #534277;
	}

	.money-box .each {
		height: 4.2rem;
		padding: 0 1rem;
	}

	.money-box .each .btn {
		display: block;
		width: 8rem;
		height: 2.2rem;
		line-height: 2.2rem;
		font-size: 1.2rem;
		text-align: center;
		color: #975c2c;
		background-color: #fec833;
		border-radius: 0.3rem;
		text-decoration: none;
	}

	.money-box .each .m-name {
		font-size: 1.3rem;
		color: #fff;
	}

	.money-box .each .m-count {
		font-size: 1.3rem;
		color: #ffff00;
	}

	.one-mall-iconfont {
		vertical-align: middle;
		margin-left: -.2rem;
	}

	.tab {
		line-height: 5.0rem;
    height: 3.5rem;
	}

	.tab > a {
		color: #000;
		font-size: 1.6rem;
		line-height: 3.5rem;
		text-align: center;
		text-decoration: none;
		position: relative;
	}

	.tab > a.active {
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

	.tab > a.active .arrow-drop {
		color: #ff4a4a;
	}

	.select-section {
    /* 修复高度问题 */
    height: 3.5rem;
	  text-align: center;
	  box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
	  background-color: #fff;
	}

	.record-box {
		/*background: #f8f8f8 url(/static/images/personal_list_bg.jpg) no-repeat top center;*/
		padding-top: 1.2rem;
	}

	.record-box .no-record {
		height: 7rem;
		text-align: center;
		font-size: 1.3rem;
		color: #898989;
		background: url(/static/images/norecord_bg.png) no-repeat top center;
		padding-top: 20rem;
		background-size: cover;
	}

	.record-list .list-li {
		border-top: 1px solid #dfdfdf;
		border-bottom: 1px solid #dfdfdf;
		background-color: #fff;
		margin-bottom: 1.2rem;
		padding: 0 0 0 1.6rem;
	}

	.record-list .list-li .goods-c {
		height: 8.9rem;
		border-bottom: 1px solid #dfdfdf;
		position: relative;
	}

	.record-list .list-li .goods-c .img-box {
		position: relative;
		width: 6.9rem;
		height: 6.9rem;
		margin-right: 1.6rem;
	}

	.record-list .list-li .goods-c .img-box .fenqu-icon {
		display: block;
		width: 2.5rem;
		height: 3.2rem;
		background: url(/static/images/fenqu_icon.png) no-repeat center center;
		background-size: cover;
		position: absolute;
		top: 0;
		left: 0;
	}

	.record-list .list-li .goods-c .goods-img {
		width: 6.9rem;
		height: 6.9rem;
	}

	.record-list .list-li .goods-c .goods-info > p {
		line-height: 2rem;
		font-size: 1.2rem;
		color: #898989;
	}

	.record-list .list-li .goods-c .goods-info .g-name {
		font-size: 1.4rem;
		color: #000;
	}

	.record-list .list-li .goods-c .lucky-icon {
		width: 5.4rem;
		height: 2.9rem;
		background: url(/static/images/cgn.png) no-repeat center center;
		background-size: cover;
		margin-left: 2.6rem;
		position: absolute;
		top: 4.8rem;
		right: 2.8rem;
	}

	.record-list .list-li .goods-c .check-detail {
		font-size: 1.2rem;
		color: #329dff;
		margin-left: .4rem;
	}

	.record-list .list-li .l-bottom-box {
		height: 4.2rem;
		padding-right: 1.6rem;
	}

	.record-list .list-li .l-bottom-box .win-info {
		font-size: 1.2rem;
		color: #898989;
	}

	.record-list .list-li .l-bottom-box .check-detail {
		font-size: 1.2rem;
		color: #329dff;
	}

	.record-list .list-li .l-bottom-box .check-detail .one-mall-iconfont {
		color: #bbb;
	}

	.record-list .list-li .l-bottom-box .unlottery-box {
		width: 70%;
		height: 2.5rem;
		font-size: 1.2rem;
		color: #898989;
	}

	.record-list .list-li .l-bottom-box .buy-btn {
		display: inline-block;
		width: 6.6rem;
		height: 3.1rem;
		font-size: 1.2rem;
		line-height: 3.1rem;
		text-align: center;
		color: #ff4a4a;
		border: 1px solid #ff4a4a;
		border-radius: .4rem;
	}

	.share-list .share-list-li {
		background-color: #fff;
		padding: 1.2rem 1.5rem;
		border-top: 1px solid #dfdfdf;
		/*background-color: #f8f8f8;*/
	}

	.share-list .share-list-li:first-child {
		border-top: 0;
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

	.share-list .share-list-li .avator {
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
	}

	.share-list .share-list-li .share-box {
		margin-left: 1.2rem;
	}

	.share-list .share-list-li .s-user-name {
		font-size: 1.6rem;
		color: #329dff;
		margin-bottom: .6rem;
	}

	.share-list .share-list-li .s-title {
		font-size: 1.4rem;
		color: #666;
		line-height: 1.8rem;
		word-break:break-word;
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

	.float-kf {
		display: block;
		width: 4.4rem;
		height: 4.4rem;
		background: url("/static/images/kf.png") no-repeat center center;
		position: fixed;
		bottom: 8.5rem;
		right: 1.6rem;
		background-size: cover;
	}

	.header-active {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 100;
		border-bottom: 1px solid #dfdfdf;
	}

	.cus {
		font-size: 2.2rem;
    color: #fff;
	}

  .back-home-kefu {
    z-index: 1000;
    font-size: 2.5rem;
    line-height: 3rem;
    padding: .5rem;
    position: fixed;
    width: 3rem;
    height: 3rem;
    bottom: 6.5rem;
    right: 1.5rem;
    border-radius: 50%;
    background-color: #ff4a4a;
    text-align: center;
    color: #fff;
  }
  .qu {
    width:15rem;
    height:4rem;
    background:red;
    text-align:center;
    line-height:4rem;
    color:#fff;
    font-size:1.6rem;
    border-radius:.8rem;
    margin: 2rem auto;
  }
</style>

<template>
	<app-header :title="title"></app-header>

	</section>
    <!-- 填充 -->
    <section v-if="!showHeader" class="tab bg-fff flex"></section>
    <!-- 填充 -->

    <section id="J_top_fixed" class="tab bg-fff flex" :class="{'header-active': !showHeader}">
      <a class="tab-a flex-1" :class="{'active':tabIndex == 0}"  @click="tabChange(0)">全部参与</a>
      <a class="tab-a flex-1" :class="{'active':tabIndex == 1}"  @click="tabChange(1)">进行中</a>
      <a class="tab-a flex-1" :class="{'active':tabIndex == 2}"  @click="tabChange(2)">已揭晓</a>
    	<a class="tab-a flex-1" :class="{'active':tabIndex == 3}"  @click="tabChange(3)">幸运记录</a>
    </section>
    <section class="record-box" v-show="tabIndex == 0 || tabIndex == 1 || tabIndex == 2 || tabIndex == 3">
    	<div class="no-record" v-if="recordList.length == 0">
    		{{noRecordTxt}}
        <div class="qu" v-link = {name:"home"}>立即夺宝</div>
    	</div>
    	<ul class="record-list" v-else>
    		<li class="list-li" v-for="item in recordList">
    			<div class="goods-c flex">
    				<div class="img-box">
    					<img :src="item.goodsImg" alt="商品" class="goods-img" v-link="'/dr-subarea-detail/'+item.numberID" v-if="item.goodsType==1">
    					<img :src="item.goodsImg" alt="商品" class="goods-img" v-link="'/details/'+item.numberID" v-else>
    					<i class="fenqu-icon" v-if="item.isSubarea==1"></i>
    				</div>
    				<div class="goods-info">
    					<p class="g-name" v-link="'/dr-subarea-detail/'+item.numberID" v-if="item.goodsType==1">
    						{{item.goodsInfo}}
    					</p>
    					<p class="g-name" v-link="'/details/'+item.numberID" v-else>
    						{{item.goodsInfo}}
    					</p>
    					<p class="g-num">
    						期号：{{item.nums}}
    					</p>
    					<p class="g-join" v-if="item.isSubarea==1">
    						我已参与：<em class="color-red">{{showFenqu(item.joinNum)}}</em>
    					</p>
    					<p class="g-join" v-else>
    						我已参与：<em class="color-red">{{item.joinNum}}</em>人次
    					</p>
    				</div>
            <!-- 获奖的icon -->
    				<i v-link="'/details/'+item.numberID" class="lucky-icon" v-if="+item.isHis == 1"></i>
    			</div>
    			<div class="l-bottom-box flex-ld">
    				<template v-if="+item.isLottery == 1">
	    				<span class="win-info">获得者：{{item.getter}}</span>
	    				<template v-if="item.isHis==1">
	    					<a class="check-detail" v-if="item.isVirtual==1" v-link="'/confirm-goods/'+item.numberID">卡密已派放<i class="one-mall-iconfont icon-guide"></i></a>
	    					<a class="check-detail" v-else v-link="'/confirm-goods/'+item.numberID">查看详情<i class="one-mall-iconfont icon-guide"></i></a>
	    				</template>
	    				<template v-else>
	    					<a class="check-detail" v-if="item.goodsType==1" v-link="'/dr-subarea-detail/'+item.numberID">查看详情<i class="one-mall-iconfont icon-guide"></i></a>
	    					<a class="check-detail" v-else v-link="'/details/'+item.numberID">查看详情<i class="one-mall-iconfont icon-guide"></i></a>
	    				</template>
    				</template>
    				<template v-else>
    					<div class="unlottery-box flex-col-end">
	    					<p class="unlottery-info flex-ld">
	    						<span>总需人次：{{item.needAll}}</span>
	    						<span>剩余：<em class="c-ffa46b">{{item.needSurplus}}</em></span>
	    					</p>
	    					<goods-progress :all="item.needAll" :last="item.needAll - item.needSurplus" ></goods-progress>
    					</div>
    					<a class="buy-btn" v-link="'/dr-subarea-detail/'+item.numberID" v-if="item.goodsType==1">再次购买</a>
    					<a class="buy-btn" v-link="'/details/'+item.numberID" v-else>再次购买</a>
    				</template>
    			</div>
    		</li>
    	</ul>
    </section>
    <section class="record-box" v-show="tabIndex == 4">
     	<div class="no-record" v-if="recordList.length == 0">
    		{{noRecordTxt}}
    	</div>
     	<ul class="share-list" v-else>
     		<li class="share-list-li flex-top" v-for="item in recordList">
          <ul class="date">
            <li v-if="item.isToday == 1" class="today">今天</li>
            <template v-else>
              <li>{{item.dateDay}}</li>
              <li>{{item.dateMonth}}月</li>
            </template>
          </ul>
				<div class="share-box flex-1">
					<p  class="s-user-name">{{item.userName}}</p>

					<p class="s-goods-name"><span>获得商品：</span>{{item.shareGoodsInfo}}</p>
					<h4 class="s-title" v-link="'/shaidandetail/'+item.shareId">{{item.shareTitle}}</h4>
					<!--<p class="s-num">期号：{{item.nums}}</p>-->
					<p class="s-text">
						{{item.shareTxt}}
					</p>
					<div class="s-img-box" :class="{'four':item.shareImgList.length == 4}">
						<img class="s-img" v-bind:src="img" v-for="img in item.shareImgList">
					</div>
					<praise-area :is-praise="item.isPraise" :praise-num="item.praiseNum" :shareid="item.shareId"></praise-area>
				</div>
     		</li>
     	</ul>
    </section>

  <!-- 返回按钮 -->
  <go-back></go-back>
</template>

<script>
	import Vue from 'vue';
	import AppHeader from '../../components/common/header/app-header';
	import GoodsProgress from '../../components/common/progress/goods-progress';
	import PraiseArea from '../../components/feature/about-share-order/praise-area';
  import {showReview} from '../../vuex/actions';
  import GoBack from '../../components/feature/common/goback.component';
    export default{
    	components: {
    		AppHeader,
    		GoodsProgress,
    		PraiseArea,
    		GoBack
    	},
    	data() {
    		return {
    			title:"一元夺宝",
    			type:"setting",
    			selectConfig:{
    				selecting:0,
    				selectValue:0
    			},
    			tabIndex:this.$route.params.index,
    			noRecordTxt:"您还没有参与记录哦",
    			recordPage:1,
    			recordLoadAll:false, //记录是否加载完
    			recordList:[],
    			waypoint:null,
    			showHeader:true
    		}
    	},
    	mounted() {
        //this.tabChange(this.$route.params.index);
    		$("body").css({"background-color":"#f8f8f8"});
        //绑定滚动
        mallUtils.funs.scroll(this.bindScrollEvent);
    		this.getRecordList(Vue.OneMallUrl.personal_index,true);

    		//选项卡地方滚动到头部固定
    		var _this = this;
    		setTimeout(function(){
    			_this.waypoint = new Waypoint({
    				element: document.getElementById('J_top_fixed'),
    				handler:function(direction){
//    					_this.showHeader = !_this.showHeader;
              if('down' === direction) {
                _this.showHeader = false;
              }
              else if('up' === direction) {
                _this.showHeader = true;
              }
    				}
    			})
    		}, 800);
    	},
    	methods: {
    		selectType(){
    			if(this.selectConfig.selecting == 0){
    				return;
    			}else{
    				this.tabChange(this.selectConfig.selectValue);
    			}
    		},
    		//类别切换
    		tabChange(i){
    			this.tabIndex = i;
    			if(i == 3) {
    				this.noRecordTxt = "您还没有幸运记录哦";
    				this.selectConfig.selecting = 1;
    			}else if(i == 1){
    				this.noRecordTxt = "还没有进行中的记录";
    				this.selectConfig.selecting = 1;
    			}else{
    				this.noRecordTxt = "您还没有参与记录哦";
    				this.selectConfig.selectValue = i;
    				this.selectConfig.selecting = 0;
    			}
    			this.recordPage = 1;
    			this.recordLoadAll = false;
    			this.getRecordList(Vue.OneMallUrl.personal_index_more);
    		},
    		//获取记录数据 url获取记录数据的url地址（第一次加载数据和下拉加载更多及切换获取的数据url不同并且返回的数据不同。第一次进来的包括用户信息，下拉及切换没有）
    		getRecordList(url,first){
    			var _this = this,
    				params = {
    					type:_this.tabIndex,
    					page:_this.recordPage
    				};
    			mallUtils.funs.unscroll(_this.bindScrollEvent);
    			if(!_this.recordLoadAll){
    				Vue.OneMallHttp(this).GET(params,url).then(function(data){
    					if(params.page == 1){
    						_this.recordList = data.result.list.list;
    					}else{
    						_this.recordList = _this.recordList.concat(data.result.list.list);
    					}
    					//是否加载完全
    					_this.recordLoadAll = (data.result.list.list.length === 0);
    					_this.recordPage++;
    					mallUtils.funs.scroll(_this.bindScrollEvent);
    				})
    			}
    		},
    		//绑定上拉滚动加载更多数据
    		bindScrollEvent(){
    			if(mallUtils.screen.height + document.body.scrollTop + 50 >= document.body.offsetHeight){
    				this.getRecordList(Vue.OneMallUrl.personal_index);
    			}
    		},
    		showFenqu(arryFenqu){
    			var text = '';
    			for (var i = 0; i < arryFenqu.length; i++){
    				text +='['+arryFenqu[i]+']';
    			}
    			return text;
    		}
    	},
    	destroyed(){
    		$("body").css({"background-color":"#fff"});
    		if(this.waypoint){
    			this.waypoint.destroy();
    		}
        mallUtils.funs.unscroll(this.bindScrollEvent);
    	}
    }
</script>
