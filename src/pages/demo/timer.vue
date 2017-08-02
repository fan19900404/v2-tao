<template>
  <timer :type="type" :end-time = "endTime" @timer-action = "action"></timer>
</template>
<style lang="scss" scoped>

</style>
<script>
import Timer from '../../components/timer/timer';

export default {
  data() {
    return {
      type: 2,
      endTime: 10,
    };
  },
  components: {
    Timer,
  },
  methods: {
    action() {
      console.log('倒计时结束');
    },
  },
};
</script>
