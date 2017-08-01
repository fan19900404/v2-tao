<template>
  <div v-if="isShow" class="ap-toast-mask" transition="expand">
    <div class="ap-toast-container ap-toast-container--icon" v-if="iconType">
      <div class="ap-toast-icon-container">
        <i :class="{
          'icon-toast-success': iconType === 1,
          'icon-toast-error': iconType === 2,
          'icon-toast-failure': iconType === 3,
          'icon-toast-loading': iconType === 4,
          'ap-toast-icon-loading': iconType === 4
        }" class="ap-toast-icon"></i>
      </div>
      <div class="ap-toast-text">
        {{toastText}}
      </div>
    </div>
    <div class="ap-toast-container ap-toast-container--normal ap-toast-container-transition" v-else>
      <span class="ap-toast-text">{{toastText}}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "./toast.component.scss";
</style>

<script>
  import ToastModule from './toast';
  export default ToastModule;
</script>
