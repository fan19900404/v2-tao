<template>
  <div style="height: 100vh">
    <div>
      <div @click="showTips">显示确认框</div>
    </div>
    <div>
      <div @click="showTips2">直接使用js调用confirm</div>
    </div>

    <div>
      <confirmComponents v-model="show" title="随便大一点目录上<span style='color:red'>1000</span>效果在大一点" @on-show="onShow" @on-hide="onHide" confirmTextColor="#ff8811" confirmText="ok">
        <p style="text-align:center;">你的订单三尚未支付，
          <br/>确定需要删除吗</p>
      </confirmComponents>
    </div>

    <tm-footer selected="mine"></tm-footer>
  </div>
</template>



<script>
/* eslint-disable import/extensions */
import confirmComponents from '../../components/confirm/confirm.vue';
import confirm from '../../components/confirm/confirm.js';

import tmFooter from '../components/footer/footer';

/* eslint-disable no-console */
export default {
  components: {
    confirmComponents,
    tmFooter,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showTips() {
      this.show = true;
    },
    showTips2() {
      const that = this;
      confirm.show({
        title: '方法直接调用',
        content: '主要内容，随便输入，同时支持html标签',
        confirmText: '任性的确定',
        cancelText: '取消按钮',
        confirmTextColor: 'green',
        cancelTextColor: '#0000ff',
        onShow() {
          console.log('显示方法');
        },
        onHide() {
          console.log('隐藏方法');
        },
        onCancel() {
          that.onCancel();
        },
        onConfirm: that.onConfirm,
      });
    },
    onCancel() {
      console.log('on cancel');
    },
    onConfirm() {
      console.log('on confirm');
    },
    onHide() {
      console.log('on hide');
    },
    onShow() {
      console.log('on show');
    },
  },
  destroyed() {
    confirm.hide();
  },
};
</script>

<style lang="scss" scoped>

</style>
