<template>
  <div class="hot-gift-box">
    <homeTitle title="热门礼包" linkTitle="更多礼包" :linkUrl="{name: 'TaoYouPacks'}"></homeTitle>
    <ul class="list">
      <li class="list-item" v-for="(item, index) in hot" :key="index">
        <tmListItem :thumb="item.image" :title="item.gameName" :sub-title="item.name" :extra="'使用平台：'+item.typeName" :is-last="index == hot.length-1" :border-type="1">
          <TmProgress slot="right" :progress="(item.totalNumber-item.usedNumber==0)?0:item.usedNumber/item.totalNumber" :disabled="(item.uID||item.totalNumber-item.usedNumber==0)?true:false" :text="item.uID == 0&&item.taoDou !=0 ? '兑' :item.uID == 0?'领':'已领'"></TmProgress>
        </tmListItem>
      </li>
    </ul>
  </div>
</template>
<script>
import homeTitle from './homeTitle';
import TmListItem from '../../../components/listItem/listitem';
import TmProgress from '../../../components/progress/circleProgress';
import { getGiftsList } from '../../../api/home';

export default {
  components: {
    homeTitle,
    TmListItem,
    TmProgress,
  },
  data() {
    return {
      hot: [],
    };
  },
  mounted() {
    getGiftsList(1, 3).then((res) => {
      if (Number(res.data.code) === 10000) {
        this.hot = res.data.result || [];
      }
    });
  },
};
</script>
<style lang="scss" scoped>
.hot-gift-box {
  background: #fff;
}
</style>
