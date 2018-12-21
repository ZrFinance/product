<template>
  <section>

    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-date-picker
            v-model="value7"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="ByDateQuery">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table
      :data="orderlist" 
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
      <el-table-column prop="tgbzcount" label="提供帮助额" width="150" sortable align="center">
      </el-table-column>
      <el-table-column prop="jsbzcount" label="接收帮助额" width="150" sortable align="center">
      </el-table-column>
      <!--
      <el-table-column prop="tgbztx" label="提供帮助提现额" width="200" sortable align="center">
      </el-table-column>
      <el-table-column prop="jsbztx" label="接受帮助提现额" width="200" sortable align="center">
      </el-table-column>-->
    </el-table>
  </section>
</template>

<script>
import { requestOrdercount } from '@/api/request/request';
import { dateformart } from '@/api/utils'
export default {
  data() {
    return {
      filters:{

      },
      orderlist: [],
      listLoading: false,
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
      value7: '',
      startdate:'',
      enddate:''
    }
  },
  methods: {
    callBackQuery(res){
      this.orderlist = res.data.data
      this.listLoading=false
    },
    requestquery(){
      this.listLoading=true
      requestOrdercount({startdate:this.startdate,enddate:this.enddate},this.callBackQuery)
    },
    ByDateQuery(){
      this.startdate=dateformart(this.value7[0])+' 00:00:01'
      this.enddate=dateformart(this.value7[1])+' 23:59:59'
      console.log(this.startdate)
      console.log(this.enddate)
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