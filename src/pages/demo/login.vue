<template>
  <div class="page">
    <div class="btn-container">
      <div class="btn-group">
        <router-link :to="{name: 'tabbar'}">
          不需要登陆
        </router-link>
        <router-link :to="{name: 'listitem'}">
          需要登陆
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import TmButton from '../../components/button/button';

  export default {
    components: {
      TmButton,
    },
    methods: {
      clickHandle() {
        console.log('click');
      },
    },
  };

</script>
<style lang="scss" scoped>
  .btn-container {
    padding: 20px 30px;

    .btn-group {
      &--large {
        margin-top: 60px;
        .tm-button {
          margin-bottom: 20px;
        }
      }
    }
  }

</style>
