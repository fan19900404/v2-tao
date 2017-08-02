<template>
  <div style="height: 100vh">
    <div>
      <div @click="showTips">显示弹出层</div>
    </div>
    <div>
      <div @click="()=>{showHideOnBlur=true}">点击遮罩层自动关闭</div>
    </div>
    <div>
      <div @click="()=>{showDialogStyle=true}">自定义 dialog 容器样式</div>
    </div>

    <div>
      <x-dialog v-model="show" class="dialog-demo">
        <div class="img-box">
          本来是图片
        </div>
        <div @click="show=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>

    <div>
      <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
        <div class="img-box">
          12345
        </div>
      </x-dialog>
    </div>

    <div>
      <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
        <p style="color:#fff;text-align:center;" @click="showDialogStyle = false">
          <span style="font-size:30px;">HELLO WORLD</span>
          <br>
          <br>
          <span type="ios-close-outline" style="fill:#fff;">关闭</span>
        </p>
      </x-dialog>
    </div>

  </div>
</template>



<script>
import XDialog from '../../components/dialog/dialog';

export default {
  components: {
    XDialog,
  },
  data() {
    return {
      show: false,
      showHideOnBlur: false,
      showDialogStyle: false,
    };
  },
  methods: {
    showTips() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
