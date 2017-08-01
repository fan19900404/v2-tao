<!-- author:zqy -->
<template>
  <div>
    <!--公共头部组件-->
    <app-header :title="title"></app-header>
    <!-- 规则 -->
    <div class="am-list need_border">
      <div class="am-list-body">
        <div class="am-list-item">
          <div class="am-list-content">比赛规则：</div>
        </div>
      </div>
    </div>
    <div class="am-list twoline self">
      <div class="am-list-item">
        <div class="1am-list-content">
          <div class="am-list-title">淘豆及使用说明：</div>
          <div class="am-list-brief1">
            淘豆是淘游中心的虚拟货币，目前主要通过有奖小游戏、绑定手机号及活动等途径获得，未来会增加更多淘豆获取方式并公告。淘豆的主要用处是在兑换商城中兑换各类稀有充值优惠券，未来会增加更多奖品。
          </div>
        </div>
      </div>

      <div class="am-list-item">
        <div class="1am-list-content">
          <div class="am-list-title">有奖小游戏场次及规则说明：</div>
          <div class="am-list-brief1">
            有奖小游戏目前有5款游戏，未来会根据用户需求开放更多趣味性小游戏。小游戏分为普通场和极速场。 普通场主要为了用户获取高额奖励设定，每12个小时为一次循环，每款游戏一天共计2场普通场比赛。比赛结束后，将根据用户在此时间段内最高分数进行排名从而发放奖励。 极速场主要为了用户快速获取奖励设定，从每天早上7时开始每1个小时为一次循环，由于夜间参与游戏人数较少，因此凌晨0时到早上7时不开放极速场，建议用户前往普通场进行比赛，每款游戏一天共计17场极速场比赛。比赛结束后，将根据用户在此时间段内最高分数进行排名从而发放奖励。
          </div>
        </div>
      </div>

      <div class="am-list-item">
        <div class="am-list-content">
          <div class="am-list-title">极速场</div>
          <div class="am-list-brief ">每日从7:00开始——23:59（每59分钟）</div>
        </div>
      </div>

      <div class="am-list-item">
        <div class="am-list-content">
          <div class="am-list-title">普通场</div>
          <div class="am-list-brief">00:00——11:59（上午场）</div>
          <div class="am-list-brief">12:00——23:59（下午场）</div>
        </div>
      </div>
    </div>
    <div class="am-list">
      <div class="am-list-body">
        <div class="am-list-item">
          <div class="am-list-content">奖励说明</div>
        </div>
      </div>
    </div>

    <div class="am-list twoline self">
      <div class="am-list-item">
        <div class="am-list-content">
          <div class="am-list-title">极速场</div>
          <div class="am-list-brief">第1名：
            <!-- 奖励 -->
            <span class="my-span"> 400淘豆</span>
            <!-- （价值￥50） -->
          </div>
          <div class="am-list-brief">第2名：
            <!-- 奖励 -->
            <span class="my-span"> 200淘豆</span>
            <!-- （价值￥30） -->
          </div>
          <div class="am-list-brief">第3名：
            <!-- 奖励 -->
            <span class="my-span"> 100淘豆</span>
            <!-- （价值￥20） -->
          </div>
          <div class="am-list-brief">第4-10名：
            <!-- 奖励 -->
            <span class="my-span"> 50淘豆</span>
            <!--  （价值￥10） -->
          </div>
          <!-- <div class="am-list-brief">前300名：奖励<span class="my-span"> 5000淘豆</span> （价值￥5）</div> -->
          <div class="am-list-title self-normal">普通场</div>
          <div class="am-list-brief">第1名：
            <!-- 奖励 -->
            <span class="my-span"> 3000淘豆</span>
            <!-- （价值￥20） -->
          </div>
          <div class="am-list-brief">第2名：
            <!-- 奖励 -->
            <span class="my-span"> 2000淘豆</span>
            <!--  （价值￥10） -->
          </div>
          <div class="am-list-brief">第3名：
            <!-- 奖励 -->
            <span class="my-span"> 800淘豆</span>
            <!-- （价值￥5） -->
          </div>
          <div class="am-list-brief">第4-10名：
            <!-- 奖励 -->
            <span class="my-span"> 300淘豆</span>
            <!-- （价值￥3） -->
          </div>

        </div>
      </div>
    </div>
    <return-btn></return-btn>
  </div>
</template>

<script>
import AppHeader from '../../../components/tao-you/layout/header.component';
import ReturnBtn from '../../../components/tao-you/button/return.component';

export default {
  data() {
    return {
      title: '比赛规则',
    };
  },
  components: {
    AppHeader,
    ReturnBtn,
  },
};
</script>

<style lang="scss" scoped>
/* 引入公共的样式 */

@import '../../../assets/tao-you/common.scss';
.am-list {
  padding: .15rem 0 0;
  border-bottom: 1px solid $stress-border;
  background-color: #fff!important;
  .am-list-content {
    color: #282828;
  }
}

.self {
  padding: 0 0 .10rem 0;
  border: none;
}

.my-span {
  color: red;
}

.self-normal {
  padding: .10rem 0 0 0;
}

.am-list-brief {
  padding: .015rem 0;
}

.am-list-brief1 {
  color: #888;
  font-size: .14rem;
  line-height: .2rem;
}

.need_border {
  border-top: 1px solid $stress-border;
  padding: 0;
}
</style>
