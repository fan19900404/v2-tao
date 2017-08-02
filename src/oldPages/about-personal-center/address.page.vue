/**
* Created by litian on 16/8/23.
*/
<style scoped>
    .list{
        padding-top: 1.6rem;
    }
    .address{
        background: #fff;
        margin-bottom: 1.6rem;
        padding-left: 1.6rem;
        font-size: 1.2rem;
        border-top: 1px solid #dfdfdf;
        border-bottom: 1px solid #dfdfdf;
    }
    .address>h2{
        line-height: 1;
        font-weight: 500;
        font-size: 1.4rem;
        padding:1rem 1.6rem 1rem 0;
        display: -webkit-box;
        display: flex;

        -webkit-box-align: center; /*垂直对齐*/
        -webkit-box-pack: start; /*左右对齐*/
        align-items: center; /*垂直对齐*/
        justify-content: flex-start; /*左右对齐*/
    }
    .address>h2 .right{
        font-size: 1.2rem;
        color: #ff4a4a;
        flex:1;
        text-align: right;
    }
    .address-content{
        font-size: 1.4rem;
        color: #898989;
        padding: .4rem 0 1.4rem 0;
        border-bottom: 1px solid #dfdfdf;
    }
    .address-action{
        padding: 0 1.6rem 0 0;
        color: #898989;
        line-height: 1;
        display: -webkit-box;
        display: flex;

        -webkit-box-align: center; /*垂直对齐*/
        -webkit-box-pack: start; /*左右对齐*/
        align-items: center; /*垂直对齐*/
        justify-content: flex-start; /*左右对齐*/
    }
    .space {
        flex:1;
    }
    .address-action .icon-check{
        font-size: 1.2rem;
        color: #fff;
        background: #bbb;
        border-radius: 1.2rem;
        vertical-align: middle;
        display: inline-block;
        margin-right: .5rem;
    }
    button.active .icon-check{
        color: #fff;
        background: #ff4a4a;
    }
    .address-action button{
        border:none;
        background: transparent;
        padding: 1rem 0;
        display: -webkit-box;
        display: flex;

        -webkit-box-align: center; /*垂直对齐*/
        -webkit-box-pack: start; /*左右对齐*/
        align-items: center; /*垂直对齐*/
        justify-content: flex-start; /*左右对齐*/
    }
    .address-action .s-icon-edit,.address-action .s-icon-del{
        width: 1.2rem;
        height: 1.2rem;
        display: inline-block;
        margin-right: .3rem;
        vertical-align: baseline;
    }
    .s-icon-edit {
        background-image: url(/oldStatic/images/s-edit-2.png);
        background-size: cover;

    }
    .s-icon-del {
        background-image: url(/oldStatic/images/s-del.png);
        background-size: cover;
    }
    .header-right{
        border: none;
        background: transparent;
        padding: 0 0 0 2rem;
        text-align: right;
    }

    .no-address-tips {
        padding: 1rem 1.6rem 0;
    }

    .no-address-tips .tips-txt {
        line-height: 8.3rem;
        font-size: 1.4rem;
        color: #898989;
        text-align: center;
    }

    .no-address-tips .add-address-btn {
        display: block;
        width: 100%;
        height: 4.3rem;
        line-height: 4.3rem;
        text-align: center;
        font-size: 1.8rem;
        color: #fff;
        background-color: #ff4a4a;
        border-radius: .5rem;
    }
</style>

<template>
    <app-header :title="'管理收货地址'" :prev="'/personal/userinfo'">
        <!-- <button slot="right" v-if="isAdd" class="header-right" v-link="{name:'/personal/address-add'}">添加</button> -->
    </app-header>
    <div class="list">
        <div v-for="item in address_list" class="address">
            <h2>收货人:{{item.name + " " + item.phone}}
                <div v-if="item.default=='1'" class="right">默认地址</div>
            </h2>
            <div class="address-content">收货地址:{{item.province + " " + item.city + " " + item.district + " " + item.other}}</div>
            <div class="address-action">
                <button :class="{'active':item.default=='1'}" @click="changeDefault(item.id,item.default)">
                    <i class="icon icon-check"></i>
                    设为默认地址
                </button>
                <div class="space"></div>
                <button style="margin-right:1rem;" v-link="{name:'/personal/address-add',query:{address_id:item.id}}">
                    <i class="s-icon-edit"></i>编辑
                </button>
                <button @click="del_address(item.id)"><i class="s-icon-del"></i>删除</button>
            </div>
        </div>
        <div class="no-address-tips" >
            <p class="tips-txt" v-if="address_list.length == 0">还木有添加地址</p>
            <a class="add-address-btn" v-link="{name:'/personal/address-add'}">新增地址</a>
        </div>
    </div>

    <!-- 底部菜单兰 -->
    <app-bottom-bar></app-bottom-bar>
</template>

<script>
    import AppHeader from '../../oldComponents/common/header/app-header';
    import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';
    import {setAddressList,updateTaobi} from '../../vuex/actions';
    export default{
        components: {
            AppHeader,
            AppBottomBar
        },
        data(){
            return {
                isAdd: true,
                isSave: false,
                address_list: []
            }
        },
        vuex: {
            actions: {
                setAddressList,
                updateTaobi
            }
        },
        mounted(){
            //每次进入页面从服务端获取数据更新
            this.getAddressList();
        },
        methods:{
            changeDefault(id,setdefault){
                var _this = this;
                if(setdefault == "1"){
                    return;
                }
                Vue.OneMallHttp(this).GET({id:id}, Vue.OneMallUrl.personal_address_change_default)
                                .then(function (res) {
                                    _this.getAddressList();
                                });
                //console.log(id);
            },
            getAddressList(){
                var self = this;
                /*var url = "/api/personal/address_list";*/
                Vue.OneMallHttp(this).GET({}, Vue.OneMallUrl.personal_address_list)
                        .then(function (res) {
                            self.address_list = res.result;
                            //更新收货地址信息
                            self.setAddressList(self.address_list);
                            /*self.updateTaobi(10);*/
                        })
            },
            del_address(id){
                var self = this;
                var confirm = layer.open({
                    skin:"confirm",
                    content:"确认删除该地址信息吗？",
                    btn:['确定','取消'],
                    yes:function(){
                        Vue.OneMallHttp(this).GET({id:id}, Vue.OneMallUrl.personal_address_del)
                        .then(function (res) {
                            //重载数据
                            self.getAddressList();
                            // 取消弹框
                            layer.close(confirm);
                        })
                    },
                    no:function(){
                    }
                })
                /*var url = '/api/personal/del_address';*/

            }
        },
        mounted() {
            $('body').css({'background-color': '#f8f8f8'});
        },
        destroyed() {
            $('body').css({'background-color': '#fff'});
        }
    }
</script>
