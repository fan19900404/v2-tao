export default {
  props: {
    // toast的类型 0-带有图标的toast 1-不带有图标的toast
    toastType: {
      type: Number,
      default: 0
    },
    // toast的内容
    toastText: {
      type: String
    },
    // 是否显示toast
    isShow: {
      type: Boolean,
      default: false
    },
    // 显示的时间
    showTime: {
      type: Number,
      default: 2000
    },
    // 图标的类型 1-success 2-error 3-failure 4-loading
    iconType: {
      type: Number
    }
  },
  methods: {
    closeToast() {
      this.isShow = false;
    }
  },
  mounted() {
    this.$watch('isShow', function() {
      // toast显示2s后关闭
      if(this.isShow) {
        setTimeout(() => {
          this.closeToast();
        }, this.showTime);
      }
    });
  }
};
