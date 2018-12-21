<template>
  <section>
    <el-col :span="6" class="toolbar" style="padding-bottom: 0px;">
      <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" v-model="value2" style="width: 100%;" :picker-options="pickerOptions1" ></el-date-picker>
    </el-col>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item >
        <el-select v-model="value"  :clearable="true" placeholder="请选择未匹配数量"
        @change="HandleSelectChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item >
          <el-input v-model="filters.ordercode" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input v-model="filters.mobile" placeholder="接受会员"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input v-model="filters.amount" placeholder="接受金额"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="requestHandle(false)">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="ByDayQuery">6日及以上</el-button>
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
      <el-table-column prop="ordercode" label="编号" width="88" sortable align="center">   
      </el-table-column>   
      <el-table-column prop="mobile" label="接受会员" width="125" sortable align="center">
      </el-table-column>
      <el-table-column prop="amount" label="接受金额" width="125" sortable align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="125" sortable align="center">
      </el-table-column>
      <el-table-column prop="isday" label="排队天数" width="125" sortable align="center">
      </el-table-column>
      <el-table-column prop="updtime" label="接受时间" width="170" sortable align="center">
      </el-table-column>
      <el-table-column label="操作" width="200" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
          <el-button type="danger" size="small" @click="Ordersplit(scope.row)">订单拆分</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchLinkPool" :disabled="this.sels.length===0">添加到匹配池</el-button>
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
    <el-dialog title="订单拆分" v-model="OrderSplitVisible" :close-on-click-modal="false">
      <el-form :model="OrderSplitValue" label-width="80px" :rules="OrderSplitRules" ref="OrderSplitValue">
        <el-form-item label="拆分金额" prop="amounts">
          <el-input
            v-model="OrderSplitValue.amounts"
            auto-complete="off"
            placeholder="拆分按逗号分隔,比如1000,2000,3000">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="OrderSplitVisible = false">取消</el-button>
        <el-button type="primary" @click.native="OrderSplitSubmit" :loading="OrderSplitLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { requestJsbz,requestDelOrder,requestMatchAdd,requestOrderSplit } from '@/api/request/request';
import { timestampToTime } from '@/api/utils'
export default {
  data() {
    return {
      filters: {
        mobile: '',
        amount: '',
        ordercode:''
      },
      orderlist: [],
      listLoading: false,
      sels: [],
      total:0,
      page:1,
      options: [{
        value: '1',
        label: '未匹配数量>=5'
      }, {
        value: '2',
        label: '未匹配数量>=3并且<5'
      }, {
        value: '3',
        label: '未匹配数量<3'
      }],
      value: '',
      OrderSplitVisible: false,
      OrderSplitLoading: false,
      OrderSplitRules: {
        amounts: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ]
      },
      OrderSplitValue: {
        amounts:'',
        ordercode:''
      },
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
    OrderSplitSubmit() {
      this.$refs.OrderSplitValue.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.OrderSplitLoading = true;
              requestOrderSplit(this.OrderSplitValue,this.callBackrequestOrderSplit,this.callBackrequestOrderSplitError)
          })
        }
      })
    },
    callBackrequestOrderSplit(){
      this.OrderSplitLoading = false;
      this.$refs['OrderSplitValue'].resetFields();
      this.OrderSplitVisible = false;
      this.requestHandle()
    },
    callBackrequestOrderSplitError(res){
      this.OrderSplitVisible = true;
      this.OrderSplitLoading = false;
    },
    Ordersplit(row){
      this.OrderSplitVisible = true;
      this.OrderSplitValue.ordercode = row.ordercode
    },
    handleCurrentChange(val) {
        this.page = val;
        this.requestHandle()
    },
    callBackbatchLinkPool(res){
      this.listLoading = false;
      this.requestHandle()
    },
    callBackbatchLinkPoolError(res){
      this.listLoading = false;
    },
    batchLinkPool(){
      this.$confirm('确认将选中记录添加到匹配池吗？', '提示', {
          type: 'warning'
      }).then(() => {
        var ordercodes = this.sels.map(item => item.ordercode).toString();
        this.listLoading = true;
        requestMatchAdd({ordercodes:ordercodes,trantype:1},this.callBackbatchLinkPool,this.callBackbatchLinkPoolError)
      }).catch(() => {

      });
    },
    selsChange(sels) {
        this.sels = sels;
    },
    callBackrequestTgbz(res){
      this.orderlist = res.data.data
      for ( var item in this.orderlist) {
        this.$set(this.orderlist[item],'updtime',timestampToTime(this.orderlist[item].updtime))
        this.$set(this.orderlist[item],'isday','已排' + this.orderlist[item].isday + '天')
      }
      this.total = Number(res.headers.total)
      this.listLoading=false
    },
    callBackhandleDelError(res){
      this.listLoading = false;
    },
    callBackhandleDel(res){
      this.requestHandle()
    },
    handleDel(row){
      this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
      }).then(() => {
        this.listLoading = true;
        requestDelOrder(
          {ordercode:row.ordercode},
          this.callBackhandleDel,this.callBackhandleDelError)
      }).catch(() => {
      });
    },
    HandleSelectChange(){
      this.requestHandle()
    },
    ByDayQuery(){
      this.requestHandle(true)
    },
    indexMethod(ordercode){
      return ordercode
    },
    requestHandle(day){
      if (this.value2) {
        this.value2=this.moment(this.value2).format("YYYY-MM-DD HH:mm:ss")
      }
      console.log(this.value2)
      this.listLoading=true
      if(day){
        day=1
      }else{
        day=''
      }
      requestJsbz({value2:this.value2,page:this.page,flag:this.value,mobile:this.filters.mobile,ordercode:this.filters.ordercode,day:day,amount:this.filters.amount},this.callBackrequestTgbz)
    }
  },
  mounted() {
    this.requestHandle()
  }
}

</script>

<style scope>

</style>