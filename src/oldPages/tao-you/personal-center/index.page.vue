<template>
  <div>
    <app-header></app-header>
    <section class="container">
      <div @click="link({name: 'UserInfo'})" class="base-info am-flexbox JS-statistics-baseinfo">
        <div class="base-info__left am-flexbox-item am-flexbox">
          <div class="base-info__avatar secimg JS-statistics-avatar">
            <img :src="user.avatar" alt="">
          </div>
          <div class="base-info__nameAndId am-flexbox-item am-flexbox">
            <div class="base-info__name JS-statistics-name">{{ user.username }}</div>
            <div class="base-info__id">淘游ID:{{ user.userId }}</div>
          </div>
        </div>
        <div class="base-info__right am-flexbox">
          <i class="icon icon-edit"></i>
        </div>
      </div>
    </section>
    <section class="list-item">
      <div class="am-list sicon">
        <a v-if="user.bindPhone" @click="link({name: 'Bindphone'})" class="am-list-item-wrapper JS-statistics-bindPhone">
          <div class="am-list-item">
            <div class="am-list-thumb">
              <i class="icon icon-phone"></i>
            </div>
            <div class="am-list-content">修改手机</div>
            <div class="am-list-extra">{{ user.bindPhone | mosaicPhone }}</div>
            <div class="am-list-arrow">
              <i class="icon arrow-icon icon-arrow-right"></i>
            </div>
          </div>
        </a>
        <a v-else @click="link({name: 'Bindphone'})" class="am-list-item-wrapper JS-statistics-bindPhone">
          <div class="am-list-item">
            <div class="am-list-thumb">
              <i class="icon icon-phone"></i>
            </div>
            <div class="am-list-content">绑定手机</div>
            <div class="am-list-extra unbind-phone">送淘豆&nbsp;</div>
            <div class="am-list-arrow">
              <i class="icon arrow-icon icon-arrow-right"></i>
            </div>
          </div>
        </a>
        <a @click="link({name: 'TaoYouTasks'})" class="am-list-item-wrapper">
          <div class="am-list-item">
            <div class="am-list-thumb">
              <i class="icon icon-task"></i>
            </div>
            <div class="am-list-content diandian-wrapper">任务
              <div v-if="isTask" class="diandian"></div>
            </div>
            <div class="am-list-extra" style="flex:2" v-if="user.day_taodou>0">还有
              <span style="color:red">{{user.day_taodou}}</span>淘豆未领取</div>
            <div class="am-list-extra" v-else>今日任务已完成</div>
            <div class="am-list-arrow">
              <i class="icon arrow-icon icon-arrow-right"></i>
            </div>
          </div>
        </a>
        <a @click="link({name: 'TaoYouWelfareShopWelfareMyTaodou'})" class="am-list-item-wrapper">
          <div class="am-list-item">
            <div class="am-list-thumb">
              <i class="icon icon-bean"></i>
            </div>
            <div class="am-list-content">淘豆</div>
            <div class="am-list-extra">{{ user.taoDou | moneyWidthComma}}</div>
            <div class="am-list-arrow">
              <i class="icon arrow-icon icon-arrow-right"></i>
            </div>
          </div>
        </a>
        <a @click="link({name: 'TaoYouPersonalCenterTaoBi'})" class="am-list-item-wrapper">
          <div class="am-list-item">
            <div class="am-list-thumb">
              <i class="icon icon-coin"></i>
            </div>
            <div class="am-list-content">淘币</div>
            <div class="am-list-extra">{{ user.taoBi | moneyWidthComma}}</div>
            <div class="am-list-arrow">
              <i class="icon arrow-icon icon-arrow-right"></i>
            </div>
          </div>
        </a>
        <a @click="link({name: 'TaoYouWelfareShopWelfarePackage'})" class="am-list-item-wrapper JS-statistics-myGift">
          <div class="am-list-item">
            <div class="am-list-thumb">
              <i class="icon icon-exchange"></i>
            </div>
            <div class="am-list-content">礼包兑换</div>
            <div class="am-list-arrow">
              <i class="icon arrow-icon icon-arrow-right"></i>
            </div>
          </div>
        </a>
        <a class="am-list-item-wrapper JS-statistics-myTickit" @click="link({name: 'TaoYouPersonalCenterRebate'})">
          <div class="am-list-item">
            <div class="am-list-thumb">
              <i class="icon icon-coupon"></i>
            </div>
            <div class="am-list-content">卡券包</div>
            <div class="am-list-extra tickit" v-if="parseInt(user.expiring)>0">你有
              <span class="tickit-count">{{user.expiring}}</span>个优惠券即将到期</div>
            <div class="am-list-extra tickit" v-else>优惠券、礼包、兑换码</div>
            <div class="am-list-arrow">
              <i class="icon arrow-icon icon-arrow-right"></i>
            </div>
          </div>
        </a>
      </div>
      <div class="am-list sicon ">
        <a @click="link({name: 'Service'})" class="am-list-item-wrapper JS-statistics-service">
          <div class="am-list-item">
            <div class="am-list-thumb">
              <i class="icon icon-service"></i>
            </div>
            <div class="am-list-content">客服中心</div>
            <!--<div class="am-list-arrow"><span class="am-icon arrow horizontal"></span></div>-->
            <div class="am-list-arrow">
              <i class="icon arrow-icon icon-arrow-right"></i>
            </div>
          </div>
        </a>
        <a class="am-list-item-wrapper JS-statistics-notice" @click="link({name: 'TaoYouPersonalCenterNotice'})">
          <div class="am-list-item">
            <div class="am-list-thumb">
              <i class="icon icon-mail"></i>
            </div>
            <div class="am-list-content diandian-wrapper">系统消息
              <div v-if="user.newNoticeFlag" class="diandian"></div>
            </div>
            <div class="am-list-arrow">
              <i class="icon arrow-icon icon-arrow-right"></i>
            </div>
          </div>
        </a>
      </div>
      <div v-show="showFlag.duoBaoFlag" class="am-list sicon ">
        <a @click="link({name: 'home'})" class="am-list-item-wrapper">
          <div class="am-list-item">
            <div class="am-list-thumb">
              <i class="icon icon-one-buy"></i>
            </div>
            <div class="am-list-content">一元夺宝</div>
            <!--<div class="am-list-arrow"><span class="am-icon arrow horizontal"></span></div>-->
            <div class="am-list-arrow">
              <i class="icon arrow-icon icon-arrow-right"></i>
            </div>
          </div>
        </a>
      </div>
      <!-- 暂时隐藏掉用户的退出功能 -->
      <div v-if="showFlag.outFlag" class="am-list sicon spec">
        <a class="am-list-item-wrapper" @click="logout">
          <div class="am-list-item">
            <div class="am-list-content center logout">退出登录</div>
          </div>
        </a>
      </div>
      <div class="source">
        © 杭州淘游科技有限公司
      </div>
    </section>
    <app-footer :menu-id="3"></app-footer>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import $ from 'jquery';
