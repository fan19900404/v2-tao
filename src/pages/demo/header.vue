<template>
  <tmHeader title="标题过长会隐藏后面的内容啊哈哈哈哈" :back="true"></tmHeader>
</template>
<script>
import tmHeader from '../components/header/header';

export default {
  components: {
    tmHeader,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.xheader-back {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 32px;
  color: #ccc;
  .icon-arrow-left{
    font-size: 38px;
  }
}
</style>
