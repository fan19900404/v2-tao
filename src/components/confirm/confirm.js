import Vue from 'vue';
import ConfirmComponent from './confirm.vue';
import mergeOptions from '../../util/plugin_helper';

/* eslint-disable no-param-reassign */
let $vm;

/**
 * 初始化一个confirm对话窗
 *
 * @returns
 */
const confirm = () => {
  if (!$vm) {
    const Confirm = Vue.extend(ConfirmComponent);
    $vm = new Confirm({
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

      $vm.$off('on-cancel');
      $vm.$off('on-confirm');

      $vm.$on('on-cancel', () => {
        if (options && options.onCancel) {
          options.onCancel();
        }
      });
      $vm.$on('on-confirm', (msg) => {
        if (options && options.onConfirm) {
          options.onConfirm(msg);
        }
      });
      $vm.showValue = true;
    },
    hide() {
      $vm.showValue = false;
    },
  };
};

export default confirm();
