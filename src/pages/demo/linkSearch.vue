<template>
  <div style="height: 100vh;padding:15px;">
    <linkSearch :text="text" link="/demo/confirm"></linkSearch>
  </div>
</template>



<script>
import linkSearch from '../../components/linkSearch/linkSearch';

export default {
  components: {
    linkSearch,
  },
  data() {
    return {
      text: '天龙八部',
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
