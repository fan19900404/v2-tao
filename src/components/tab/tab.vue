<template>
<div class="tm-tab">
  <div class="tm-tab__slide" v-for="(v, index) in tabList" v-bind:class="{'active':index==type}" @click="check(index)" :key="index">
    {{v}}
    <slot name="one"></slot>
  </div>
</div>
</template>

<script>
/**
 *适用于游戏中心排行榜，个人中心任务页等切换;
 * slot可用于增加一些提示，比如小红点等；
 */
  export default {
    name: 'tab',
    data() {
      return {
        // 选中了哪一张
        type: 0,
      };
    },
    props: {
    // 选项卡的项目
      tabList: {
        type: Array,
        default: function tab() {
          return ['项目一', '项目二', '项目三'];
        },
      },
    },
    methods: {
      check(index) {
        if (this.type === index) {
          // toDo
        } else {
          this.type = index;
          this.$emit('game-rank-tab-action', this.type + 1);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
.tm-tab {
  height: 90px;
  display: flex;
  background: #ffffff;
  &__slide {
    flex: 1;
    font-size: 28px;/*px*/
    color: #666666;
    text-align: center;
    line-height: 90px;
    box-sizing: border-box;
  }
}
  .active {
    color: #00C1B3;
    border-bottom: 2px solid #00C1B3;/*no*/
  }
</style>
