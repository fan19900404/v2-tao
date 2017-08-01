<template>
  timer {{time}}
</template>
<script>
  export default {
    props: [
      'time',
      'uniqueId'
    ],
    data() {
      return {
        timer: null
      }
    },
    mounted() {
      var that = this;

      this.timer = setInterval(()=> {
          if(this.time >= 1) {
            this.time--;
          }
          else {
            clearInterval(this.timer);
            this.$dispatch('timer-action', {
              id: this.uniqueId
            })
          }
        }, 1000);

    }
  }
</script>
