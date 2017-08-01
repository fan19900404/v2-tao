export default {
  props: {
    // 是否显示菜单
    show: {
      type: Boolean,
      default: false
    },
    // 菜单选项
    menu: {
      type: Array
    }
  },
  data() {
    return {
      popoverLocation: {}
    }
  },
  computed: {
    popoverStyle() {
      return {
        top: (this.popoverLocation.top + this.popoverLocation.height + 9) + 'px'
      }
    }
  },
  methods: {
    togglePopover() {
      this.show = !this.show;
    },
    changeType(index) {
      this.show = false;
      this.$emit('popover-change-type', index)
    }
  },
  mounted() {
    let trigger = document.getElementById('popover-trigger');
    if(trigger) {
      this.popoverLocation = trigger.getBoundingClientRect();
    }
  }
}
