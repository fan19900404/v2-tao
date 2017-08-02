import Vue from 'vue';
import AlertComponent from './alert.vue';
import mergeOptions from '../../util/plugin_helper';

/* eslint-disable no-param-reassign */
let $vm;

/**
 * 初始化一个confirm对话窗
 *
 * @returns
 */
const alert = () => {
  if (!$vm) {
    const Alert = Vue.extend(AlertComponent);
    $vm = new Alert({
      el: document.createElement('div'),
      propsData: {
        title: '',
      },
    });
    document.body.appendChild($vm.$el);
  }

  return {
    show(options) {
      if (typeof options === 'object') {
        mergeOptions($vm, options);
      }
      if (typeof options === 'object' && (options.onShow || options.onHide)) {
        if (options.onShow) {
          options.onShow();
        }
      }
      if (this.$watcher) {
        this.$watcher();
      }
      this.$watcher = $vm.$watch('showValue', (val) => {
        if (!val && options && options.onHide) {
          options.onHide();
        }
      });

      $vm.$off('on-ok');

      $vm.$on('on-ok', () => {
        if (options && options.onOk) {
          options.onOk();
        }
      });
      $vm.showValue = true;
    },
    hide() {
      $vm.showValue = false;
    },
  };
};

export default alert();
