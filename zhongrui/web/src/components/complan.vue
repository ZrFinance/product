<template>
  <div class="all_div">
    <div class="divgroup" v-for="src in list">
      <img class="img" :src="src">
    </div>
    <pub-tabbar></pub-tabbar>
  </div>
</template>

<script>
const config = require('../../config')
var server_url = config.dev.proxyTable[Object.keys(config.dev.proxyTable)[0]].target+'/nginx_upload/pdf/'

import { XImg } from 'vux'
import PubTabbar from '@/components/tabbar'
export default {
  components: {
    XImg,
    PubTabbar
  },
  data () {
    return {
      list: [
        server_url+'1.JPG',
        server_url+'2.JPG',
        server_url+'3.JPG',
        server_url+'4.JPG',
        server_url+'5.JPG',
        server_url+'8.JPG',
        server_url+'9.JPG',
        server_url+'11.JPG',
        server_url+'12.JPG',
        server_url+'13.JPG',
        server_url+'14.JPG',
        server_url+'15.JPG',
        server_url+'16.JPG',
        server_url+'17.JPG'
      ]
    }
  }
}
</script>

<style lang="stylus" scoped >
.all_div
  .divgroup
    .img
      width:100%;
</style>