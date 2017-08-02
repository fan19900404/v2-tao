<template>
  <div class="tab">
    <div class="tab__slide" v-for="(v,index) in tabList" v-bind:class="{'active':index==type}" @click="check(index)" :key="index">{{v}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  components: {

  },
  props: {
    // 选项卡的项目
    tabList: {
      type: Array,
      default: ['人气榜', '付费榜', '新游榜'],
    },
    // 选中了哪一张
    type: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    check(index) {
      this.type = index;
      this.$emit('game-rank-tab-action', this.type);
    },
  },
};
</script>

<style lang="scss" scoped>
.tab {
  height: .45rem;
  display: flex;
  background: #ffffff;
  &__slide {
    flex: 1;
    font-size: .14rem;
    color: #666666;
    text-align: center;
    line-height: .45rem;
    box-sizing: border-box;
  }
}

.active {
  color: #00C1B3;
  border-bottom: 2px solid #00C1B3;
}
</style>
