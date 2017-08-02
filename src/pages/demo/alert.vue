<template>
  <div style="height: 100vh">
    <div>
      <div @click="showTips">显示alert</div>
    </div>
     <div>
      <div @click="showTips2">直接使用js调用alert</div>
    </div>

    <div>
      <alertComponents v-model="show" title="随便大一点目录上<span style='color:red'>1000</span>效果在大一点" @on-show="onShow" @on-hide="onHide" buttonTextColor="#ff8811" buttonText="ok" @on-ok="onOk">
      </alertComponents>
    </div>

  </div>
</template>



<script>
/* eslint-disable import/extensions */
import alertComponents from '../../components/alert/alert.vue';
import alert from '../../components/alert/alert.js';

/* eslint-disable no-console */
export default {
  components: {
    alertComponents,
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
      alert.show({
        title: '方法直接调用',
        content: '主要内容，随便输入，同时支持html标签',
        buttonText: '任性的确定',
        buttonTextColor: 'green',
        onShow() {
          console.log('显示方法');
        },
        onHide() {
          console.log('隐藏方法');
        },
        onOk() {
          that.onOk();
        },
      });
    },
    onOk() {
      console.log('on ok');
    },
    onHide() {
      console.log('on hide');
    },
    onShow() {
      console.log('on show');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
