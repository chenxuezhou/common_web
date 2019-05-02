<template>
  <div style="padding:30px;">
       <div class="banner-box">
      <canvas id="qrccode-canvas"></canvas>
    </div>
    <div class="btn-wrap">
      <textarea type="textarea" v-model="bannerUrl" placeholder="输入链接"></textarea>
      <button @click="createQrc">点击生成二维码</button>
    </div>
    
  </div>
</template>
<script>
var QRCode = require('qrcode')
var canvas = ''
export default {
  data () {
    return {
      bannerUrl: ''
    }
  },
  methods: {
    createQrc: function () {
      if (!this.bannerUrl) {
        window.alert('链接不能为空')
        return false
      }
      QRCode.toCanvas(canvas, this.bannerUrl, (error) => {
        if (error) {
          console.log(error)
        } else {
          console.log('success')
        }
      })
    }
  },
  mounted () {
    this.$nextTick(function () {
      // DOM操作
      canvas = document.getElementById('qrccode-canvas')
    })
  }
}
</script>
<style>
.btn-wrap {
  width: 260px;
  height: 260px;
  margin: 0 auto;
}
.btn-wrap textarea{
  width: 260px;
  height: 260px;
}
</style>
