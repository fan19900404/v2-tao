<template>
  <svg width="100%" height="100%" class="progress-circle" :class="{'new': !has, 'old': has}" viewBox="0 0 44 44">
    <circle class="bg" r="18" cx="22" cy="22" stroke-width="4" fill="none"></circle>
    <circle :fill="!has ? '#f2fcfb': '#fafafa'" r="18" cx="22" cy="22"></circle>
    <circle class="progress"
            r="18" cx="22" cy="22"
            transform="rotate(-90, 22, 22)"
            stroke-width="4" fill="none"
            stroke-dasharray="113.097334"
            :stroke-dashoffset="113.097334 * progress / 100">
    </circle>
  </svg>
</template>

<style lang="scss" scoped>
  @import "svg-progress.component.scss";
</style>

<script>
export default {
  props: {
    progress: {
      type: Number,
    },
    has: {
      type: Boolean,
    },
  },
  data() {
    return {
      ctx: {},
    };
  },
  methods: {
    setProgress(percent) {
      this.progress = percent;
    },
  },
  mounted() {
  },
};
</script>