import Vue from 'vue';
import AppHeader from '../../../oldComponents/tao-you/layout/header.component';
import AppFooter from '../../../oldComponents/tao-you/layout/footer.component';

// 统计代码
import Statistics from '../statistics/personal-center/index.statistics';

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      title: '我的淘游',
      gameList: [],
      noticeFlag: false,
      // 是否显示任务的小红点
      isTask: false,
    };
  },
  computed: {
    ...mapGetters(['user', 'showFlag']),
    noData() {
      return !(this.gameList.length > 0);
    },
  },
  mounted() {
    $('body').css('background-color', '#f5f5f9');
    this.getUserInfo();
    // this.loadMyGameList();

    // 统计
    Statistics(this);
    // this.getIsTask();
    // this.getTimeRebate();
  },
  methods: {
    ...mapActions(['getUserInfo', 'updateUserInfo', 'getFooterFlag', 'toggleFooterFlag']),
    link(url) {
      this.$router.push(url);
    },
    // 用户退出
    logout() {
      const that = this;
      Vue.OneMallHttp(this).GET({}, Vue.OneMallUrl.common_user_logout)
        .then((res) => {
          if (res.code === 10000) {
            that.updateUserInfo({
              userId: undefined,
            });
            //              localStorage.removeItem('mID');
            localStorage.removeItem('Q_next_url');
            localStorage.removeItem('Q_from_url');
            localStorage.removeItem('httpStatus');
            localStorage.removeItem('login');
            that.getFooterFlag();
            that.$router.push({
              name: 'TaoYouHome',
              query: {
                mID: localStorage.getItem('mID'),
              },
            });
          } else {
            // TODO
          }
        });
    },
    /* 获取我的游戏列表(top5) */
    loadMyGameList() {
      if (this.allLoaded) {
        return;
      }
      this.loading = true;
      Vue.ClientHttp(this).GET({ page: 1, limit: 5 }, Vue.ClientUrl.my_game_list)
        .then((res) => {
          this.loading = false;
          if (res.code === 10000) {
            this.gameList = this.gameList.concat(res.result.slice(0, 5));
            if (res.result.length === 0) {
              //                this.noData = true;
            }
            return;
          }
          console.log('获取游戏数据失败');
        });
    },
    // 获取是否有领取的任务
    getIsTask() {
      Vue.ClientHttp(this).GET({}, Vue.ClientUrl.task_have)
        .then((res) => {
          if (res.code == 10000) {
            if (res.result.length > 0) {
              this.isTask = true;
            }
          }
        });
    },
    //判断还有多少抵扣劵/礼包即将到期
    //getTimeRebate(){
    // Vue.ClientHttp(this).GET({}, Vue.ClientUrl.get_time_rebate)
    //.then((res)=>{
    //if(res.code==10000){
    //
    //}
    //})
    //}
  },
};
</script>
<style lang="scss" scoped>
@import '../../../assets/tao-you/common.scss';
img {
  width: inherit;
}

