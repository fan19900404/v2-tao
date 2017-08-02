<template>
  <div>
    <tab :tab-list="tabList" @game-rank-tab-action="tab"></tab>
  </div>
</template>
<style>

</style>
<script>
  import Tab from '../../components/tab/tab';

  export default {
    data() {
      return {
        tabList: ['选项一', '选项一', '选项一', '选项一'],
      };
    },
    components: {
      Tab,
    },
    methods: {
      // index为1 2 3...代表第一个，第二个
      tab(index) {
        console.log(index);
      },
    },
  };
</script>
