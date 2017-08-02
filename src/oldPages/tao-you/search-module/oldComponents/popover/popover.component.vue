<template>
  <div>
    <div v-show="show" @click.self="togglePopover" class="popover-mask"></div>
    <slot name="popover-trigger"></slot>
    <div :style="popoverStyle" v-show="show" class="popover-content">
      <div class="popover-items">
        <span class="popover-arrow"></span>
        <div @click="changeType(index)" v-for="(v,index) in menu" class="popover-item" :key="index">
          <span class="popover-icon" :class="v.iconName"></span>
          {{v.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "popover.component.scss";
</style>

<script>
import PopoverModule from './popover';

export default PopoverModule;
</script>