.container {
  /*border-top: solid $primary-border 1px;
    border-bottom: solid $primary-border 1px;*/
  background-color: #fff;
}

.am-flexbox-item {
  .game-icon-container {
    width: .43rem;
    height: .43rem;
    flex: none;
    .game-icon {
      border-radius: .06rem;
    }
  }
}

.one-mall-section {
  margin-bottom: .1rem;
}

.base-info,
.money {
  padding: .15rem;
  align-items: stretch;
}

.base-info {
  color: $white;
  background-color: #fff;
  color: #333;
  &__left {}
  &__right {
    justify-content: flex-end;
    width: .3rem;
    i {
      color: #ccc;
    }
  }
  &__avatar {
    width: .405rem;
    height: .405rem;
    margin-right: .07rem;
    overflow: hidden;
    border-radius: 50%;
    img {
      width: 100%;
    }
  }
  &__nameAndId {
    /*padding-top: .025rem;
      padding-bottom: .025rem;*/
    height: .405rem;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }
  &__name {
    font-size: $font-size-lg;
  }
  &__id {
    font-size: $font-size-sm;
    color: #a5a5a5;
  }
}

.am-list:not([am-version]) .am-list-item .am-list-extra {
  color: #a5a5a5;
}

.list-item {
  margin-bottom: 0;
  .am-list:not([am-version]) {
    padding-top: .15rem;
    padding-bottom: 0;
  }
}

.game-list-wrapper {
  border-bottom: solid $primary-border 1px;
  background-color: $white;
}

.game-list {
  margin-left: .15rem;
  margin-right: .15rem;
  border-top: solid $primary-border 1px;
  padding-left: 0;
  padding-right: 0;
  &__item {
    width: 0.43rem;
    margin-top: .12rem;
    margin-bottom: .12rem;
    margin-left: 0;
    margin-right: .12rem;
    overflow-y: hidden;
  }
  .right {
    margin-right: -.02rem;
  }
}

