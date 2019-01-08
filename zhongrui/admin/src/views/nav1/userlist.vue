<template>
  <section>


    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">

        <el-form-item >
          <el-date-picker
              v-model="filters.value3"
              type="daterange"
              align="right"
              placeholder="选择用户注册日期范围"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="filters.matchauth">
            <el-radio-button label="0">白名单</el-radio-button>
            <el-radio-button label="1">黑名单</el-radio-button>
            <el-radio-button label="2">红名单</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-col>

    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item >
          <el-input v-model="filters.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input v-model="filters.referee_name" placeholder="推荐人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="requestHandle">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table 
      :data="userlist" 
      highlight-current-row 
      v-loading="listLoading" 
      style="width: 100%;"
      :border="true"
      :fit="true"
      max-height="500">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="userid" label="编号" width="88" sortable align="center">   
      </el-table-column>   
      <el-table-column prop="mobile" label="账号" width="125" sortable align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="88" sortable align="center">
      </el-table-column>
      <el-table-column prop="mobile" label="手机" width="125" sortable align="center">
      </el-table-column>
      <el-table-column prop="referee_name" label="推荐人" width="125" sortable align="center">
      </el-table-column>
      <el-table-column prop="statusname" label="状态" width="88" sortable align="center">
      </el-table-column>
      <el-table-column prop="matchauthname" label="匹配权限" width="125" sortable align="center">
      </el-table-column>
      <el-table-column prop="spread" label="推广股权" width="125" sortable align="center">
      </el-table-column>
      <el-table-column prop="bonus" label="股权分红" width="125" sortable align="center">
      </el-table-column>
      <el-table-column prop="activation" label="激活码" width="100" sortable align="center">
      </el-table-column>
      <el-table-column prop="buypower" label="认筹权" width="100" sortable align="center">
      </el-table-column>
      <el-table-column prop="integral" label="VIP分" width="100" sortable align="center">
      </el-table-column>
      <el-table-column prop="createtime" label="注册时间" width="170" sortable align="center">
      </el-table-column>
      <el-table-column prop="endtime" label="最后认筹" width="170" sortable align="center">
      </el-table-column>
      <el-table-column prop="blockcount" label="被封次数" width="125" sortable align="center">
      </el-table-column>
      <el-table-column 
        label="操作"
        width="230"
        align="center"
        fixed="right">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="AmountSendEdit(scope.row)">系统赠送</el-button>
          <el-button type="danger" size="small" @click="goLinkLogin(scope.row)">登录</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-col :span="24" class="toolbar">
      <el-pagination 
      layout="prev, pager, next"
      background="true"
      @current-change="handleCurrentChange"
      :page-size="20"
      :total="total"
      :pager-count="5"
      style="float:right;">
      </el-pagination>
    </el-col>

    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="150px" :rules="editFormRules" ref="editForm" label-position='left'>
        <el-form-item label="用户名" prop="username">
          <el-input 
            v-model="editForm.username"
            auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input 
            v-model="editForm.mobile"
            auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="推荐人" prop="referee_name">
          <el-input 
            v-model="editForm.referee_name"
            auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="editForm.status">
            <el-radio class="radio" label="0">正常</el-radio>
            <el-radio class="radio" label="1">未激活</el-radio>
            <el-radio class="radio" label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="匹配权限" prop="matchauth">
          <el-radio-group v-model="editForm.matchauth">
            <el-radio class="radio" label="0">白名单</el-radio>
            <el-radio class="radio" label="1">黑名单</el-radio>
            <el-radio class="radio" label="2">红名单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="密码" prop="passwd">
          <el-input 
            v-model="editForm.passwd"
            auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="支付密码" prop="pay_passwd">
          <el-input 
            v-model="editForm.pay_passwd"
            auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="认筹权额度抢单控制" prop="rcqlimit">
          <el-input 
            v-model="editForm.rcqlimit"
            auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="支付宝" prop="alipay">
          <el-input 
            v-model="editForm.alipay"
            auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="微信" prop="wechat">
          <el-input 
            v-model="editForm.wechat"
            auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="户名" prop="name">
          <el-input 
            v-model="editForm.name"
            auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="bank">
          <el-input 
            v-model="editForm.bank"
            auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bank_account">
          <el-input 
            v-model="editForm.bank_account"
            auto-complete="off">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="系统赠送" v-model="AmountSendVisible" :close-on-click-modal="false">
      <el-form :model="AmountSend" label-width="80px" :rules="AmountSendRules" ref="AmountSend">
        <el-form-item label="赠送类型" prop="type">
          <el-radio-group v-model="AmountSend.type">
            <el-radio class="radio" :label="7">股权分红</el-radio>
            <el-radio class="radio" :label="8">推广股权</el-radio>
            <el-radio class="radio" :label="15">激活码</el-radio>
            <el-radio class="radio" :label="16">认筹权</el-radio>
            <el-radio class="radio" :label="28">VIP分</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="金额" prop="amount">
          <el-input
            v-model="AmountSend.amount"
            auto-complete="off">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="AmountSendVisible = false">取消</el-button>
        <el-button type="primary" @click.native="AmountSendSubmit" :loading="AmountSendLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { requestUserQuery,requestUserUpd,requestAmountSend } from '@/api/request/request';
