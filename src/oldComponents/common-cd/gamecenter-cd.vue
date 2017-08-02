<template>
  <span class="side_head_time">{{hour}}时{{minute}}分{{second}}秒</span>
</template>

<script>
  export default {
    props:{
      endtime:Number, //传递的距离结束的时间 秒为单位
      templateType:Number, //后期扩展是控制怎样显示倒计时
      otherArgs:{} //扩展时需要传递的其他参数
    },
    data() {
      return {
        hour: '00',
        minute: '00',
        second: '00'
      }
    },
    methods:{
      praise: function() {
        console.log('进入倒计时',this.templateType);
        var _this = this;
        _this.hour = Math.floor((_this.endtime%86400)/3600);
        _this.minute = Math.floor((_this.endtime%3600)/60);
        _this.second = Math.floor(_this.endtime%60);

        _this.hour = _this.hour < 10?'0'+_this.hour:_this.hour;
        _this.minute = _this.minute < 10?'0'+_this.minute:_this.minute;
        _this.second = _this.second < 10?'0'+_this.second:_this.second;

        var t = setInterval(function() {
          if(_this.endtime > 0){
            var h = Math.floor((_this.endtime%86400)/3600);
            var m = Math.floor((_this.endtime%3600)/60);
            var s = Math.floor(_this.endtime%60);
            _this.hour = h < 10? '0'+h : h;
            _this.minute = m < 10? '0'+m : m;
            _this.second = s < 10? '0'+s : s;
            --_this.endtime;
          }else{
            clearInterval(t);
            //执行传入的需要在倒计时结束后传递的方法
            _this.$dispatch('timer-action'); //$dispatch这种方法看文档上说弃用了，使用另外的方法，http://cn.vuejs.org/v2/guide/migration.html#dispatch-和-broadcast-替换
          }
        },1000)
      }
    },
    mounted(){
      this.praise();
    }
  }
</script>
<style lang="scss" scoped>
  /* 引入公共的样式 */
  @import '../../assets/tao-you/common.scss';

  .side_head_time{
    float: right;
    color:$words;
    font-size:$font-size-sm;
    margin-right: .14rem;
    line-height: .44rem;
    position: relative;
  }
  .side_head_time:before{
    position: absolute;
    left: -.2rem;
    font-family: icons;
    content: '\1f359';
  }
</style>
