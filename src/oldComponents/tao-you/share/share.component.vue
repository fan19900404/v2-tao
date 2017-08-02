<!-- 分享 组件 -->
<template>
  <div>
    <i class="icon icon-share2 JS-statistics-share-button" v-bind:style="bindStyle"></i>
    <share-dialog-component :config="config" v-if="isShow"></share-dialog-component>
    <share-paste-component v-if="isShow"></share-paste-component>
  </div>
</template>

<script>
import ShareDialogComponent from './shareDialog.component';
import SharePasteComponent from './sharePaste.component';

export default {
  props: {
    bindStyle: {
      type: Object,
      default: '',
    },
    config: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      isShow: true, //! mallUtils.device.isWeixin
    };
  },
  components: {
    ShareDialogComponent,
    SharePasteComponent,
  },
  methods: {
    clickHandle() {
      this.$root.$broadcast('share', 1);
    },
  },
};
</script>
<style lang="scss" scoped>
.icon-share2 {
  color: #a5a5a5;
  font-size: .205rem;
}
</style>
