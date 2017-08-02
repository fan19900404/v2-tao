<style scoped>
.nodata {
    padding-top: 4rem;
    text-align: center;
  }

  .nodata .img {
    width: 9.3rem;
    height: 10rem;
    display: inline-block;
  }

  .nodata .text {
    color: #8e8e8e;
    font-size: 1.6rem;
    height: 3rem;
    line-height: 3rem;
  }
</style>

<template>
	<section class="nodata">
		<p>
	      <img class="img" src="/oldStatic/images/no-data.png" alt="">
	    </p>
	    <p class="text" v-for=" text in list">
	    	{{text}}
	    </p>
	</section>
</template>

<script>
	export default {
		props:["text"],
		data(){
			return {
				list:(!this.text || this.text === "")?[]:(this.text.split("&&"))
			}
		}
	}
</script>