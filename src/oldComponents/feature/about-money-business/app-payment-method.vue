<style scoped>
    .pay-container {
        /*background-color: #fff;*/
    }

    .active {
        background: #ff4a4a;
        border: 1px solid #ff4a4a;
        font-size: 2rem;
        font-weight: 600;
        line-height: 2.4rem;
        color: #fff;
    }

    .not-active {
        border: 1px solid #dfdfdf;
    }

    .active:before {
        content: "\e5ca";
        color: #fff;
    }

    .pay-info {
        height: 4.6rem;
        line-height: 4.6rem;
        font-size: 1.4rem;
        text-indent: 1.6rem;
        border-top: 1px solid #dfdfdf;
    }

    .pay-method-container {
        font-size: 1.4rem;
        border-top: 1px solid #dfdfdf;
        border-bottom: 1px solid #dfdfdf;
        background-color: #fff;
    }

    .pay-method {
        height: 4.6rem;
        padding-left: 1.6rem;
        align-items: center;
    }

    .pay-method:not(:last-child) {
        border-bottom: 1px solid #dfdfdf;
    }

    .hidden-radio-container {
        position: relative;
    }

    .radio-show {
        width: 2.4rem;
        height: 2.4rem;
        line-height: 2.4rem;
        text-align: center;
        border-radius: 50%;
        margin-right: 1.6rem;
    }

    .hidden-radio {
        position: absolute;
        border: none;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: transparent;
        opacity: 0;
    }

    .pay-icon {
        width: 2.2rem;
        height: 2.2rem;
        margin-right: 1rem;
        background-size: contain;
        background-repeat: no-repeat;
    }
    .pay-tip{
        font-size: 1.1rem;
        color:#898989;
        line-height: 1;
    }

    .taobi-num {
        color: #ff6709;
        margin-right: 1rem;
    }

    .alipay-logo {
        background-image: url(/static/images/aliPay.png);
    }

    .union-logo {
        background-image: url(/static/images/unionPay.png);
    }

    .wechat-logo {
        background-image: url(/static/images/wechatPay.png);
    }

    .taobi-logo {
        background-image: url(/static/images/taobiPay.png);
    }

</style>

<template>
    <section class="pay-container">
        <div class="pay-info">选择支付方式</div>
        <div>{{showTip}}</div>
        <ul class="pay-method-container">
            <li class="dr-flex pay-method" v-for="method in pay_methods">
                <i class="pay-icon" :style="{backgroundImage:'url('+method.icon+')'}"></i>
                <div class="flex-1">
                    <div>{{method.name}}</div>
                    <div class="pay-tip" v-if="show_tip">{{method.tip}}</div>
                </div>
                <span class="taobi-num" v-if="method.num > 0">{{taoBi}}淘币</span>
                <i class="hidden-radio-container radio-show icon" :class="{
          'active': type === method.id,
          'not-active': type !== method.id
        }">
                    <input v-model="type" value="{{method.id}}" class="hidden-radio" type="radio">
                </i>
            </li>
        </ul>
    </section>
</template>

<script>
    import pay_methods from '../../../config/pay_methods';
    export default {
        props: {
            type: {
              type:String
            },
            choose: {
                type:String
            },
            method_list: {
                type:Array,
                default:function () {
                    return ['aliPay','wechatPay','unionPay','taobiPay'];
                }
            },
            show_tip:{
                type:Boolean
            }
        },
        components: {},
        vuex: {
            getters: {
              taoBi: ({pay}) => pay.taoBi
            }
        },
        data(){
            var self = this;
            return {
                // type: this.choose || 'aliPay', //默认使用支付宝
                pay_methods: (() => {
                    var ret = [];
                    self.method_list.forEach((method)=> {
                        //用户的淘币数量
                        if(method == 'taobiPay'){
                            //todo 获取准确的淘币数量
                            pay_methods[method].num = +this.$route.params.taoBi;
                        }
                        ret.push(pay_methods[method]);
                    });
                    console.log(ret);
                    return ret;
                })()
            }
        },
        methods: {}
    }
</script>
