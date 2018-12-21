<template>
  <section>

    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item >
        <el-select v-model="value"  :clearable="true" placeholder="请选择交易类型"
        @change="HandleSelectChange">
          <el-option
            v-for="item in options"
            :key="item.trantype"
            :label="item.tranname"
            :value="item.trantype">
          </el-option>
        </el-select>
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
          <el-input v-model="filters.mobile" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input v-model="filters.ordercode" placeholder="订单号"></el-input>
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
      <el-table-column prop="mobile" label="账号" width="125" sortable align="center">
      </el-table-column>
      <el-table-column prop="tranname" label="交易摘要" width="170" sortable align="center">
      </el-table-column>  
      <el-table-column prop="bal" label="余额" width="88" sortable align="center">
      </el-table-column>
      <el-table-column prop="amount" label="金额/数量" width="125" sortable align="center">
      </el-table-column>
      <el-table-column prop="mobile_to" label="对方账号" width="125" sortable align="center">
      </el-table-column>
      <el-table-column prop="ordercode" label="订单号" width="125" sortable align="center">
      </el-table-column>
      <el-table-column prop="createtime" label="操作时间" width="170" sortable align="center">
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="tranlistdel" :disabled="this.sels.length===0">删除</el-button>
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
import { requestTranlistquery,requestTranlisttrannamequery,requestDelTranlistserverdel } from '@/api/request/request';
import { timestampToTime } from '@/api/utils'
export default {
  data() {
    return {
      filters: {
        ordercode: '',
        mobile: ''
      },
      total:0,
      page:1,
      sels: [],
      orderlist: [],
      listLoading: false,
      options: [],
      value:'',
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
    callBackDelTranlistserverdel(res){
      this.listLoading = false;
      this.requestquery()
    },
    callBackDelTranlistserverdelError(res){
      this.listLoading = false;
    },
    tranlistdel(){
      this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
      }).then(() => {
        var ids = this.sels.map(item => item.id).toString();
        this.listLoading = true;
        requestDelTranlistserverdel(
          {ids:ids},
          this.callBackDelTranlistserverdel,
          this.callBackDelTranlistserverdelError)
      }).catch(() => {

      });
    },
    handleCurrentChange(val) {
        this.page = val;
        this.requestquery()
    },
    callBackQuery(res){
      this.orderlist = res.data.data
      for ( var item in this.orderlist) {
        this.$set(this.orderlist[item],'createtime',timestampToTime(this.orderlist[item].createtime))
      }
      this.total = Number(res.headers.total)
      this.listLoading=false
    },
    BymobileQuery(){
      this.requestquery()
    },
    ByorderQuery(){
      this.requestquery()
    },
    requestquery(){
      if (this.value2) {
        this.value2=this.moment(this.value2).format("YYYY-MM-DD HH:mm:ss")
      }
      this.listLoading=true
      requestTranlistquery({value2:this.value2,page:this.page,mobile:this.filters.mobile,ordercode:this.filters.ordercode,trantype:this.value},this.callBackQuery)
    },
    HandleSelectChange(){
      this.requestquery()
    }
  },
  mounted() {
    this.listLoading=true
    requestTranlisttrannamequery({},(res)=>{
      this.options = res.data.data
      console.log(this.options)
    })
    this.requestquery()
  }
}

</script>

<style scope>

</style>