import { timestampToTime } from '@/api/utils'
import { dateformart } from '@/api/utils'
const config = require('../../../config')
var server_url = config.dev.proxyTable[Object.keys(config.dev.proxyTable)[0]].target
export default {
  data() {
    return {
      filters: {
        username: '',
        name: '',
        referee_name:'',
        matchauth:'0',
        value3:''
      },
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      startdate:'',
      enddate:'',
      userlist: [],
      listLoading: false,
      total:0,
      page:1,
      AmountSendVisible: false,
      AmountSendLoading: false,
      AmountSendRules: {
        type: [
          { type:'number', required: true, message: '请选择赠送类型', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ]
      },
      AmountSend: {
        type: 7,
        amount: 0,
        userid:''
      },
      editFormVisible: false,      
      editLoading: false,
      editFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        referee_name: [
          { required: true, message: '请输入推荐人', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        matchauth: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        rcqlimit: [
          { required: false, message: '请输入认筹权额度抢单控制', trigger: 'blur' }
        ],
        passwd: [
          { required: false, message: '请输入密码', trigger: 'blur' }
        ],
        pay_passwd: [
          { required: false, message: '请输入支付', trigger: 'blur' }
        ],
        alipay: [
          { required: true, message: '请输入支付宝', trigger: 'blur' }
        ],
        wechat: [
          { required: true, message: '请输入微信', trigger: 'blur' }
        ],
        bank: [
          { required: true, message: '请输入开户行', trigger: 'blur' }
        ],
        bank_account: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入户名', trigger: 'blur' }
        ]
      },
      //编辑界面数据
      editForm: {},
      editForm1: {}
    }
  },
  methods: {
    goLinkLogin(row){
      window.location.href=server_url+'/#/adminlog?mobile='+row.mobile
    },
    handleCurrentChange(val) {
        this.page = val;
        this.requestHandle()
    },
    callBackrequestUserQuery(res){
      this.userlist = res.data.data
      for ( var item in this.userlist) {
        this.$set(this.userlist[item],'createtime',timestampToTime(this.userlist[item].createtime))
        if ( this.userlist[item].endtime !== '' ){
          this.$set(this.userlist[item],'endtime',timestampToTime(this.userlist[item].endtime))
        }
      }
      this.total = Number(res.headers.total)
      this.listLoading=false
    },
    handleDel(){

    },
    handleEdit: function (row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      this.$set(this.editForm,'status',this.editForm.status+'')
      if (this.editForm.rcqlimit===0){
        this.$set(this.editForm,'rcqlimit','')
      }
    },
    AmountSendEdit: function (row) {
      this.AmountSendVisible = true;
      let tmp = Object.assign({}, row);
      this.AmountSend.userid = tmp.userid
    },
    callBackrequestUserUpd(res){
      this.editLoading = false;
      this.$refs['editForm'].resetFields();
      this.editFormVisible = false;
      this.requestHandle()
    },
    callBackrequestUserUpdError(res){
      this.editLoading = false;
    },
    editSubmit() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true;
            this.$set(this.editForm1,'username',this.editForm.username)
            this.$set(this.editForm1,'status',this.editForm.status)
            this.$set(this.editForm1,'alipay',this.editForm.alipay)
            this.$set(this.editForm1,'wechat',this.editForm.wechat)
            this.$set(this.editForm1,'name',this.editForm.name)
            this.$set(this.editForm1,'bank',this.editForm.bank)
            this.$set(this.editForm1,'bank_account',this.editForm.bank_account)
            this.$set(this.editForm1,'mobile',this.editForm.mobile)
            this.$set(this.editForm1,'userid',this.editForm.userid)
            this.$set(this.editForm1,'rcqlimit',this.editForm.rcqlimit)
            this.$set(this.editForm1,'referee_name',this.editForm.referee_name)
            this.$set(this.editForm1,'matchauth',this.editForm.matchauth)
            if ( this.editForm.passwd ){
              this.$set(this.editForm1,'passwd',this.$md5(this.editForm.passwd))            
            }
            if ( this.editForm.pay_passwd ){
              this.$set(this.editForm1,'pay_passwd',this.$md5(this.editForm.pay_passwd))            
            }

            requestUserUpd(this.editForm1,this.callBackrequestUserUpd,this.callBackrequestUserUpdError)
          })
        }
      })
    },
    callBackrequestAmountSend(res){
      this.AmountSendLoading = false;
      this.$refs['AmountSend'].resetFields();
      this.AmountSendVisible = false;
      this.requestHandle()
    },
    callBackrequestAmountSendError(res){
      this.AmountSendVisible = true;
    },
    AmountSendSubmit() {
      this.$refs.AmountSend.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.AmountSendLoading = true;
            requestAmountSend(this.AmountSend,this.callBackrequestAmountSend,this.callBackrequestAmountSendError)
          })
        }
      })
    },
    requestHandle(){
      this.listLoading=true
      if(this.filters.value3[0] && this.filters.value3[1]){
        this.startdate=dateformart(this.filters.value3[0])+' 00:00:01'
        this.enddate=dateformart(this.filters.value3[1])+' 23:59:59'      
      }
      requestUserQuery({
        page:this.page,
        name:this.filters.name,
        username:this.filters.username,
        referee_name:this.filters.referee_name,
        matchauth:this.filters.matchauth,
        startdate:this.startdate,
        enddate:this.enddate},this.callBackrequestUserQuery)
    }
  },
  mounted() {
    this.requestHandle()
  }
}

</script>

<style scope>

</style>