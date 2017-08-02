<template>
  <div>
    <marquee>
      <marquee-item v-for="i in asyncCount" :key="i" @click.native="onClick(i)" class="align-middle">hello world {{i}}</marquee-item>
    </marquee>
  </div>
</template>



<script>
import Marquee from '../../components/marquee/marquee';
import MarqueeItem from '../../components/marquee/marqueeItem';

/* eslint-disable no-console */
export default {
  components: {
    Marquee,
    MarqueeItem,
  },
  mounted() {
    setTimeout(() => {
      this.asyncCount = 5;
    }, 1000);
  },
  methods: {
    onClick(i) {
      console.log(i);
    },
  },
  data() {
    return {
      asyncCount: 0,
    };
  },
};
</script>

<style scoped>
.align-middle {
  text-align: center;
  font-size: 48px;
  line-height: 50px;
}

</style>
