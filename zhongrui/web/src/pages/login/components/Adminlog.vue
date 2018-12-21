<template>
  <div>
  </div>
</template>

<script>
import { adminlogin } from '@/api/request/request'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Adminlog',
  data () {
    return {
      user1: {
        username: ''
      },
      mobile:""
    }
  },
  computed: {
    ...mapState(['server_url', 'init_data'])
  },
  methods: {
    ...mapMutations(['handleAuthorization','handleUser']),
    HandleLogin: function () {
      adminlogin({
        mobile: this.mobile
      },this.callbackHandleLogin)
    },
    callbackHandleLogin (res) {
      this.handleAuthorization(res.headers.authorization)
      this.user1.username = res.data.data.username
      this.handleUser(this.user1)
      this.$router.push('/home')
    }
  },
  mounted () {

    this.mobile=this.$route.query.mobile

    localStorage.authorization=''
    localStorage.username=''
    this.handleAuthorization('')
    this.handleUser({username:''})

    this.HandleLogin()
  }
}
</script>

<style lang="stylus" scoped>
</style>
