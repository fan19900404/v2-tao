<style scoped>
    .list {
        background: #fff;
    }

    .list > li {
        border-bottom: 1px #dfdfdf solid;
        padding: .5rem 1rem;
        min-height: 4rem;
        display: -webkit-box;
        display: flex;

        -webkit-box-align: center; /*垂直对齐*/
        -webkit-box-pack: start; /*左右对齐*/
        -webkit-box-lines: multiple; /*多行*/
        align-items: center; /*垂直对齐*/
        justify-content: flex-start; /*左右对齐*/
        flex-wrap: wrap; /*多行*/
    }

    .service {
        font-size: 1.4rem;
    }
    .kefu-headpic {
      width: 4rem;
      height: 4rem;
      margin-right: 1rem;
      border-radius: 50%;
    }
</style>

<template>
     <app-header :title="title" :type="type"></app-header>
    <div>
        <ul class="list">
            <li class="service dr-flex" v-for="item in list">
                <img class="kefu-headpic" :src="item.avator" alt="客服">
                <p class="flex-1">联系客服 请添加QQ:{{item.qq}}</p>
            </li>
        </ul>
    </div>

    <!-- 底部菜单兰 -->
    <!--<app-bottom-bar></app-bottom-bar>-->

  <!-- 返回按钮 -->
  <go-back></go-back>
</template>

<script>
    import Vue from 'vue';
    import AppHeader from '../../oldComponents/common/header/app-header';
    //import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';
    import GoBack from '../../oldComponents/feature/common/goback.component';

    export default{
        components: {
            AppHeader,
            GoBack
            //AppBottomBar
        },
        data(){
            return {
                type: 'back',
                title: '夺宝客服',
                list:[{
                        "avator":"/oldStatic/images/s-head.jpg",
                        "qq":"3058308211",
                        "name":"小娜",
                        "id":"5"
                      }
                    ]
            }
        },
        ready () {
         $("body").css({"background-color":"#f8f8f8"});
        },
        mounted(){
            /*var self = this;
            Vue.OneMallHttp().GET({}, '/api/personal/service')
                    .then(function (res) {
                        console.log(res);
                        self.list = res.list;
                    })

*/        }
    }
</script>
