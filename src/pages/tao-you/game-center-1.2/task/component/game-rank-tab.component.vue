<template>
  <div class="tab">
    <div class="tab__slide" v-for="(v,index) in tabList" v-bind:class="{'active':index==type}" @click="check(index)" :key="index">{{v}}
      <div v-show="isTask[index]" class="diandian"></div>
    </div>
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
      default: ['任务1', '任务2', '任务3', '任务4'],
    },
    // 选中了哪一张
    type: {
      type: Number,
      default: 0,
    },
    // 是否有可领取任务
    isTask: {
      type: Array,
      default: [0, 0, 0, 0],
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
    position: relative;
    .diandian {
      width: .08rem;
      height: .08rem;
      margin-left: .06rem;
      background-color: red;
      border-radius: 50%;
      position: absolute;
      top: 0.1rem;
      right: .05rem;
    }
  }
}

.active {
  color: #00C1B3;
  border-bottom: 2px solid #00C1B3;
}
</style>
