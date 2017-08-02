<style scoped>
    .list {
        border-top: 1px solid #d8d8d8;
        border-bottom: 1px solid #d8d8d8;
    }

    .list > li {
        height: 4.6rem;
        line-height: 4.6rem;
        font-size: 1.4rem;
        color: #3c3e45;
        border-bottom: 1px solid #ececeb;
    }

    .list > li:last-child {
        border: none;
    }

    .list a {
        font-size: 1.4rem;
        color: #3c3e45;
    }

    .list .text {
        font-size: 1.2rem;
        color: #cdcdcd;
    }

    .s-icon {
        width: 1.6rem;
        height: 1.4rem;
        margin-right: .5rem;
        background-position: center;
        background-repeat: no-repeat;
    }

    .icon-tuwen {
        background-image: url(/oldStatic/images/s-tuwen.png);
        background-size: 100% 100%;
    }

    .icon-shaidan {
        background-image: url(/oldStatic/images/s-shaidan.png);
        background-size: 100% 100%;
    }

    .icon-wangqi {
        width: 1.6rem;
        height: 1.6rem;
        background-image: url(/oldStatic/images/s-wangqi.png);
        background-size: contain;
    }

    .icon-lishi {
        background-image: url(/oldStatic/images/s-lishi.png);
        background-size: contain;
    }

    .icon-guide {
        color: #dadada;
        font-size: 1.2rem;
        margin-left: .8rem;
    }

</style>
<template>
    <section class="bg-fff mt-10 ">
        <ul class="list pd-lr-10">
            <li class="flex" v-link="{name: 'goods-graphic-details', params: {id: termId}}">
                <i class="s-icon icon-tuwen"></i>
                <span class="flex-1">图文详情</span>
                <span class="text">建议在WIFI下查看</span>
                <i class="icon icon-guide"></i>
            </li>
            <li class="flex" v-link="{name: 'reckonList', params: {goodsTermId: termId}}">
                <i class="s-icon icon-wangqi"></i>
                <span class="flex-1">往期揭晓</span>
                <i class="icon icon-guide"></i>
            </li>
            <li v-if="lishi" class="flex" v-link="{name: 'history-reward', params: {id: termId}}">
                <i class="s-icon icon-lishi"></i>
                <span class="flex-1">历史走势</span>
                <i class="icon icon-guide"></i>
            </li>
            <li class="flex" v-link="'/shaidanshare'">
                <i class="s-icon icon-shaidan"></i>
                <span class="flex-1">晒单分享</span>
                <i class="icon icon-guide"></i>
            </li>
        </ul>
    </section>
</template>

<script>
    export default {
        props: [
            'lishi',
            'termId'
        ],
        data() {
            return {}
        },
        mounted() {
//          console.log(this.termId, 'component');
//          this.$watch('termId', function(newValue) {
//            console.log(newValue, 'component');
//          })
        },
        methods: {
            goto(hash){
                location.hash = hash;
            }
        }
    }
</script>
