<template>
  <section>
    <el-col>
    <el-card class="box-card" style="margin-top:20px" shadow="always">
      <el-form ref="form" :model="orderlist" label-position="left" label-width="150px" size="mini">
        <el-form-item label="密码">
          <el-col :span="this.spansize">
            <el-input type="password" v-model="orderlist.passwd" placeholder="请输入密码"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button  :loading="logining" type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    </el-col>
  </section>
</template>

<script>
import { requestUpdpasswd } from '@/api/request/request';
export default {
  data() {
    return {
      orderlist: {},
      spansize:16,
      logining:false
    }
  },
  methods: {
    submitForm() {
      this.logining=true
      this.$set(this.orderlist,'passwd',this.orderlist.passwd)
      requestUpdpasswd(this.orderlist,this.callBackHandle)
    },
    callBackHandle(res){
      this.logining=false
      sessionStorage.removeItem('user');
      this.$router.push('/login');
    }
  },
  mounted() {
  }
}
</script>

<style>
.line {
  text-align:center;
}
</style>
