<style scoped>
    .list {
        background: #fff;
    }

    .list > li {
        border-bottom: 1px #dfdfdf solid;
        padding: .5rem 1.6rem;
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
    .service > img{
      width:4rem;
      margin-right: .5rem
    }
</style>

<template>
    <app-header :title="title" :type="type"></app-header>
    <div>
        <ul class="list">
            <li class="service" v-for="item in list">
                <img :src="item.avator" alt="">
                <p>联系客服{{item.name}} 请加QQ群{{item.qq}}</p>
            </li>
        </ul>
    </div>
    <app-footer></app-footer>
</template>

<script>
    import Vue from 'vue';
    import AppHeader from '../../components/common-layout/header.component';
    import AppFooter from '../../components/common-layout/footer.component';
    export default{
        components: {
            AppHeader,
            AppFooter
        },
        data(){
            return {
                type: 'back',
                title: '淘游客服',
                list:[{
                        "avator":"/static/images/personal/s-head.jpg",
                        "qq":"888888",
                        "name":"小二",
                        "id":"5"
                      },
                      {
                        "avator":"/static/images/personal/s-head.jpg",
                        "qq":"888889",
                        "name":"小四",
                        "id":"6"
                      },
                      {
                        "avator":"/static/images/personal/s-head.jpg",
                        "qq":"888887",
                        "name":"小五",
                        "id":"7"
                      }
                    ]
            }
        },
        mounted(){
          $('body').css('background-color', '#f8f8f8');
            /*var self = this;
            Vue.OneMallHttp().GET({}, '/api/personal/service')
                    .then(function (res) {
                        console.log(res);
                        self.list = res.list;
                    })
*/        }
    }
</script>
