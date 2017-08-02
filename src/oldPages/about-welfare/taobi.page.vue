<style scoped>
	.count-box {
		height: 7.3rem;
		background: #ff4a4a url(/static/images/wave_bg.png) no-repeat bottom center;
		background-size: contain;
	}

	.count-box .p-t {
		font-size: 1.3rem;
		color: #fff;
		text-align: center;
		line-height: 3.5rem;
	}

	.count-box .p-c {
		font-size: 2rem;
		color: #ffff00;
		text-align: center;
	}

	.recharge-box {
		padding: 2.8rem 1.6rem 0;
		height: 8.5rem;
	}

	.recharge-box .recharge {
		display: block;
		width: 100%;
		height: 4.3rem;
		line-height: 4.3rem;
		text-align: center;
		font-size: 1.8rem;
		color: #fff;
		background-color: #ff4a4a;
		border-radius: .5rem;
	}

	.recharge-box .tips {
		text-align: center;
		line-height: 3.3rem;
		font-size: 1.2rem;
		color: #bbbbbb;
	}

	.detail-list-box .title {
		padding: 0 1.6rem;
		font-size: 1.2rem;
		line-height: 4rem;
		background-color: #f5f5f5;
		border-top: 1px solid #dfdfdf
	}

	.detail-list .list-li {
		padding: 1rem 1.6rem;
		font-size: 1.4rem;
		border-bottom: 1px solid #dfdfdf;
	}

	.detail-list .list-li .info > p {
		line-height: 1.9rem;
	}

	.detail-list .list-li .info .recharge-info {
		color: #000;
	}

	.detail-list .list-li .info .recharge-date {
		color: #cdcdcd;
		font-size: 1.2rem;
	}
</style>

<template>
	<app-header :title="'我的淘币'" :prev="'/personal'"></app-header>
	<section class="count-box">
		<p class="p-t">我的淘币</p>
		<p class="p-c">{{taoBiCount}}</p>
	</section>
	<section class="recharge-box">
		<a class="recharge" v-link="'/personal/recharge'">充值</a>
		<p class="tips">1人民币=1淘币</p>
	</section>
	<section class="detail-list-box">
		<p class="title">淘币明细</p>
		<ul class="detail-list">
			<li class="list-li flex-ld" v-for="item in detailList">
				<div class="info">
					<p class="recharge-info">
						{{item.desc}}
					</p>
					<p class="recharge-date">
						{{getFormatterDate(item.cDate)}}
					</p>
				</div>
				<em class="color-red">
					<span v-if="item.doType==1">+</span><span v-else>-</span>{{item.money}}
				</em>
			</li>
		</ul>
	</section>

  <!-- 底部菜单兰 -->
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
    data() {
      return {
        taoBiCount: "", //我的淘币总数量
        detailList: [], //淘币明细数据
        page: 1,
        loadAll: false
      }
    },
    mounted() {
      //绑定滚动
      mallUtils.funs.scroll(this.bindScrollEvent);
      this.getTaobi();
      this.getLogData();

    },
    methods: {
      getTaobi() {
        var _this = this;
        Vue.OneMallHttp(this).GET({}, Vue.OneMallUrl.personal_user_money_index).then(function(data) {
          if (data.code == 10000) {
            _this.taoBiCount = data.info.taoBi;
          }
        })
      },
      getLogData() { //页面加载时绑定数据
        var _this = this;
        mallUtils.funs.unscroll(_this.bindScrollEvent);
        if (!_this.loadAll) {
          Vue.OneMallHttp(this).GET({
            type: 5,
            page: _this.page
          }, Vue.OneMallUrl.personal_user_log).then(function(data) {
            if (data.code == 10000) {
              if (_this.page == 1) {
                _this.detailList = data.list;
              } else {
                _this.detailList = _this.detailList.concat(data.list);
              }
              _this.loadAll = (data.isLast == 1);
              _this.page++;
              mallUtils.funs.scroll(_this.bindScrollEvent);
            }
          })
        }
      },
      bindScrollEvent() {
        if (mallUtils.screen.height + document.body.scrollTop + 50 >= document.body.offsetHeight) {
          this.getLogData();
        }
      },
      getFormatterDate(date) {
        return mallUtils.date.format(date * 1000, 'yyyy-MM-dd hh:mm')
      }
    },
    destroyed() {
      mallUtils.funs.unscroll(this.bindScrollEvent);
    }
  }
</script>
