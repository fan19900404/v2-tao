<style scoped>
    .bar {
        width: 100%;
        height: .33rem;
        min-height: 5px;
        border-radius: .4rem;
        display: block;
        background: #d8d8d8;
        position: relative;
        overflow: hidden;
    }

    .progress {
        height: 100%;
        display: block;
        position: absolute;
        border-radius: .4rem;
        left: 0;
        top: 0;
        background-image: -webkit-gradient(linear, left top, right top, from(#fcc150), to(#e04512));
        background-image: -webkit-linear-gradient(left, #fcc150, #e04512);
        background-image: linear-gradient(to right, #fcc150, #e04512);
    }
</style>
<template>
	<span v-show="+(all-last)" class="bar">
		<i class="progress" :style="(+all > 0) ? { width: (+last * 100 / +all)+'%'} : { width: 0}"></i>
	</span>
</template>

<script>
    export default {
        props: ['all', 'last']
    }
</script>
