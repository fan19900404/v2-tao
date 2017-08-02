<template>
  <app-header :title="'页面出错'"></app-header>
  <div class="error-page">
    <div class="error-alt"><img  src="/oldStatic/images/home/error-1.png"></div>
    <p>{{container}}</p>
  </div>
</template>
<style >
  .error-page{
    width:100%;
    height: auto;
    position: absolute;
    top:60%;
    margin-top: -13.3rem;
  }
  .error-alt{
    width:100%;
    display: flex;
    justify-content: center;
  }
  .error-alt img{
    width:12rem;
    height: 9.5rem;
  }
  p{
    height: 1.8rem;
    width:100%;
    font-size: 1.4rem;
    font-weight: 400;
    color: rgb(143,143,143);
    text-align: center;
    line-height: 1.8rem;
    margin-top: .5rem;

  }
</style>
<script>
  export default {
    data () {
      return {
        container:""
      }
    },
    methods:{
      getData:function () {
        var query = {

        };
        Vue.OneMallHttp(this).GET(query,Vue.OneMallUrl.error_alt_page)
          .then((res)=>{
            if(10000===res.code){
              this.container = res.result.words;
            }else {
              console.log(res)
            }
          })
      }
    },
    ready:function () {
      $("body").css("background-color","#fff");
//      this.getData();
      this.container = this.$route.query.msg;
    }
  }
</script>
