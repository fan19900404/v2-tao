<style scoped>
.jiexiao-list {
	width: 100%;
	border-top: 1px solid #dfdfdf;
	border-bottom: 1px solid #dfdfdf;
	background: #fff;
	box-sizing: border-box;
	margin: 0 0 1.5rem 0;
}

.jiexiao-list .jiexiao-title {
	width: 100%;
	height: 4.2rem;
	line-height: 4.2rem;
	font-size: 1.2rem;
	border-bottom: 1px solid #dfdfdf;
	text-align: center;
}

.jiexiao-list .jiexiao-title .lssue-time {
	color: #898989;
	margin: 0 0 0 1.2rem;
}

.jiexiao-con {
	padding: 1rem 1.5rem;
	position: relative;
}

.jiexiao-con .fenqu-tip {
	display: block;
	width: 1.5rem;
	height: 3rem;
	padding: .2rem .5rem 0;
	background: #329dff;
	position: absolute;
	right: 8%;
	top: -1px;
	word-wrap: break-word;
	text-align: center;
	color: #fff;
	line-height: 1.1rem;
}

.jiexiao-con .fenqu-tip .jt {
	display: block;
	width: 0;
	height: 0;
	border-left: 1.3rem solid transparent;
	border-right: 1.3rem solid transparent;
	border-bottom: .8rem solid #fff;
	position: absolute;
	bottom: -1px;
	left: 0;
}

.jiexiao-con .user-img {
	display: block;
	width: 4rem;
	height: 4rem;
	border-radius: 4rem;
	overflow: hidden;
	margin: 0 1.8rem 0 0;
}

.jiexiao-con .user-img img {
	width: 4rem;
}

.jiexiao-con .jiexiao-con-main {
	text-align: left;
	font-size: 1.2rem;
	line-height: 1.9rem;
}

.jiexiao-con .jiexiao-con-main .pd-news-list {
	color: #898989;
}

.color-blue {
	color: #329dff;
}

.color-red {
	color: #ff4a4a;
}

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

</style>

<template>
	<app-header :title="title"></app-header>
  	<!--<app-detail-slider :auto="auto"></app-detail-slider>-->

	<div class="jiexiao-list" v-for="item in historyList" data-link="{{item._link}}" >
		<p class="jiexiao-title">
			<span class="lssue-num">期号：{{item.lssue_num}}</span>
			<span class="lssue-time">(揭晓时间：{{getFormatterDate(item.jx_time)}})</span>
		</p>
		<div class="jiexiao-con flex center">
			<span class="fenqu-tip" v-show="item.is_area !== 0">分区<s class="jt"></s></span>
			<a v-show="item.is_area === 0" class="user-img" href="#/details/{{item.numberID}}" title="{{item._title}}">
				<img :src="item.user_img" alt="">
			</a>
			<a v-show="item.is_area !== 0" class="user-img" href="#/details/{{item.numberID}}" title="{{item._title}}">
				<img :src="item.user_img" alt="">
			</a>
			<div class="jiexiao-con-main">
				<p class="pd-name">{{item._title}}</p>
				<p class="pd-news-list">
          获得者：<span class="color-blue">{{item.win_name}}</span>
          <!-- IP 暂时去掉 -->
          <!--({{item.win_place}})-->
        </p>
				<p class="pd-news-list">用户ID：{{item.user_id}}(唯一不变的标识)</p>

				<p class="pd-news-list" v-show="item.is_area !== 0">幸运号码：<span class="color-red">{{item.win_num}}[{{item.is_area}}区]</span></p>
				<p class="pd-news-list">幸运号码：<span class="color-red">{{item.win_num}}</span></p>

				<p class="pd-news-list" v-show="item.is_area === 0">本期参与：<span class="color-red">{{item.take_num}}</span>人次</p>
			</div>
		</div>
	</div>

	<!-- loading more data info -->
    <p v-show="isLoading" class="loading"></p>
    <p v-show="isLoading" class="loading-more-msg msg">正在加载中...</p>
    <p v-show="isAllData" class="no-more msg">没有更新的数据了</p>
    <!-- loading more data info -->

  <app-bottom-bar></app-bottom-bar>
</template>

<script>
	import AppHeader from '../../oldComponents/common/header/app-header';
  import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';

  export default {
		components: {
			AppHeader,
      AppBottomBar
		},
		data:function(){
			return {
				title:"往期揭晓",
				type:"account",
				result:{},
				historyList:[],
				historyListAllLoaded:false, //即将揭晓数据是否加载完全
				historyListNextPage:2, //即将揭晓数据加载更多的页码
				config: {
			        curPage: 1,
			        type: 'history',
			        goodsID: this.$route.params.goodsTermId
		        },
		        // 关于加载更多的处理
        		// 关于加载更多
        		isLoading: false,
        		isAllData: false,
			}
		},
	    computed: {
	      query: function (){
	        return {
	          type: this.config.type,
	          page: this.config.curPage,
	          goodsID: this.$route.params.goodsTermId
	        }
	      }
	    },
		destroyed(){
			mallUtils.funs.unscroll(this.touchLoading);
		},
		methods: {
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
	          console.log('不能x够加载更多的数据了...');
	        }
	        else {
	          this.isLoading = true;
	          this.config.curPage++;
	          this.getGoods(this.query);
	        }
	      },
	      getGoods(){
	        var that = this;
	        that.isLoading = true;
	        Vue.OneMallHttp(this).GET(that.query, Vue.OneMallUrl.jiexiao_index_rule)
	          .then(function (res) {
	            if (10000 === res.code) {
	              that.isLoading = false;
	              if(0 === res.result.length) {
	                that.isAllData = true;
	              }
	              else {
	                    that.historyList = that.historyList.concat(res.result);
	                	that.isAllData = false;
	              }
	            }
	            // 处理异常的请求
	            else {
	              //  TODO
	            }
	          })
	      },
			getFormatterDate(date) {
				return mallUtils.date.format(date*1000,'yyyy-MM-dd hh:mm')
			}
		},
		mounted() {
			$("body").css("background","#f8f8f8");

			var _this = this;
			Vue.OneMallHttp(this).GET({"type": "history","goodsID": _this.$route.params.goodsTermId},Vue.OneMallUrl.jiexiao_index_rule).then(function(data){
				_this.historyList = data.result;
			});

			//绑定滚动
			mallUtils.funs.scroll(this.touchLoading);
		}
	}
</script>

