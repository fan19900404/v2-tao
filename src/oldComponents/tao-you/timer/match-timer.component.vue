<template>
  <div>
    {{hour}}时{{minute}}分{{second}}秒
  </div>
</template>

<script>
export default {
  props: {
    endtime: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      hour: '00',
      minute: '00',
      second: '00',
    };
  },
  methods: {
    praise() {
      let _this = this;
      _this.hour = Math.floor((_this.endtime % 86400) / 3600);
      _this.minute = Math.floor((_this.endtime % 3600) / 60);
      _this.second = Math.floor(_this.endtime % 60);

      _this.hour = _this.hour < 10 ? `0${_this.hour}` : _this.hour;
      _this.minute = _this.minute < 10 ? `0${_this.minute}` : _this.minute;
      _this.second = _this.second < 10 ? `0${_this.second}` : _this.second;

      var t = setInterval(() => {
        if (_this.endtime > 0) {
          let h = Math.floor((_this.endtime % 86400) / 3600);
          let m = Math.floor((_this.endtime % 3600) / 60);
          let s = Math.floor(_this.endtime % 60);
          _this.hour = h < 10 ? `0${h}` : h;
          _this.minute = m < 10 ? `0${m}` : m;
          _this.second = s < 10 ? `0${s}` : s;
          --_this.endtime;
        } else {
          clearInterval(t);
          // 执行传入的需要在倒计时结束后传递的方法
          _this.$dispatch('timer-action'); // $dispatch这种方法看文档上说弃用了，使用另外的方法，http://cn.vuejs.org/v2/guide/migration.html#dispatch-和-broadcast-替换
        }
      }, 1000);
    },
  },
  mounted() {
    this.praise();
  },
};
</script>
