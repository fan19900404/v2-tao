<style scoped>


	/*晒单列表*/
	.share-list .share-list-li {
		/*background-color: #fff;*/
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

  .no-record .go{
    display: block;
    width: 16rem;
    height: 4.5rem;
    line-height: 4.5rem;
    text-align: center;
    color: #fff;
    font-size: 1.4rem;
    border-radius: .5rem;
    background-color: #ff4a4a;
    margin: 3rem auto 0;
  }
</style>

<template>
	<!--<app-header :title="title" :type="type" :isprev="0"></app-header>-->
	<app-header :title="title" :type="type"></app-header>
  <section v-show="noData" class="record-box">
    <div class="no-record">
      <template v-if="$route.params.id > 0">
        您还没有晒单记录哦！
        <a class="go" v-link="{name: 'home'}">立即夺宝</a>
      </template>
      <template v-else>
        暂时还没有晒单记录哟!
      </template>
    </div>
  </section>

	<ul v-show="!noData" class="share-list">
		<template  v-for="item in shareList">
			<li class="share-list-li flex-top" :class="{'bgc-normal': $route.params.id === undefined, 'bgc-gray': $route.params.id !== undefined}">
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
            <candy-carousel v-if="$index === parentIndex" :item-index="$index" :img-list="item.shareImgList"></candy-carousel>
            <img @click="show($parent.$index, $index)" class="s-img" v-bind:src="img" v-for="img in item.shareImgList">
						<!--<img class="s-img" v-bind:src="img" v-for="img in item.shareImgList">-->
					</div>
					<praise-area :p-date="item.shareDate" :is-praise="item.isPraise" :praise-num="item.praiseNum" :shareid="item.shareId"></praise-area>
				</div>
			</li>
		</template>
	</ul>

  <!-- 底部菜单兰 -->
  <app-bottom-bar v-if="$route.params.id == undefined"></app-bottom-bar>

  <!-- 返回按钮 -->
  <go-back></go-back>
</template>

<script>
	import Vue from 'vue';
	import AppHeader from '../../components/common/header/app-header';
  import AppBottomBar from '../../components/common/footer/app-bottom-bar';
  import PraiseArea from '../../components/feature/about-share-order/praise-area';
  import {showReview} from '../../vuex/actions';
  import CandyCarousel from '../../components/common/wechat-carousel/candy-carousel.component';
  import GoBack from '../../components/feature/common/goback.component';
	export default {
		components:{
      AppHeader,
      PraiseArea,
      AppBottomBar,
      CandyCarousel,
      GoBack
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
        parentIndex: -1,
        isShow: false
			}
		},
		ready:function() {
			this.sharePage = 1;
			//绑定滚动
			mallUtils.funs.scroll(this.bindScrollData);
			// this.getPageShareData();
		},

    route: {
      data({ to: { params: { id }}}) {
        this.shareList = [];
        this.shareDataAll = false;
        this.sharePage = 1;

        $('body').css('background-color', (id > 0)?'#f8f8f8':'#fff');
        if(id && id > 0){
          this.title = '晒单记录';
        }
        this.getPageShareData();
      }
    },

		methods:{
      // 展示图片的轮播
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
          if(this.$route.params.id > 0){
            params.uID = this.$route.params.id;
          }
					//解除滚动绑定
					mallUtils.funs.unscroll(_this.bindScrollData);
					/*var url = '/api/shaidan_list';*/
					Vue.OneMallHttp(this).GET(params, Vue.OneMallUrl.share_order_list).then(function(data){
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