.money {
  padding-left: 0;
  padding-right: 0;
  margin-left: .15rem;
  margin-right: .15rem;
  border-top: solid $primary-border 1px;
  color: #000;
  background-color: $white;
  &__left,
  &__right {
    align-items: stretch;
    i {
      color: #ccc;
    }
    &__icon-right {
      width: .175rem;
      align-items: center;
    }
  }
  &__left {
    border-right: solid $primary-border 1px;
    &__icon-right {
      margin-right: .1rem;
      justify-content: flex-start;
    }
  }
  &__right {
    margin-left: .15rem;
    justify-content: flex-end;
    &__icon-right {
      margin-right: -.02rem;
      justify-content: flex-end;
    }
  }
  &__taobi-wrapper,
  &__taodou-wrapper {
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }
  &__taobi,
  &__taodou {
    margin-left: .03rem;
    margin-bottom: .1rem;
    font-size: $font-size-md;
  }
  &__amount {
    font-size: $font-size-md;
    color: #ff4a4a;
  }
  &__charge,
  &__exchange {
    padding: 0.01rem .1rem;
    border-radius: .04rem;
    font-size: $font-size-sm;
    color: #fff;
    background-color: $primary;
    height: .23rem;
    line-height: .23rem;
  }
}

.am-list-item-wrapper {
  display: block;
  padding-left: .15rem;
  background-color: $white;
  &:first-child {
    /*border-top: solid $primary-border 1px;*/
    .am-list-item.game-info {
      border-bottom: none;
    }
  }
  &:last-child {
    /*border-bottom: solid $primary-border 1px;*/
    .am-list-item {
      border-bottom: none;
    }
  }
  .am-list-item {
    padding-left: 0;
    border-bottom: solid $primary-border 1px;
    font-size: .16rem;
    .am-list-content {
      color: $dark;
      padding: .09rem 0;
    }
    .am-list-extra {
      font-size: $font-size-md;
    }
    .unbind-phone {
      color: #ff4a4a;
    }
    .tickit {
      flex: 2;
    }
    .tickit-count {
      color: red;
    }
  }
}

.am-list:not([am-version]) .am-list-item {
  padding-top: .05rem;
}

.icon {
  font-size: .16rem;
}

.am-list .icon {
  font-size: .18rem;
}

.icon-my-game {
  color: #fc992c;
}

.icon-phone {
  color: #00aaee;
}

.icon-shopping-car {
  color: #ffae00;
}

.icon-service {
  color: #00aaee;
}

.icon-coupon {
  color: #fc992c;
}

.icon-mail {
  color: #00c25b;
}

.icon-gift2 {
  color: #29ab91;
}

.icon-one-buy {
  color: #f15a4a;
}

.icon-exchange {
  color: #ff4d73;
}

.icon-task {
  color: #ff9500;
}

.icon-coin {
  color: #00aaee;
}

.icon-bean {
  font-size: .16rem!important;
  color: #00c25b;
}

.secimg img {
  width: 100%;
  height: 100%;
}

.icon.arrow-icon.icon-arrow-right {
  color: #cccccc;
  font-size: .14rem;
}








/* fix */

.am-list:not([am-version]) .am-list-item .am-list-arrow {
  margin-right: 0;
}

.spec {
  padding: .1rem 0 0;
}

.diandian-wrapper {
  display: flex;
  align-items: center;
  .diandian {
    width: .08rem;
    height: .08rem;
    margin-left: .06rem;
    background-color: red;
    border-radius: 50%;
  }
}

.source {
  height: .42rem;
  color: #bbb;
  font-size: .1rem;
  text-align: center;
  line-height: .42rem;
}

.am-list-item {
  padding: 0!important;
  padding-right: .15rem!important;
}

.am-list-item-wrapper .am-list-item .am-list-content.logout {
  color: #ff4a4a;
}
</style>
