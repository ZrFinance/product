<template>
  <div class="notice">
    <router-link class="p" to="/notice">{{this.createtime}} {{this.title}}:{{this.content}} </router-link>
  </div>
</template>


<script>
import { getNotice } from '@/api/request/request'
import { timestampToTime } from '@/api/utils'
export default {
  name: 'HomeNotice',
  data () {
    return {
      createtime:'',
      title:''
    }
  },
  methods: {
    meth_getNotice: function () {
      getNotice(this.callbackGetNotice)
    },
    callbackGetNotice: function (res) {
      if (res.data.data){
        this.title = res.data.data.title
        this.content = res.data.data.content
        this.createtime = timestampToTime(res.data.data.createtime)   
      }
    } 
  },
  mounted () {
    this.meth_getNotice()
  }
}
</script>

<style lang="stylus" scoped>
  .notice
    width:90%
    margin-top: .15rem
    margin-left: .15rem
    margin-right: .15rem
    padding: .08rem .2rem .08rem;
    border: 1px solid #ff2424;
    border-radius: 0.1rem;
    .p
      height: 0.5rem;
      line-height: 0.5rem;
      display: block;
      font-size: 0.27rem;
      color: #ff0000;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
</style>
