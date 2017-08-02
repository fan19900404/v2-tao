/**
* Created by litian on 16/8/23.
*/
<style scoped>
    .container{
        padding-top: 1.6rem;
    }
    .content{
        background: #fff;
    }
    .list{
        border-bottom: 1px solid #dfdfdf;
        border-top: 1px solid #dfdfdf;
        padding-left: 1.6rem;
    }
    .input-group{
        min-height: 4.4rem;
        display: -webkit-box;
        display: flex;

         -webkit-box-align: center; /*垂直对齐*/
         -webkit-box-pack: start; /*左右对齐*/
        align-items: center; /*垂直对齐*/
        justify-content: flex-start; /*左右对齐*/
    }
    .input-group:not(:last-child){
        border-bottom: 1px solid #dfdfdf;
    }
    .input-group>div:first-child{
        width: 8rem;
        font-size: 1.4rem;
    }
    .input-group>div:nth-child(2){
        flex:1;
    }
    ::-webkit-input-placeholder{
        font-size: 1.2rem;
        color: #898989;
    }
    .input-group input{
        display: block;
        font-size: 1.4rem;
        width: 100%;
        height:2.8rem;
        border: none;
    }
    .input-group .icon-keyboard_arrow_left{
        font-size: 1.8rem;
        color: #898989;
        transform: rotate(180deg);
    }
    .header-right{
        border: none;
        background: transparent;
        padding: 0 0 0 2rem;
        text-align: right;
    }
    .btn-area{
      padding: 1rem 1.6rem 0 1.6rem;
    }
    .btn-area .save{
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
    <app-header :title="'收货地址'" :type="back">
        <!-- <button slot="right" v-if="isSave" class="header-right" @touchstart="update_address">保存</button> -->
    </app-header>
    <div class="container">
        <div class="content">
            <div class="list">
                <div class="input-group">
                    <div>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</div>
                    <div>
                        <input type="text" v-model="address.name" placeholder="填写真实姓名">
                    </div>
                </div>
                <div class="input-group">
                    <div>手机号码:</div>
                    <div>
                        <input type="text" v-model="address.phone" placeholder="填写能联系到您的电话">
                    </div>
                </div>
                <div class="input-group">
                    <div>所在地区:</div>
                    <div>
                        <input id="address_txt" type="text" value="{{region_txt}}" placeholder="省份 城市 区县" readonly>
                        <input id="address_id" type="hidden" value="{{region_id}}">
                    </div>
                    <i class="icon-keyboard_arrow_left"></i>
                </div>
                <div class="input-group">
                    <div>详细地址:</div>
                    <div>
                        <input type="text" v-model="address.other" placeholder="填写详细地址,不少于5个字" minlength="5">
                    </div>
                </div>
            </div>
            <div class="btn-area">
                <a class="save" @click.prevent="update_address">保存</a>
            </div>
        </div>
    </div>
    <!--<div class="add-new"></div>-->
    <!-- 底部菜单兰 -->
    <app-bottom-bar></app-bottom-bar>
</template>

<script>
    import AppHeader from '../../oldComponents/common/header/app-header';
    import AppBottomBar from '../../oldComponents/common/footer/app-bottom-bar';
    import Toast from 'vue-toast-mobile';
    import regionNewData from '../../config/citylist_new';
    export default{
        components: {
            AppHeader,
            AppBottomBar,
        },
        vuex: {
            getters: {
                address_list: ({personal}) => {
                    return personal.address_list
                }
            }
        },
        data(){
            var id = this.$route.query.address_id;
            var address = this.address_list.get(id) || {};
            return {
                isSave: true,
                address:address
            }
        },
        mounted(){
          $('body').css({'background-color': '#f8f8f8'});
          var area = new LArea();
            area.init({
                'trigger':'#address_txt',
                'valueTo':'#address_id',
                'keys':{id:'regionID',name:'regionName'},
                'type':1,
                'data':regionNewData
            })
        },
        computed:{
            region_txt:function () {
                if(this.address.province){
                    return this.address.province +','+ this.address.city+','+ this.address.district
                }else{
                    return '';
                }
            },
            region_id:function(){
                if(this.address.provinceID){
                    return this.address.provinceID + ','+ this.address.cityID+','+ this.address.districtID;
                }else{
                    return '';
                }
            }
        },
        methods: {
            update_address(){
                if(this.address){
                    if(!this.address.name){
                        mallUtils.layer.alert('请填写真实姓名');
                        return;
                    }
                    if(!this.address.phone){
                        mallUtils.layer.alert('请填写手机号码');
                        return;
                    }
                    if(this.address.phone != ""){
                        var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
                        if(!reg.test(this.address.phone)){
                            mallUtils.layer.alert("请填写正确手机号码");
                            return;
                        }
                    }
                    if(!$("#address_txt").val()){
                        mallUtils.layer.alert('请选择所在区域');
                        return;
                    }
                    if(!this.address.other){
                        mallUtils.layer.alert('请填写详细地址');
                        return;
                    }
                    if(this.address.other != ""){
                        var str = this.address.other.replace(/[^\x00-\xff]/g, 'xx');
                        if(str.length < 10){
                            mallUtils.layer.alert("详细地址必须多于5个字");
                            return;
                        }
                    }
                    var adr_txt = $("#address_txt").val().split(',')
                    var adr_id = $("#address_id").val().split(',');
                    var region = {
                        province:adr_txt[0],
                        city:adr_txt[1],
                        district:adr_txt[2],
                        provinceID:adr_id[0],
                        cityID:adr_id[1],
                        districtID:adr_id[2]
                    }
                    //特殊说明 vuex里address是一个map对象合并后传递给后端接收不到参数，所以这里先将map对象转成json字符串然后在转换成json对象
                    /*var reqData = Object.assign(JSON.parse(JSON.stringify(this.address)),region);*/
                    var reqData = Object.assign(this.address,region);
                    var self = this;
                    var url = '';
                    if(this.$route.query.address_id){
                        url = Vue.OneMallUrl.personal_address_update;
                    }else{
                        url = Vue.OneMallUrl.personal_address_add;
                    }
                    /*url="https://jsonplaceholder.typicode.com/posts";*/
                    Vue.OneMallHttp(this).GET(reqData, url)
                            .then(function (res) {
                                if(res.code == 10000){
                                    mallUtils.layer.alert(res.msg,2,function(elem){
                                        self.$router.go('/personal/address');
                                    })
                                }else{
                                    mallUtils.layer.alert(res.msg);
                                }
                            })
                }
            }
        }
    }
</script>


