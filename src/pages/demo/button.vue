<template>
  <div class="page">
    <div class="btn-container">
      <div class="btn-group">
        <tm-button text="进入" :plain="true" type="primary" @click.native="clickHandle">></tm-button>
        <tm-button text="进入" :plain="true" type="primary" :disabled="true" @click.native="clickHandle">></tm-button>
      </div>
      <div class="btn-group">
        <tm-button text="进入" @click.native="clickHandle"></tm-button>
        <tm-button text="进入" type="primary" @click.native="clickHandle"></tm-button>
        <tm-button text="进入" type="primary" :disabled="true" @click.native="clickHandle"></tm-button>
      </div>
      <div class="btn-group btn-group--large">
        <tm-button text="进入" size="large" type="primary" :plain="true" @click.native="clickHandle"></tm-button>
        <tm-button text="进入" size="large" @click.native="clickHandle"></tm-button>
        <tm-button text="进入" size="large" type="primary" @click.native="clickHandle"></tm-button>
        <tm-button text="进入" size="large" type="primary" :disabled="true" @click.native="clickHandle"></tm-button>
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
