<template>
    <linkSearch :text="text" link="/demo/confirm"></linkSearch>
</template>



<script>
import linkSearch from '../../../components/linkSearch/linkSearch';

export default {
  components: {
    linkSearch,
  },
  data() {
    // text由后端接口给出
    return {
      text: '天龙八部',
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
