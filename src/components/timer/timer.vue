<template>
  <div>
    <div v-if = "type===1" class="tm-timer">{{hour}} 时 {{minute}} 分 {{second}} 秒 </div>
    <div v-else class="tm-timer">{{hour}} : {{minute}} : {{second}}</div>
  </div>
</template>

<script>
// type:倒计时的类型
// endTime :剩余时间，单位 s
// timer-action : 倒计时完成后，所要执行的动作

/* eslint-disable */
  export default {
    name: 'timer',
    data() {
      return {
        hour: '00',
        minute: '00',
        second: '00',
        endtime: this.endTime,
      };
    },
    props: {
      type: {
        type: Number,
        default: 1,
      },
      endTime: {
        type: Number,
        default: 0,
      },
    },
    methods: {
      praise() {
        this.hour = Math.floor((this.endtime % 86400) / 3600);
        this.minute = Math.floor((this.endtime % 3600) / 60);
        this.second = Math.floor(this.endtime % 60);

        this.hour = this.hour < 10 ? '0' + this.hour : this.hour;
        this.minute = this.minute < 10 ? '0' + this.minute : this.minute;
        this.second = this.second < 10 ? '0' + this.second : this.second;

        var t = setInterval(() => {
          if(this.endtime > 0){
            var d =  Math.floor((this.endtime / 86400));
            var h = Math.floor((this.endtime % 86400)/3600);
            var m = Math.floor((this.endtime % 3600)/60);
            var s = Math.floor(this.endtime % 60);
            this.day = d;
            this.hour = h < 10 ? '0' + h : h;
            this.minute = m < 10 ? '0' + m : m;
            this.second = s < 10 ? '0' + s : s;
            --this.endtime;
          }else{
            clearInterval(t);
            //执行传入的需要在倒计时结束后传递的方法
            this.$emit('timer-action');
          }
        },1000);
      },
    },
    mounted() {
      this.praise();
    },
  };
</script>
<style lang="scss" scoped>
  .tm-timer {
    font-size: 26px;/*px*/
    color: #888;
  }
</style>
