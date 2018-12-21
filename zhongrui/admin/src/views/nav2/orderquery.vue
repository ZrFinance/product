<template>
  <section>

    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item >
          <el-radio-group v-model="status">
            <el-radio-button label="交易中"></el-radio-button>
            <el-radio-button label="交易完成"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-col>

    <el-col :span="6" class="toolbar" style="padding-bottom: 0px;">
      <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" v-model="value2" style="width: 100%;" :picker-options="pickerOptions1" ></el-date-picker>
    </el-col>

    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item >
          <el-input v-model="filters.ordercode" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input v-model="filters.mobile" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input v-model="filters.ordercode_to" placeholder="对方订单号"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input v-model="filters.mobile_to" placeholder="对方账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="requestquery">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="orderlist" 
      highlight-current-row 
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%;"
      :border="true"
      :fit="true"
      max-height="500">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="ordercode" label="订单号" width="100" sortable align="center">   
      </el-table-column>
      <el-table-column prop="ordercode_to" label="对方订单号" width="135" sortable align="center">
      </el-table-column>
      <el-table-column prop="mobile" label="账号" width="125" sortable align="center">
      </el-table-column>
      <el-table-column prop="mobile_to" label="对方账号" width="125" sortable align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100" sortable align="center">
      </el-table-column>
      <el-table-column prop="name_to" label="对方姓名" width="125" sortable align="center">
      </el-table-column>    
      <el-table-column prop="amount" label="订单金额" width="125" sortable align="center">
      </el-table-column>
      <el-table-column prop="confirmtime" label="打款时间" width="170" sortable align="center">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100" sortable align="center">
      </el-table-column> 
      <el-table-column prop="img" label="打款凭证" width="200" sortable align="center">
        <template slot-scope="scope">
          <img  :src="scope.row.img" alt="" style="width: 50px;height: 50px">
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="orderdel" :disabled="this.sels.length===0">删除</el-button>
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
  </section>
</template>

<script>
import { requestOrderQuery,requestDelServerOrder } from '@/api/request/request';
import { timestampToTime,imgjoin } from '@/api/utils'
export default {
  data() {
    return {
      filters: {
        ordercode: '',
        mobile: '',
        ordercode_to: '',
        mobile_to: ''
      },
      total:0,
      page:1,
      sels: [],
      orderlist: [],
      listLoading: false,
      status: '交易中',
      status1:'1',
      trantype:'提供帮助',
      trantype1:'0',
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value2:''
    }
  },
  methods: {
    selsChange(sels) {
        this.sels = sels;
    },
    callBackDelServerOrder(res){
      this.listLoading = false;
      this.requestquery()
    },
    callBackDelServerOrderError(res){
      this.listLoading = false;
    },
    orderdel(){
      this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
      }).then(() => {
        var ordercodes = this.sels.map(item => item.ordercode).toString();
        this.listLoading = true;
        requestDelServerOrder(
          {ordercodes:ordercodes},
          this.callBackDelServerOrder,
          this.callBackDelServerOrderError)
      }).catch(() => {

      });
    },
    handleCurrentChange(val) {
        this.page = val;
        this.requestquery()
    },
    callBackTgbzStatusQuery(res){
      this.orderlist = res.data.data
      for ( var item in this.orderlist) {
        if (this.orderlist[item].confirmtime>0){
          this.$set(this.orderlist[item],'confirmtime',timestampToTime(this.orderlist[item].confirmtime))       
        }else{
          this.$set(this.orderlist[item],'confirmtime','')  
        }
        this.$set(this.orderlist[item],'img',imgjoin(this.orderlist[item].img))
        this.$set(this.orderlist[item],'status',this.status) 
      }
      this.total = Number(res.headers.total)
      this.listLoading=false
    },
    requestquery(){
      if (this.value2) {
        this.value2=this.moment(this.value2).format("YYYY-MM-DD HH:mm:ss")
      }
      this.listLoading=true
      requestOrderQuery({
        value2:this.value2,
        page:this.page,
        mobile:this.filters.mobile,
        ordercode:this.filters.ordercode,
        mobile_to:this.filters.mobile_to,
        ordercode_to:this.filters.ordercode_to,
        status:this.status1
      },this.callBackTgbzStatusQuery)
    }
  },
  watch: {
    status (val, oldVal) {
      if (val=='交易中'){
        this.status1=1
      }else{
        this.status1=2
      }
      this.requestquery()
    }
  },
  mounted() {
    this.requestquery()
  }
}

</script>

<style scope>

</style>