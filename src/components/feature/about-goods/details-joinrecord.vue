<style scoped>
	.header {
		height: 4.5rem;
	    line-height: 4.5rem;
	    font-size: 1.6rem;
	    color: #3c3e45;
	    border-top: 1px solid #e6e6e0;
	    border-bottom: 1px solid #e6e6e0;
	}
	.header .title {
		font-size: 1.4rem;
		font-weight: 500;
	}

	.header .stime {
		color: #8e8e8e;
    font-size: 1.4rem;
    text-align: right;
	}

	.list {
    background-color: #fff;
		color: #8e8e8e;
		font-size: 1.2rem;
	}
	.list > li {
		padding: 1.3rem 0;
	}
	.avator {
		width: 3.7rem;
		height: 3.7rem;
		display: block;
		overflow: hidden;
		border-radius: 50%;
	}

	.name {
		font-size: 1.2rem;
		color: #329dff;
		white-space: nowrap;
		overflow: hidden;
	    text-overflow: ellipsis;
	}
  .count-container {
    margin-right: 1.6rem;
    align-self: flex-start;
  }
	.count {
		color: #d91d37;
	}
  .list-item {
    margin-left: 1.6rem;
    align-items: center;
  }
  .list-item:not(:last-child) {
    border-bottom: 1px solid #dfdfdf;
  }
  .list-detail {
    margin-left: 1rem;
    font-size: 1rem;
  }
  .list-detail p {
    margin-top: .3rem;
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
	<section class="loadmore-container mt-10">
		<header class="bg-fff pd-lr-10 flex header">
			<h2 class="title">所有参与记录</h2>
      <span v-show="date" class="flex-1 stime">{{date}} 开始</span>
		</header>
		<ul class="list">
			<li class="list-item flex flex-start" v-for="r in records">
				<span class="avator">
					<img :src="r.headPic" alt="头像">
				</span>
				<div class="list-detail flex-1">
					<p class="name">{{r.username}}</p>
					<p class="place flex">
            <!--<span>{{r.area}}&nbsp;</span>-->
            <span>IP: {{r.IP}}</span>
          </p>
					<p class="time flex">
            <span>参与了<span class="count">{{r.totalTimes}}</span>人次&nbsp;</span>
            <span class="flex-1">{{r.date}}</span>
          </p>
				</div>
			</li>
      <p v-show="isLoading" class="loading"></p>
      <p v-show="isLoading" class="loading-more-msg msg">正在加载中...</p>
      <p v-show="isAllData" class="no-more msg">没有更新的数据了</p>
		</ul>
	</section>
</template>

<script>
  import Vue from 'vue';
	export default {
    props: [
      'date'
    ],
		data(){
			return {
				records: [],
        // about pagination
        page: 1,
        isLoading: false,
        isAllData: false
			}
		},
		mounted(){
      // TODO
      mallUtils.funs.scroll(this.touchLoading);
      this.fetchRecords({
        numberID: this.$route.params.id,
        page: this.page
      });

      this.$on('route-change', () => {
        // 重新定义状态
        this.page = 1;
        this.records = [];
        // 再次获取数据
        this.fetchRecords({
          numberID: this.$route.params.id,
          page: this.page
        });
      })
		},
    destroyed() {
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
             console.log('不能够加载更多的数据了...', this.isLoading, this.isAllData);
            // TODO
        }
        else {
          this.isLoading = true;
          this.page++;
          var query = {
            numberID: this.$route.params.id,
            page: this.page
          };
          this.fetchRecords(query);
        }
      },
			fetchRecords(query){
        var that = this;
        Vue.OneMallHttp().GET(query, Vue.OneMallUrl.goods_comment)
          .then(function(res) {
            if(10000 == res.code) {
              that.isLoading = false;
              var temp = res.result;
              if(temp.hasOwnProperty('collection')) {
                if(0 === temp.collection.length) {
                  that.isAllData = true;
                }
                else {
                  that.records = that.records.concat(temp.collection);
                  that.isAllData = false;
                }
              }
            }
          });
			}
		}
	}
</script>
