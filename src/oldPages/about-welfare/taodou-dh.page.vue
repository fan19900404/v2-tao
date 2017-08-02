<style scoped>
	.count-box {
		height: 6rem;
		padding: 0 1.6rem;
		background-color: #ff4a4a;
		color: #fff;
		font-size: 1.8rem;
	}

	.count-box .count {
		color: #ffff00;
		font-style: normal;
	}

	.count-box .dhdbq-btn {
		display: block;
		width: 8.4rem;
		height: 3rem;
		line-height: 3rem;
		text-align: center;
		font-size: 1.2rem;
		color: #ff4a4a;
		background-color: #ffff00;
		border-radius: .5rem;
	}

	.one-mall-iconfont {
		vertical-align: text-bottom;
		margin: 0 .2rem 0 0;
	}

	.sy-tips {
		line-height: 4.0rem;
		text-align: right;
		font-size: 1.2rem;
		color: #bbbbbb;
	}

	.dbq-box {
		padding: 0 1.1rem;
	}

	.dbq-list > li {
		height: 9.3rem;
		padding: 0 1.5rem;
		margin: 0 0 1.6rem 0;
		color: #898989;
		background: url(/static/images/quan_bg.png) no-repeat top center;
		background-size: 100% 100%;
	}

	.dbq-list > li .dh-btn {
		display: block;
		width: 5.4rem;
		height: 3.1rem;
		line-height: 3.1rem;
		text-align: center;
		font-size: 1.2rem;
		color: #fff;
		background-color: #ff4a4a;
		border-radius: .4rem;
	}

	.dbq-list > li .dbq-info > p {
		line-height: 2rem;
		font-size: 1.2rem;
		color: #898989;
	}

	.dbq-list > li .dbq-info > p .name {
    display: block;
		font-size: 1.8rem;
		color: #000;
		margin: 0;
	}

</style>

<template>
	<app-header :title="'福利商城'"></app-header>
	<section class="count-box flex-ld">
		<span>我的淘豆<em class="count">{{taodou}}</em></span>
		<a class="dhdbq-btn" v-link="'/welfare/taodou'">查看夺宝券</a>
	</section>
	<section class="dbq-box">
		<p class="sy-tips" v-link="'/welfare/taodou-explain'"><i class="one-mall-iconfont icon-info_outline"></i>使用说明</p>
		<ul class="dbq-list">
			<li class="flex-ld" v-for="item in dhList">
				<div class="dbq-info">
					<p><span class="name">{{item.name}}</span> </p>
					<p><span>需要<em class="color-red">{{item.prize}}</em>淘豆</span></p>
          <p><span>剩余<em class="color-red">{{item.last}}</em>张</span></p>
				</div>
				<a class="dh-btn" @click="exchange(item.id)">兑换</a>
			</li>
		</ul>
	</section>

  <!-- 底部菜单兰 -->
  <app-bottom-bar></app-bottom-bar>
</template>

<script>
	import Vue from 'vue';
	import AppHeader from '../../oldComponents/common/header/app-header';
  import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';
  export default {
    components: {
      AppHeader,
      AppBottomBar
    },
    data() {
      return {
        taodou: 0,
        dhList: [],
        page: 1,
        limit: 6,
        loadAll: false
      }
    },
    mounted() {
      $("body").css("background-color", "#f8f8f8");
      //绑定滚动
      mallUtils.funs.scroll(this.bindScrollEvent);
      this.getTaoDou();
      this.getDhList();
    },
    methods: {
      getTaoDou() {
        var _this = this;
        Vue.OneMallHttp(this).GET({}, Vue.OneMallUrl.personal_user_money_index).then(function(data) {
          if (data.code == 10000) {
            _this.taodou = data.info.taoDou;
          }
        })
      },
      getDhList() {
        var _this = this;
        mallUtils.funs.unscroll(_this.bindScrollEvent);
        if (!_this.loadAll) {
          Vue.OneMallHttp(this).GET({
            page: _this.page,
            limit: _this.limit,
            platForm: 0// 0一元购1淘助手
          }, Vue.OneMallUrl.ticket_list).then(function(data) {
            if (data.code == 10000) {
              if (_this.page == 1) {
                _this.dhList = data.result;
              } else {
                _this.dhList = _this.dhList.concat(data.result);
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
          this.getDhList();
        }
      },
      //兑换优惠券
      exchange(id) {
        var _this = this;
        Vue.OneMallHttp(this).GET({
          tID: id
        }, Vue.OneMallUrl.ticket_exchange).then(function(data) {
          if (data.code == 10000) {
            layer.open({
              skin: 'confirm',
              content: '兑换成功!',
              btn: ['继续兑换', '立即查看'],
              yes: function() {
                layer.closeAll();
              },
              no: function() {
                _this.$router.push("/welfare/taodou");
              }
            });
            // 刷新页面的数据
            _this.getTaoDou();
            _this.getDhList();
          } else {
            mallUtils.layer.alert('兑换失败<br />' + data.msg);
          }
        })
      }
    },
    destroyed() {
      $("body").css({
        "background-color": "#fff"
      });
      mallUtils.funs.unscroll(this.bindScrollEvent);
    }
  }
</script>
