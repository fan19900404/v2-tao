<template>
  <div>
    页面跳转中...
  </div>
</template>
<script>
export default {
  mounted(){
    if(this.$route.query.payurl){
      location.href = this.$route.query.payurl;
    }
  }
}
</script>

